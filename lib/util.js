"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const path = require("path");
exports.splitFilename = (filepath) => {
    const split = filepath.split('.');
    if (split.length !== 2)
        throw new Error(`could'nt recognize file: ${filepath}`);
    return {
        name: split[0],
        extension: split[1]
    };
};
exports.processFilename = (filepath, srcDir, baseUrl) => {
    const split = exports.splitFilename(filepath);
    let url = path.join(split.name);
    url = url.replace(path.join(srcDir), '');
    url = path.join(baseUrl, url);
    url = url.replace(/\/_/g, '/:');
    return url;
};
exports.requireWithoutCache = (filepath) => {
    const modulePath = path.resolve(filepath);
    delete require.cache[modulePath];
    return require(modulePath);
};
exports.leftPad = (str, padding) => {
    let res = str;
    for (let i = res.length; i < padding; i++) {
        res += ' ';
    }
    return res;
};
exports.logError = (e) => {
    console.clear();
    console.log(chalk_1.default.bgRed(' Error '));
    console.log(e);
};
exports.logStart = () => {
    console.clear();
    console.log(chalk_1.default.bgBlueBright(' Start '));
};
