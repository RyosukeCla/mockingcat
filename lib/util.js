"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitFilename = (filename) => {
    const split = filename.split('.');
    if (split.length !== 2)
        throw new Error(`could'nt recognize file: ${filename}`);
    return {
        name: split[0],
        extension: split[1]
    };
};
exports.processFilename = (filename) => {
    const split = exports.splitFilename(filename);
    if (!require.extensions['.' + split.extension])
        throw new Error(`override require hook to load '.${split.extension}'`);
    return split.name.replace(/\/_/, '/:');
};
exports.leftPad = (str, padding) => {
    let res = str;
    for (let i = res.length; i < padding; i++) {
        res += ' ';
    }
    return res;
};
