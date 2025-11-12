import fs from 'fs';
import { promisify } from 'util';
import parse from './parser.js';


function deepMerge(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                deepMerge(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return deepMerge(target, ...sources);
}

function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}


export default async (filename) => {
    const environment = process.env.NODE_ENV || 'development';
    const readFile = promisify(fs.readFile);

    const contents = await readFile(filename, 'utf-8');
    const parsed = parse(contents);
    const environmentConfig = parsed[environment];
    return deepMerge({ ...parsed.default }, environmentConfig, { environment });
};
