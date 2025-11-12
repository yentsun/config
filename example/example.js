import configLoader from '../index.js';


async function main() {
    const config = await configLoader('example/config.ini');
    console.log(config);
}

main();
