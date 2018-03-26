const assert = require('chai').assert;
const describe = require('mocha').describe;
const it = require('mocha').it;
const configLoader = require('./index');


describe('config loader', () => {

    it('returns basic config', async () => {
        const config = await configLoader('test_configs/basic.ini');
        assert.equal(config.environment, 'development');
        assert.strictEqual(config.keyOne, 1);
        assert.strictEqual(config.keyTwo, 2);
        assert.strictEqual(config.keyDecimal, 10.5);
        assert.strictEqual(config.array[0], 'one');
        assert.strictEqual(config.array[2], 'three');
        assert.strictEqual(config.array[3], 3);
        assert.equal(config.keyDEV, 'dev');
        assert.equal(config.log.level, 'INFO');
    });

    it('returns foreign config', async () => {
        const config = await configLoader('test_configs/foreign.ini');
        assert.equal(config.db.host, 'dummy value');
        assert.equal(config.db.secret, 'secret');
    });

    it('returns default config if the environment is not described', async () => {
        const config = await configLoader('test_configs/stageOnly.ini');
        assert.equal(config.secret, 'secret');
    });

    it('rejects promise if there is no config file', async () => {
        try {
            await configLoader('no.ini');
        } catch (error) {
            assert.equal(error.message, 'ENOENT: no such file or directory, open \'no.ini\'');
        }
    });
});
