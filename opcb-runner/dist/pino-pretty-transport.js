"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const colorette = tslib_1.__importStar(require("colorette"));
const pino_abstract_transport_1 = tslib_1.__importDefault(require("pino-abstract-transport"));
// import { pipeline, Transform } from "stream";
// import PinoPretty, { PrettyOptions } from "pino-pretty";
// import { LogDescriptor } from "pino";
// import SonicBoom from "sonic-boom";
// module.exports = (opts: PrettyOptions) => {
//     return PinoPretty({
//         ...opts,
//         sync: true,
//         ignore: "pid,hostname,module,level,cmd,stderr,stdout",
//         messageFormat: (log: LogDescriptor, messageKey: string) => {
//             let msg = "";
//             if (log.module && typeof log.module === "string") {
//                 msg += colorette.gray(log.module + ": ");
//             }
//             const msgstr = log[messageKey] as string;
//             if (log.level <= 10) {
//                 msg += "· ";
//             } else if (log.level <= 20) {
//                 msg += "∙ ";
//             } else if (log.level <= 30) {
//                 msg += "ℹ︎ ";
//             } else if (log.level <= 40) {
//                 msg += "⚠️ ";
//             } else if (log.level <= 50) {
//                 msg += "⛔️ ";
//             } else {
//                 msg += "⛔️⛔️⛔️ ";
//             }
//             if (log.cmd && typeof log.cmd === "string") {
//                 if (log.stderr === true) {
//                     msg += colorette.gray(colorette.underline(log.cmd) + " err> ");
//                 } else if (log.stdout === true) {
//                     msg += colorette.gray(colorette.underline(log.cmd) + " > ");
//                 } else {
//                     msg += colorette.gray(colorette.underline(log.cmd) + " ");
//                 }
//             }
//             if (log.level <= 10) {
//                 msg += colorette.gray(msgstr);
//             } else if (log.level <= 20) {
//                 msg += colorette.gray(msgstr);
//             } else if (log.level <= 30) {
//                 msg += colorette.blue(msgstr);
//             } else if (log.level <= 40) {
//                 msg += colorette.yellow(msgstr);
//             } else if (log.level <= 50) {
//                 msg += colorette.red(msgstr);
//             } else {
//                 msg += colorette.red(msgstr);
//             }
//             return msg;
//         },
//     });
// };
module.exports = function () {
    return (0, pino_abstract_transport_1.default)(function (source) {
        source.on("data", (data) => {
            const msg = formatMsg(data);
            process.stdout.write(msg + "\n");
        });
    }, {
        close(err, cb) {
            process.stdout.end();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            process.stdout.on("close", cb.bind(null, err));
        },
    });
};
function formatMsg(log) {
    let msg = "";
    const time = new Date(log.time);
    msg += colorette.gray(time.toISOString() + " ");
    if (log.module && typeof log.module === "string") {
        msg += colorette.gray("| ") + colorette.black(log.module + " ");
    }
    const msgstr = log.msg;
    const level = log.level;
    if (level <= 10) {
        msg += "· ";
    }
    else if (level <= 20) {
        msg += "∙ ";
    }
    else if (level <= 30) {
        msg += "ℹ︎ ";
    }
    else if (level <= 40) {
        msg += "⚠️ ";
    }
    else if (level <= 50) {
        msg += "⛔️ ";
    }
    else {
        msg += "⛔️⛔️⛔️ ";
    }
    if (log.moduleSuffix && typeof log.moduleSuffix === "string") {
        msg += colorette.gray(log.moduleSuffix + " ");
    }
    if (log.cmd && typeof log.cmd === "string") {
        if (log.stderr === true) {
            msg += colorette.gray(colorette.underline(log.cmd) + " err> ");
        }
        else if (log.stdout === true) {
            msg += colorette.gray(colorette.underline(log.cmd) + " > ");
        }
        else {
            msg += colorette.gray(colorette.underline(log.cmd) + " ");
        }
    }
    if (level <= 10) {
        msg += colorette.gray(msgstr);
    }
    else if (level <= 20) {
        msg += colorette.gray(msgstr);
    }
    else if (level <= 30) {
        msg += colorette.blue(msgstr);
    }
    else if (level <= 40) {
        msg += colorette.yellow(msgstr);
    }
    else if (level <= 50) {
        msg += colorette.red(msgstr);
    }
    else {
        msg += colorette.red(msgstr);
    }
    if (log.err && typeof log.err === "object") {
        const err = log.err;
        if ("message" in err && err.message && typeof err.message === "string") {
            msg += colorette.red("\n   Error: " + err.message);
        }
        if (err.stack && typeof err.stack === "string") {
            msg += colorette.gray("\n   " + err.stack);
        }
        delete err.message;
        delete err.stack;
        if (Object.entries(err).length > 0) {
            msg += "\n    " + JSON.stringify(err);
        }
    }
    delete log.msg;
    delete log.hostname;
    delete log.pid;
    delete log.level;
    delete log.time;
    delete log.module;
    delete log.moduleSuffix;
    delete log.stderr;
    delete log.stdout;
    delete log.cmd;
    if (Object.entries(log).length > 0) {
        msg += "\n    " + JSON.stringify(log);
    }
    return msg;
}
//# sourceMappingURL=pino-pretty-transport.js.map