const fs = require('fs');
const {promisify} = require('util');
const ini = require('ini');
const merge = require('lodash/merge');
const ensureAsync = require('async/ensureAsync');
const {traverse} = require('traverse-async');
const processNode = require('./lib/processNode');


module.exports = async (filename) => {
    const environment = process.env.NODE_ENV || 'development';
    const readFile = promisify(fs.readFile);
    const contents = await readFile(filename, 'utf-8');
    const parsed = ini.parse(contents);
    const environmentConfig = parsed[environment];
    const merged = merge(parsed.default, environmentConfig, {environment});

    return await new Promise((resolve) => {
        traverse(merged, ensureAsync(processNode), (config) => {
            return resolve(config);
        });
    });
};
