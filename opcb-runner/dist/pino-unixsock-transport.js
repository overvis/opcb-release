"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const pino_abstract_transport_1 = tslib_1.__importDefault(require("pino-abstract-transport"));
const node_net_1 = tslib_1.__importDefault(require("node:net"));
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
module.exports = function () {
    const unixSockFile = "/tmp/opcb-log.sock";
    if (node_fs_1.default.statSync(unixSockFile, { throwIfNoEntry: false })) {
        // NOTE: Remove unixsock file if exist
        node_fs_1.default.unlinkSync(unixSockFile);
    }
    const connList = [];
    const server = node_net_1.default
        .createServer()
        .on("error", (err) => {
        closeConnections(connList, err);
        server.close();
        throw err;
    })
        .listen(unixSockFile, () => {
        node_fs_1.default.chmodSync(unixSockFile, 0o700);
    });
    return (0, pino_abstract_transport_1.default)(function (source) {
        // NOTE: event for pino data
        source.on("data", (data) => {
            const jsonStr = `${JSON.stringify(data)}\n`;
            connList.forEach((s) => {
                s.write(jsonStr);
            });
        });
        // NOTE: event for client connected to the unix socket
        server.on("connection", (socket) => {
            connList.push(socket);
            socket.on("end", () => {
                const idx = connList.indexOf(socket);
                if (idx > -1) {
                    connList.splice(idx, 1);
                }
            });
        });
    }, {
        close(err, _cb) {
            // closing all client connections
            closeConnections(connList, err);
            server.close();
        },
    });
};
function closeConnections(conns, err) {
    conns.forEach((s) => {
        s.destroy(err);
    });
    conns.splice(0);
}
//# sourceMappingURL=pino-unixsock-transport.js.map