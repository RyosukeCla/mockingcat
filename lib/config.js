"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = {
    srcDir: 'mock',
    baseUrl: '/mock',
    port: 8090,
    verbose: true,
    middlewares: [],
    ignore: [/node_modules/]
};
exports.mergeConfig = (config) => {
    return Object.assign({}, exports.defaultConfig, config);
};
