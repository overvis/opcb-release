"use strict";
/* eslint-disable import/first */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// eslint-disable-next-line no-console
console.log(`${new Date().toISOString()} Intializing imports and logging...`);
const server_tools_1 = require("@overvis/server-tools");
const pino_1 = tslib_1.__importDefault(require("pino"));
const opcbConfigManager = tslib_1.__importStar(require("@overvis/opcb-config-manager"));
const opcbApi = tslib_1.__importStar(require("@overvis/opcb-api"));
const opcbLinuxOperator = tslib_1.__importStar(require("@overvis/opcb-linux-operator"));
const opcbVirtualDevice = tslib_1.__importStar(require("@overvis/opcb-virtual-device"));
const childProcess = tslib_1.__importStar(require("child_process"));
const path_1 = tslib_1.__importDefault(require("path"));
let logger;
async function run() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
    // read runner config
    const runnerConfigPath = process.argv[2];
    if (!runnerConfigPath) {
        throw new Error("Runner config path was not specified. Specify it as the command line argument.");
    }
    const runnerConfig = (0, server_tools_1.loadConfig)(runnerConfigPath, `./runner-config.schema.json`);
    // TODO_FUTURE: initialize sentry
    // initialize logging
    const logLevel = runnerConfig.defaultLogLevel || "info";
    logger = (0, pino_1.default)({
        level: logLevel,
        transport: {
            target: "./pino-pretty-transport",
        },
    });
    logger.info("Starting OPCB runtime...");
    const subprocesses = [];
    // start redis if needed
    const redisBin = ((_a = runnerConfig.paths) === null || _a === void 0 ? void 0 : _a.redisBinary) || "../bin/redis-server";
    const args = ((_b = runnerConfig.paths) === null || _b === void 0 ? void 0 : _b.redisConfig) ? [(_c = runnerConfig.paths) === null || _c === void 0 ? void 0 : _c.redisConfig] : [];
    logger.info(`Starting Redis server: ${redisBin} ${args.join(" ")}`);
    subprocesses.push(monitorProcess(await startBinary(redisBin, args), logger.child({ module: "RDS" })));
    // start ts modules
    const redisSocket = ((_d = runnerConfig.paths) === null || _d === void 0 ? void 0 : _d.redisSocket) || "/tmp/opcb-redis.sock";
    const manufacturerFilePath = ((_e = runnerConfig.paths) === null || _e === void 0 ? void 0 : _e.manufacturerFile) || "/MANUFACTURER_LICENSE";
    let staticFilesDir = ((_f = runnerConfig.paths) === null || _f === void 0 ? void 0 : _f.staticFilesDir) || process.cwd() + "/static";
    if (staticFilesDir.startsWith(".")) {
        staticFilesDir = path_1.default.normalize(`${process.cwd()}/${staticFilesDir}`);
    }
    subprocesses.push((await opcbConfigManager.run(logger.child({ module: "CFG" }), {
        redisConnectString: redisSocket,
        manufacturerFile: { path: manufacturerFilePath },
        configFile: { path: ((_g = runnerConfig.paths) === null || _g === void 0 ? void 0 : _g.configFile) || "../config.json" },
        factoryConfigFile: {
            path: ((_h = runnerConfig.paths) === null || _h === void 0 ? void 0 : _h.factoryConfigFile) || "../factory-config.json",
        },
        sqliteDbPath: ((_j = runnerConfig.paths) === null || _j === void 0 ? void 0 : _j.sqliteDbPath) || "../opcb-db.sqlite",
        sqliteLibDir: ((_k = runnerConfig.paths) === null || _k === void 0 ? void 0 : _k.sqliteLibDir) || "../sqlite",
        dbMigrationsDir: ((_l = runnerConfig.paths) === null || _l === void 0 ? void 0 : _l.dbMigrationsDir) || "../db-migrations",
    }))[0]);
    subprocesses.push(opcbApi.run(logger.child({ module: "API" }), { redisSocket }));
    subprocesses.push(opcbLinuxOperator.run(logger.child({ module: "LIN" }), {
        redisSocket,
        staticFilesDir,
        manufacturerFilePath,
    }));
    subprocesses.push((await opcbVirtualDevice.run(logger.child({ module: "VIR" }), {
        redisSocket,
        sqliteDbPath: ((_m = runnerConfig.paths) === null || _m === void 0 ? void 0 : _m.sqliteDbPath) || "../opcb-db.sqlite",
        sqliteLibDir: ((_o = runnerConfig.paths) === null || _o === void 0 ? void 0 : _o.sqliteLibDir) || "../sqlite",
    }))[0]);
    // start binary modules
    // TODO_FUTURE: design args
    const binArgs = [logLevel, redisSocket];
    if ((_p = runnerConfig.paths) === null || _p === void 0 ? void 0 : _p.opcbRs485TtyOperatorBin) {
        subprocesses.push(monitorProcess(await startBinary((_q = runnerConfig.paths) === null || _q === void 0 ? void 0 : _q.opcbRs485TtyOperatorBin, binArgs), logger.child({ module: "RSO" })));
    }
    if ((_r = runnerConfig.paths) === null || _r === void 0 ? void 0 : _r.opcbModbusTcpClientBin) {
        subprocesses.push(monitorProcess(await startBinary((_s = runnerConfig.paths) === null || _s === void 0 ? void 0 : _s.opcbModbusTcpClientBin, binArgs), logger.child({ module: "MTC" })));
    }
    if ((_t = runnerConfig.paths) === null || _t === void 0 ? void 0 : _t.opcbModbusTcpServerBin) {
        subprocesses.push(monitorProcess(await startBinary((_u = runnerConfig.paths) === null || _u === void 0 ? void 0 : _u.opcbModbusTcpServerBin, binArgs), logger.child({ module: "MTS" })));
    }
    if ((_v = runnerConfig.paths) === null || _v === void 0 ? void 0 : _v.opcbOvervisBcClientBin) {
        subprocesses.push(monitorProcess(await startBinary((_w = runnerConfig.paths) === null || _w === void 0 ? void 0 : _w.opcbOvervisBcClientBin, binArgs), logger.child({ module: "OBC" })));
    }
    // monitor all modules as promises, exit on failure
    await Promise.race(subprocesses);
    throw new Error("Main process exited because one of the subprocess promises has resolved.");
}
async function startBinary(cmd, args) {
    return new Promise((resolve, reject) => {
        const cp = childProcess.spawn(cmd, args);
        cp.on("spawn", () => {
            process.on("exit", () => {
                cp.kill();
            });
            resolve(cp);
        });
        cp.on("error", (err) => {
            reject(new Error(`Spawinging binary process ${cmd} errored: ${err.toString()}`));
        });
    });
}
async function monitorProcess(cp, logger) {
    let startCmd = cp.spawnfile;
    if (cp.spawnargs) {
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
run().catch((e) => {
    if (logger) {
        logger.fatal(e);
    }
    else {
        // eslint-disable-next-line no-console
        console.error(e);
    }
    // TODO_FUTURE: sentry
    setTimeout(() => process.exit(1), 1000);
});
//# sourceMappingURL=start.js.map