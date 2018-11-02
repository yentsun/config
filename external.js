const numeric = /^[+-]?([0-9]*[.])?[0-9]+$/;

const modules = {

    env(key) {
        return process.env[key];
    },

    dummy(key) {
        return `dummy value of ${key}`;
    }
};

module.exports = (environment, value) => {
    const currentEnvironment = process.env.NODE_ENV || 'development'; // TODO remove this duplicate
    if (![currentEnvironment, 'default'].includes(environment)) // ignore value if its not current environment
        return value;
    const [module, key] = value.split('::');
    const moduleName = module.toLowerCase();
    if (!(moduleName in modules))
        throw new Error(`Unknown external module ${module}`);
    const result = modules[moduleName](key);
    if (numeric.test(result))
        return Number(result);
    return result;
};
