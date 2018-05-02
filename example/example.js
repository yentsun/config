const configLoader = require('../index');


async function main() {
    const config = await configLoader('example/config.ini');
    console.log(config);
}

main();
