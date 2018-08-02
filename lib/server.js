"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify = require("fastify");
const resolver_1 = require("./resolver");
const util = require("./util");
const chalk_1 = require("chalk");
class MockingcatServer {
    constructor(config) {
        this.config = config;
        this.app = fastify();
    }
    getFastifyInstence() {
        return this.app;
    }
    stop() {
        return new Promise((resolve, reject) => {
            this.app.close(() => {
                resolve();
            });
        });
    }
    reset() {
        this.app = fastify();
    }
    start() {
        this.setup();
        this.app.listen(this.config.port, () => {
            console.log(`Mockingcat listening on http://localhost:${this.config.port}`);
        });
    }
    setup() {
        if (this.config.verbose) {
            this.app.use((req, rep, next) => {
                console.log(`${util.leftPad(chalk_1.default.green(req.method || 'NONE'), 7)} ${req.url}`);
                next();
            });
        }
        this.config.middlewares.forEach((middleware) => {
            this.app.use(middleware);
        });
        if (this.config.verbose)
            console.log('Mock api routes');
        const files = resolver_1.default(this.config.srcDir).filter((filepath) => {
            const ignored = this.config.ignore.some(ignore => ignore.test(filepath));
            return !ignored;
        });
        files.forEach((filepath) => {
            this.register(filepath);
        });
    }
    register(filepath) {
        const url = util.processFilename(filepath, this.config.srcDir, this.config.baseUrl);
        const mockObject = util.requireWithoutCache(filepath);
        if (mockObject instanceof Array) {
            this.registerRoute(url, mockObject);
        }
        else {
            this.registerRoute(url, [mockObject]);
        }
    }
    registerRoute(url, mockOjects) {
        mockOjects.forEach((mockObject) => {
            const option = Object.assign({ method: 'GET', url,
                handler(request, reply) {
                    reply.send({ message: 'not implemented yet' });
                } }, mockObject);
            if (this.config.verbose)
                console.log(`  - ${util.leftPad(chalk_1.default.green(option.method), 7)} ${option.url}`);
            this.app.route(option);
        });
    }
}
exports.default = MockingcatServer;
