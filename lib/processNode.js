const validator = require('validator');
const foreign = require('./foreign');


const FOREIGN_SEPARATOR = '::';


module.exports = function (node, done) {

    const {key, parent} = this;
    if (typeof node !== 'string') return done();



    // foreign storage

    if (validator.contains(node, FOREIGN_SEPARATOR)) {
        let [foreignStorage, foreignKey] = node.split(FOREIGN_SEPARATOR);
        foreignStorage = foreignStorage.toLowerCase();
        if (!foreignStorage in foreign) throw new Error('unknown foreign storage: '+foreignStorage);
        const fetcher = foreign[foreignStorage];
        fetcher(foreignKey, (error, value) => {
            if (error) throw error;
            parent[key] = value;
            return done();
        })
    } else {

        // number

        if (validator.isInt(node) || validator.isDecimal(node)) {
            parent[key] = Number(node);
        }


        // JSON

        if (validator.isJSON(node)) {
            parent[key] = JSON.parse(node);
        }

        done();
    }
};
