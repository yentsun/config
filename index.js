const fs = require('fs');
const {promisify} = require('util');
const ini = require('ini');
const merge = require('lodash.merge');
const {traverse} = require('traverse-async');
const processNode = require('./lib/processNode');


module.exports = (filename) => {

    const environment = process.env.NODE_ENV || 'development';
    const readFile = promisify(fs.readFile);

    return new Promise(async (resolve, reject) => {
        try {
            const contents = await readFile(filename, 'utf-8');
            const parsed = ini.parse(contents);
            const environmentConfig = parsed[environment];
            const merged = merge(parsed.default, environmentConfig, {environment});
            traverse(merged, processNode, (config) => {
                return resolve(config);
            });
        } catch (error) {
            reject(error);
        }
    });
};
