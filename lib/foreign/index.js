const fs = require('fs');
const path = require('path');
const forEach = require('lodash/forEach');


const fetcherModules = fs.readdirSync(path.join(__dirname, 'modules'));
const fetchers = {};
forEach(fetcherModules, (fetcher) => {
    const name = path.basename(fetcher, '.js');
    const requirePath = path.join(__dirname, 'modules', fetcher);
    fetchers[name] = require(requirePath);
});

module.exports = fetchers;
