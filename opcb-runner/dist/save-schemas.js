"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const config_1 = require("./config");
function run() {
    fs.writeFileSync("./runner-config.schema.json", JSON.stringify(config_1.CONFIG_SCHEMA, null, 4));
}
try {
    run();
}
catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
}
//# sourceMappingURL=save-schemas.js.map