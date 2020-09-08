const configLoader = require('../');


async function main() {
    const config = await configLoader('example/config.ini');
    console.log(config);
}

main();
