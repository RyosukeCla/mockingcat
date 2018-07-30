"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const appRootPath = require("app-root-path");
const defaultConfig = {
    srcDir: 'mock',
    baseUrl: '/mock',
    port: 8090,
    verbose: true
};
const CONFIG_PATH = './mockingbird.config.js';
const configLoader = () => {
    const isExist = fs.existsSync(CONFIG_PATH);
    if (isExist) {
        const configPath = path.resolve(appRootPath.path, CONFIG_PATH);
        return require(configPath);
    }
    else {
        return defaultConfig;
    }
};
const mergeConfig = (config) => {
    return Object.assign({}, defaultConfig, config);
};
exports.default = mergeConfig(configLoader());
