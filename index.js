import fs from 'fs';
import { promisify } from 'util';
import parse from './parser.js';
import merge from 'lodash.merge';


export default async (filename) => {
    const environment = process.env.NODE_ENV || 'development';
    const readFile = promisify(fs.readFile);

    const contents = await readFile(filename, 'utf-8');
    const parsed = parse(contents);
    const environmentConfig = parsed[environment];
    return merge(parsed.default, environmentConfig, { environment });
};
