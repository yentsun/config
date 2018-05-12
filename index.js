const fs = require('fs');
const {promisify} = require('util');
const {parse} = require('./parser');
const merge = require('lodash.merge');


module.exports = (filename) => {

    const environment = process.env.NODE_ENV || 'development';
    const readFile = promisify(fs.readFile);

    return new Promise(async (resolve, reject) => {
        try {
            const contents = await readFile(filename, 'utf-8');
            const parsed = parse(contents);
            const environmentConfig = parsed[environment];
            const merged = merge(parsed.default, environmentConfig, {environment});
            return resolve(merged);
        } catch (error) {
            if (error.location) {
                const {start: {line, column}} = error.location;
                const e = new Error(`INI parser failed '${error.message}'`);
                e.original = error;
                e.stack = `    at ${filename}:${line}:${column}\n${error.stack.split('\n').slice(2).join('\n')}`;
                reject(e);
            }
            reject(error);
        }
    });
};
