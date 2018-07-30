"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify = require("fastify");
const path = require("path");
const config_1 = require("./config");
const reolver_1 = require("./reolver");
const util = require("./util");
const chalk_1 = require("chalk");
class Mockingcat {
    constructor() {
        this.app = fastify();
    }
    setup() {
        console.clear();
        console.log(chalk_1.default.bgBlueBright(' Start '));
        if (config_1.default.verbose) {
            this.app.use((req, rep, next) => {
                console.log(`${util.leftPad(chalk_1.default.green(req.method || 'NONE'), 7)} ${req.url}`);
                next();
            });
            console.log('Mock api routes');
        }
        const files = reolver_1.default(config_1.default.srcDir);
        files.forEach((filepath) => {
            this.register(filepath);
        });
    }
    register(filepath) {
        let url = util.processFilename(filepath);
        url = path.join(url).replace(path.join(config_1.default.srcDir), '');
        url = path.join(config_1.default.baseUrl, url);
        const modulePath = path.resolve(filepath); //= path.resolve(appRootPath.path, filepath)
        delete require.cache[modulePath];
        const mockObject = require(modulePath);
        const option = Object.assign({ method: 'GET', url,
            handler(request, reply) {
                reply.send({ message: 'not implemented yet' });
            } }, mockObject);
        if (config_1.default.verbose)
            console.log(`  - ${util.leftPad(option.method, 7)} ${option.url}`);
        this.app.route(option);
    }
    stop(cb) {
        this.app.close(() => {
            cb();
        });
    }
    reset() {
        this.app = fastify();
    }
    start() {
        this.setup();
        this.app.listen(config_1.default.port, () => {
            console.log(`Mockingcat listening on http://localhost:${config_1.default.port}`);
        });
    }
}
exports.default = Mockingcat;
