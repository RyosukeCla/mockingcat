"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const server_1 = require("./server");
const chokidar = require("chokidar");
const util_1 = require("./util");
class Mockingcat {
    constructor(config) {
        this.config = config_1.mergeConfig(config || {});
        this.server = new server_1.default(this.config);
        this.wacther = chokidar.watch(this.config.srcDir, {
            ignored: this.config.ignore,
            ignoreInitial: true
        });
    }
    getFastifyInstance() {
        return this.server.getFastifyInstence();
    }
    start() {
        try {
            util_1.logStart();
            this.server.start();
        }
        catch (e) {
            util_1.logError(e);
        }
        this.wacther.on('all', async () => {
            try {
                await this.server.stop();
                util_1.logStart();
                this.server.reset();
                this.server.start();
            }
            catch (e) {
                util_1.logError(e);
            }
        });
    }
}
exports.default = Mockingcat;
