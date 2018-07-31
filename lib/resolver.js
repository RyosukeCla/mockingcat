"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const resolver = (dirPath, files = []) => {
    const _dirPath = path.join(dirPath);
    const dir = fs.readdirSync(_dirPath);
    dir.forEach((name => {
        const filePath = path.join(_dirPath, name);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            const deepDirPath = path.join(dirPath, name);
            resolver(deepDirPath, files);
        }
        else {
            files.push(path.join(_dirPath, name));
        }
    }));
    return files;
};
exports.default = resolver;
