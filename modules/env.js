module.exports = (key) => {

    const value = process.env[key];
    return new Promise((resolve, reject) => {
        if (value == null) {
            reject(new Error(`Referenced environment variable "${key}" is not defined`));
        } else {
            resolve(value);
        }
    });
};
