"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG_SCHEMA = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.CONFIG_SCHEMA = typebox_1.Type.Object({
    $schema: typebox_1.Type.Optional(typebox_1.Type.String()),
    sentry: typebox_1.Type.Optional(typebox_1.Type.Object({
        dsn: typebox_1.Type.String({ format: "uri" }),
    }, { additionalProperties: false })),
    logLevel: typebox_1.Type.Union([
        typebox_1.Type.Literal("trace"),
        typebox_1.Type.Literal("debug"),
        typebox_1.Type.Literal("info"),
        typebox_1.Type.Literal("warn"),
        typebox_1.Type.Literal("error"),
    ]),
    paths: typebox_1.Type.Object({
        manufacturerFile: typebox_1.Type.String({
            default: "../MANUFACTURER_LICENSE",
        }),
        configFile: typebox_1.Type.String({
            default: "../user/config.json",
        }),
        factoryConfigFile: typebox_1.Type.String({
            default: "../user/factory-config.json",
        }),
        opcbRs485TtyOperatorBin: typebox_1.Type.Optional(typebox_1.Type.String({
            default: "../bin/opcb-rs485-tty-operator",
        })),
        opcbModbusTcpClientBin: typebox_1.Type.Optional(typebox_1.Type.String({
            default: "../bin/opcb-modbus-tcp-client",
        })),
        opcbModbusTcpServerBin: typebox_1.Type.Optional(typebox_1.Type.String({
            default: "../bin/opcb-modbus-tcp-server",
        })),
        opcbOvervisRcClientBin: typebox_1.Type.Optional(typebox_1.Type.String({
            default: "../bin/opcb-overvis-rc-client",
        })),
        redisBinary: typebox_1.Type.String({
            default: "../bin/redis-server",
        }),
        redisConfig: typebox_1.Type.String({
            default: "../redis.conf",
        }),
        redisSocket: typebox_1.Type.String({
            default: "/tmp/opcb-redis.sock",
        }),
        staticFilesDir: typebox_1.Type.String({
            default: "../http-static",
        }),
        sqliteDbPath: typebox_1.Type.String({
            default: "../user/opcb.sqlite3",
        }),
        sqliteLibDir: typebox_1.Type.String({
            default: "../bin",
        }),
        dbMigrationsDir: typebox_1.Type.String({
            default: "node_modules/@overvis/opcb-config-manager/db-migrations",
        }),
        labelFile: typebox_1.Type.String({
            default: "../user/label.png",
        }),
        changelogFile: typebox_1.Type.String({
            default: "../CHANGELOG.md",
        }),
    }, { additionalProperties: true }),
}, { additionalProperties: false });
//# sourceMappingURL=config.js.map