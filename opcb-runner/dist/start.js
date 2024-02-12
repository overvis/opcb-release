"use strict";
/* eslint-disable import/first */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// eslint-disable-next-line no-console
console.log(`${new Date().toISOString()} Initializing imports and logging...`);
const opcbApi = tslib_1.__importStar(require("@overvis/opcb-api"));
const opcbConfigManager = tslib_1.__importStar(require("@overvis/opcb-config-manager"));
const opcbLinuxOperator = tslib_1.__importStar(require("@overvis/opcb-linux-operator"));
const opcb_ts_shared_1 = require("@overvis/opcb-ts-shared");
const opcbVirtualDevice = tslib_1.__importStar(require("@overvis/opcb-virtual-device"));
const opcbTasks = tslib_1.__importStar(require("@overvis/opcb-tasks"));
const server_tools_1 = require("@overvis/server-tools");
const childProcess = tslib_1.__importStar(require("child_process"));
const path_1 = tslib_1.__importDefault(require("path"));
const pino_1 = tslib_1.__importDefault(require("pino"));
let logger;
async function run() {
    var _a;
    // read runner config
    const runnerConfigPath = process.argv[2];
    if (!runnerConfigPath) {
        throw new Error("Runner config path was not specified. Specify it as the command line argument.");
    }
    const config = (0, server_tools_1.loadConfig)(runnerConfigPath, opcb_ts_shared_1.RUNNER_CONFIG_SCHEMA);
    // initialize logging
    logger = (0, pino_1.default)({
        level: config.logLevel,
        transport: {
            target: "./pino-pretty-transport",
        },
    });
    logger.info("Starting OPCB runtime...");
    // init sentry
    (0, server_tools_1.initSentry)((_a = config.sentry) === null || _a === void 0 ? void 0 : _a.dsn);
    (0, opcb_ts_shared_1.initMemDb)(config.paths.sqliteMemDbPath, config.paths.sqliteLibDir);
    (0, opcb_ts_shared_1.migrateDb)(config.paths.sqliteDbPath, logger.child({ module: "RUN" }), config.paths.sqliteLibDir);
    const subprocesses = [];
    // start redis if needed
    const redisBin = config.paths.redisBinary;
    const redisArgs = [config.paths.redisConfig];
    logger.info(`Starting Redis server: ${redisBin} ${redisArgs.join(" ")}`);
    const cwd = config.paths.binCwd;
    subprocesses.push(monitorProcess(await startBinary(cwd, redisBin, redisArgs), logger.child({ module: "RDS" })));
    // start ts modules
    const redisSocket = config.paths.redisSocket;
    const redisClient = new opcb_ts_shared_1.RedisClient(redisSocket, logger.child({ module: "RDC" }));
    await opcbConfigManager.run(logger.child({ module: "CFG" }), {
        redisClient: redisClient.getActorClient("CFG"),
        manufacturerFile: { path: config.paths.manufacturerFile },
        configFile: {
            path: config.paths.configFile,
        },
        factoryConfigFile: {
            path: config.paths.factoryConfigFile,
        },
    });
    await opcbApi.run({
        logger: logger.child({ module: "API" }),
        redisClient: redisClient.getActorClient("API"),
        sqliteDbPath: absolutePath(config.paths.sqliteDbPath),
        sqliteMemDbPath: absolutePath(config.paths.sqliteMemDbPath),
        sqliteLibDir: absolutePath(config.paths.sqliteLibDir),
    });
    subprocesses.push(opcbLinuxOperator.run({
        logger: logger.child({ module: "LIN" }),
        redisClient: redisClient.getActorClient("LIN"),
        staticFilesDir: absolutePath(config.paths.staticFilesDir),
        manufacturerFile: absolutePath(config.paths.manufacturerFile),
        changelogFile: absolutePath(config.paths.changelogFile),
        labelFile: absolutePath(config.paths.labelFile),
        sqliteMemDbPath: absolutePath(config.paths.sqliteMemDbPath),
        sqliteLibDir: absolutePath(config.paths.sqliteLibDir),
        tasksProjectDir: absolutePath(config.paths.userTasksProjectDir),
        tasksTemplatePath: absolutePath(config.paths.tasksProjectTemplateArchive),
    })[0]);
    await opcbVirtualDevice.run(logger.child({ module: "VIR" }), {
        redisClient: redisClient.getActorClient("VIR"),
        sqliteDbPath: absolutePath(config.paths.sqliteDbPath),
        sqliteLibDir: absolutePath(config.paths.sqliteLibDir),
    });
    await opcbTasks.run({
        logger: logger.child({ module: "TSK" }),
        redisClient: redisClient.getActorClient("TSK"),
        sqliteDbPath: absolutePath(config.paths.sqliteDbPath),
        memSqliteDbPath: absolutePath(config.paths.sqliteMemDbPath),
        sqliteLibDir: absolutePath(config.paths.sqliteLibDir),
        redisUrl: redisSocket,
    });
    // start binary modules
    // TODO_FUTURE: design args
    const binArgs = [config.logLevel, redisSocket];
    if (config.paths.opcbRs485TtyOperatorBin) {
        subprocesses.push(monitorProcess(await startBinary(cwd, config.paths.opcbRs485TtyOperatorBin, binArgs), logger.child({ module: "RSO" })));
    }
    if (config.paths.opcbModbusTcpClientBin) {
        subprocesses.push(monitorProcess(await startBinary(cwd, config.paths.opcbModbusTcpClientBin, binArgs), logger.child({ module: "MTC" })));
    }
    if (config.paths.opcbModbusTcpServerBin) {
        subprocesses.push(monitorProcess(await startBinary(cwd, config.paths.opcbModbusTcpServerBin, binArgs), logger.child({ module: "MTS" })));
    }
    if (config.paths.opcbOvervisRcClientBin) {
        subprocesses.push(monitorProcess(await startBinary(cwd, config.paths.opcbOvervisRcClientBin, binArgs), logger.child({ module: "ORC" })));
    }
    if (config.paths.opcbLorasensGatewayBin) {
        const binArgs = [
            config.logLevel,
            redisSocket,
            absolutePath(config.paths.sqliteDbPath),
            absolutePath(config.paths.sqliteMemDbPath),
            "45000",
        ];
        subprocesses.push(monitorProcess(await startBinary(cwd, config.paths.opcbLorasensGatewayBin, binArgs), logger.child({ module: "LGW" })));
    }
    // monitor all modules as promises, exit on failure
    subprocesses.push(redisClient.listenCmdStreamForever());
    await Promise.race(subprocesses);
    throw new Error("Main process exited because one of the subprocess promises has resolved.");
}
async function startBinary(cwd, cmd, args) {
    return new Promise((resolve, reject) => {
        const cp = childProcess.spawn(cmd, args, { cwd });
        cp.on("spawn", () => {
            cp.removeAllListeners();
            process.on("exit", () => {
                cp.kill();
            });
            resolve(cp);
        });
        cp.on("error", (err) => {
            reject(new Error(`Spawning binary process ${cmd} errored: ${err.toString()}`));
        });
    });
}
async function monitorProcess(cp, logger) {
    let startCmd = cp.spawnfile;
    if (cp.spawnargs.length > 0) {
        startCmd += " " + cp.spawnargs.join(" ");
    }
    let stdoutBuffer = "";
    cp.stdout.on("data", (data) => {
        const lines = data.toString("utf8").split("\n");
        while (lines.length > 1) {
            const line = stdoutBuffer + lines.shift();
            if (line.startsWith("$")) {
                const i = line.indexOf(" ");
                const [level, str] = [line.slice(1, i), line.slice(i + 1)];
                logger[level](str);
            }
            else {
                logger.debug(line);
            }
            stdoutBuffer = "";
        }
        stdoutBuffer = lines.shift();
    });
    let stderrBuffer = "";
    cp.stderr.on("data", (data) => {
        const lines = data.toString("utf8").split("\n");
        while (lines.length > 1) {
            const line = stderrBuffer + lines.shift();
            if (line.startsWith("$")) {
                const i = line.indexOf(" ");
                const [level, str] = [line.slice(1, i), line.slice(i + 1)];
                logger[level](str);
            }
            else {
                logger.error(line);
            }
            stderrBuffer = "";
        }
        stderrBuffer = lines.shift();
    });
    return new Promise((_resolve, reject) => {
        cp.on("close", (code, signal) => {
            reject(new Error(`Binary process ${startCmd} closed with code ${code} and signal ${signal}.`));
        });
        cp.on("exit", (code, signal) => {
            reject(new Error(`Binary process ${startCmd} exited with code ${code} and signal ${signal}.`));
        });
        cp.on("disconnect", () => {
            reject(new Error(`Binary process ${startCmd} disconnected.`));
        });
        cp.on("error", (err) => {
            reject(new Error(`Binary process ${startCmd} errored: ${err.toString()}`));
        });
    });
}
function absolutePath(pathStr) {
    if (!pathStr.startsWith("/")) {
        return path_1.default.normalize(`${process.cwd()}/${pathStr}`);
    }
    return pathStr;
}
run().catch((e) => {
    if (logger) {
        logger.fatal(e);
    }
    else {
        // eslint-disable-next-line no-console
        console.error(e);
    }
    logger.info("Reporting error to sentry...");
    (0, server_tools_1.reportErrorToSentry)(e);
    setTimeout(() => process.exit(1), 1000);
});
//# sourceMappingURL=start.js.map