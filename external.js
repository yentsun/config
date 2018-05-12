const numeric = /^[+-]?([0-9]*[.])?[0-9]+$/;

const modules = {

    env(key) {
        if (!(key in process.env))
            throw new Error(`Referenced environment variable "${key}" is not defined`);
        else
            return process.env[key];
    },

    dummy(key) {
        return `dummy value of ${key}`;
    }
};

module.exports = (module, key) => {
    const moduleName = module.toLowerCase();
    if (!(moduleName in modules))
        throw new Error(`Unknown external module ${module}`);
    const result = modules[moduleName](key);
    if (numeric.test(result))
        return Number(result);
    return result;
};
