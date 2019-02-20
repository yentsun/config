const {assert} = require('chai');
const configLoader = require('./index');


describe('config loader', () => {

    it('returns basic config', async () => {
        const config = await configLoader('test_configs/basic.ini');
        assert.equal(config.environment, 'development');
        assert.strictEqual(config.negInt, -1);
        assert.strictEqual(config.posInt, 2);
        assert.strictEqual(config.keyDecimal, 10.5);
        assert.strictEqual(config.array[0], 'one');
        assert.strictEqual(config.array[2], 'three');
        assert.strictEqual(config.array[3], 3);
        assert.strictEqual(config.arrayDecimal[0], -10.5);
        assert.strictEqual(config.arrayDecimal[1], 12.43);
        assert.strictEqual(config.trueLies, 'trueLies');
        assert.strictEqual(config.falseLies, 'falseLies');
        assert.isTrue(config.switchOne);
        assert.isFalse(config.switchTwo);
        assert.isTrue(config.flag);
        assert.isFalse(config.falseFlag);
        assert.isNull(config.null);
        assert.equal(config.keyDEV, 'dev');
        assert.equal(config.log.level, '[INFO]');
    });

    it('returns foreign config', async () => {
        process.env.YT_TIMEOUT = '3000';
        const config = await configLoader('test_configs/external.ini');
        assert.equal(config.db.host, 'dummy value of TEST_VALUE');
        assert.equal(config.db.secret, 'secret');
        assert.equal(config.db.user, 'dbUser');
        assert.strictEqual(config.timeout, 3000);
    });

    it('returns default config if the environment is not described', async () => {
        const config = await configLoader('test_configs/stageOnly.ini');
        assert.equal(config.secret, 'secret');
        assert.notExists(config.host);
    });

    it('throws for unknown external', async () => {
        try {
            await configLoader('test_configs/unknown.ini');
        } catch (error) {
            assert.equal(error.message, 'Unknown external module ZALGO');
        }
    });

    it('rejects promise if there is no config file', async () => {
        try {
            await configLoader('no.ini');
        } catch (error) {
            assert.equal(error.message, 'ENOENT: no such file or directory, open \'no.ini\'');
        }
    });

    it('throws on incorrect syntax', async () => {
        try {
            await configLoader('test_configs/bad.ini');
        } catch (error) {
            assert.equal(error.message, `INI parser failed 'Expected " ", ":", "=", or [a-zA-Z0-9_[\\] ] but end of input found.'`);
        }
    });
});
