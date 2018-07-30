"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const minimist = require("minimist");
const defaultConfig = {
    srcDir: 'mock',
    baseUrl: '/mock',
    port: 8090,
    verbose: true
};
const argv = minimist(process.argv.slice(2));
const argvConfig = {};
if (argv.srcdir || argv.s)
    argvConfig.srcDir = argv.srcdir || argv.s;
if (argv.baseurl || argv.b)
    argvConfig.baseUrl = argv.baseurl || argv.b;
if (argv.port || argv.p)
    argvConfig.port = argv.port || argv.p;
if (argv.verbose || argv.v)
    argvConfig.verbose = JSON.parse(argv.verbose || argv.v);
const CONFIG_PATH = './mockingcat.config.js';
const configLoader = () => {
    const isExist = fs.existsSync(CONFIG_PATH);
    if (isExist) {
        const configPath = path.resolve(CONFIG_PATH);
        return require(configPath);
    }
    else {
        return defaultConfig;
    }
};
const mergeConfig = (config) => {
    return Object.assign({}, defaultConfig, config, argvConfig);
};
exports.default = mergeConfig(configLoader());
