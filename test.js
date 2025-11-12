import assert from 'assert';
import configLoader from './index.js';


describe('config loader', () => {
    it('returns basic config', async () => {
        const config = await configLoader('test_configs/basic.ini');
        assert.equal(config.environment, 'development');
        assert.strictEqual(config.token, '6606cec44b18aaca3ad82d7f16194dd4');
        assert.strictEqual(config.uuid, '98e7d05e-5115-426d-ab60-a2799e95c403');
        assert.strictEqual(config.slashed, 'this\\that');
        assert.strictEqual(config.negInt, -1);
        assert.strictEqual(config.posInt, 2);
        assert.strictEqual(config.keyDecimal, 10.5);
        assert.strictEqual(config.array[0], 'one');
        assert.strictEqual(config.array[2], 'three');
        assert.strictEqual(config.array[3], 3);
        assert.strictEqual(config.arrayDecimal[0], -10.5);
        assert.strictEqual(config.arrayDecimal[1], 12.43);
        assert.strictEqual(config.trueLies, 'true Lies');
        assert.strictEqual(config.falseLies, "false Lie's");
        assert.ok(config['should be ok']);
        assert.strictEqual(config.switchOne, true);
        assert.strictEqual(config.switchTwo, false);
        assert.strictEqual(config.flag, true);
        assert.strictEqual(config.falseFlag, false);
        assert.strictEqual(config.null, null);
        assert.equal(config.keyDEV, 'dev');
        assert.equal(config.log.level, '[INFO]');
    });

    it('returns external config', async () => {
        process.env.YT_TIMEOUT = '3000';
        process.env.DB_SECRET = 'secret';
        const config = await configLoader('test_configs/external.ini');
        assert.equal(config.db.secret, 'secret');
        assert.equal(config.db.user, 'dbUser');
        assert.equal(config.db.host, 'dummy value of TEST_VALUE');
        assert.strictEqual(config.timeout, 3000);
    });

    it('returns default config if the environment is not described', async () => {
        const config = await configLoader('test_configs/stageOnly.ini');
        assert.equal(config.secret, 'secret');
        assert.strictEqual(config.host, undefined);
    });

    it('throws for unknown external', async () => {
        try {
            await configLoader('test_configs/unknown.ini');
            assert.fail('Should have thrown an error');
        } catch (error) {
            assert.equal(error.message, 'Unknown external module ZALGO');
        }
    });

    it('rejects promise if there is no config file', async () => {
        try {
            await configLoader('no.ini');
            assert.fail('Should have thrown an error');
        } catch (error) {
            assert.ok(error.message.includes('ENOENT: no such file or directory'));
        }
    });
});
