const isNil = require('lodash/isNil');

module.exports = (key, done) => {

    const value = process.env[key];

    if (isNil(value)) {
        done(new Error(`Referenced environment variable "${key}" is not defined`));
    } else {
        done(null, value);
    }

};
