const validator = require('validator');
const foreignModules = require('./foreign');


const FOREIGN_SEPARATOR = '::';

module.exports = async function (node, done) {

    const {key, parent} = this;
    let processed;
    if (typeof node !== 'string') return done();

    // foreign storage

    if (validator.contains(node, FOREIGN_SEPARATOR)) {
        const [foreignStorage, foreignKey] = node.split(FOREIGN_SEPARATOR);
        const foreignModule = foreignStorage.toLowerCase();
        if (!foreignStorage in foreignModules)
            throw new Error('unknown foreign storage: '+foreignStorage);
        const fetcher = foreignModules[foreignModule];
        processed = await fetcher(foreignKey);
    } else {
        processed = node;
    }

    if (validator.isInt(processed) || validator.isDecimal(processed)) {

        processed = Number(processed);
    } else if (validator.isJSON(processed)) {

       processed = JSON.parse(processed);
    }

    parent[key] = processed;
    done();

};
