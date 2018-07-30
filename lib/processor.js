"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const processor = (dirpath, filename) => {
    return require(path.join(__dirname, '../', dirpath, filename));
};
exports.default = processor;
