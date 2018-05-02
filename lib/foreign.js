const fs = require('fs');
const path = require('path');


const MODULE_DIR = path.join(__dirname, '..', 'modules');

const fetcherModules = fs.readdirSync(MODULE_DIR);
const fetchers = {};
fetcherModules.forEach((fetcher) => {
    const name = path.basename(fetcher, '.js');
    const requirePath = path.join(MODULE_DIR, fetcher);
    fetchers[name] = require(requirePath);
});

module.exports = fetchers;
