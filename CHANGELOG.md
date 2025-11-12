[5.0.1] - 2025-11-12
--------------------
- [x] **Remove lodash.merge dependency** - Replaced with native deep merge implementation
- [x] **Zero dependencies** - Package now has no production dependencies
- [x] Improved code coverage: 94.8% → 95.4%
- [x] **Add GitHub Actions workflow** - Automated testing on Node.js 18.x, 20.x, 22.x across Ubuntu, Windows, macOS
- [x] **Add Codecov integration** - Automated code coverage reporting
- [x] **Update README badges** - Replace deprecated Travis CI, Coveralls, David-dm with GitHub Actions, Codecov, npm version


[5.0.0] - 2025-11-12
--------------------

### Breaking Changes
- [x] **Migrated to ES6 modules** - Changed from CommonJS (`require`/`module.exports`) to ES6 (`import`/`export`)
  - Users must now use `import configLoader from 'yt-config'` instead of `require('yt-config')`
  - Package.json now includes `"type": "module"`
- [x] **Removed Chai dependency** - Tests now use Node.js built-in `assert` module
- [x] **Removed Prettier** - All formatting now handled by ESLint rules

### Security
- [x] **Fixed all 31 security vulnerabilities** (10 critical, 14 high, 5 moderate, 2 low)
- [x] Updated all dev dependencies to latest secure versions
- [x] Removed deprecated `coveralls` package
- [x] Replaced `nyc` with `c8` for better ES6 module support

### Code Quality
- [x] Fixed Promise anti-pattern in index.js (removed unnecessary `new Promise` wrapper)
- [x] Fixed typo: `resolveExrenal` → `resolveExternal`
- [x] Renamed misleading function: `unsafe()` → `sanitizeValue()`
- [x] Removed unnecessary variable assignments
- [x] Added comprehensive ESLint rules for code style consistency

### Dependencies
- [x] Updated mocha from v8.1.3 → v11.7.5
- [x] Updated engines requirement: `"lts"` → `">=18.0.0"`
- [x] Reduced dev dependencies from 9 to 3 packages

### Development
- [x] Added ESLint configuration with comprehensive rules
- [x] Achieved 94.8% code coverage
- [x] Removed format scripts (now handled by `npm run lint:fix`)
- [x] Updated CLAUDE.md with project documentation


[4.0.4] - 2020-09-08
--------------------
- [x] Update dependencies


[4.0.2] - 2019-07-07
--------------------
- [x] Update dependencies


[4.0.1] - 2019-02-20
--------------------
- [x] Increase code coverage


[4.0.0] - 2019-02-20
--------------------
- [x] Move away from PEG.js parser to custom one


[3.1.0] - 2018-11-02
--------------------
- [x] Don't throw on empty env var
- [x] Update dependencies


[3.0.1] - 2018-06-02
--------------------
- [x] External values ignored on other environments


[3.0.0] - 2018-05-12
--------------------
- [x] ini dependency dropped
- [x] traverse-async dependency dropped
- [x] validator dependency dropped
- [x] throws on unknown external module


[2.1.1] - 2018-05-08
--------------------
- [x] Update validator dependency


[2.1.0] - 2018-05-02
--------------------
- [x] Remove Azure plugin
- [x] Add Travis CI
- [x] Drop `async` dependency
- [x] Typecast foreign values


[2.0.2] - 2018-03-26
--------------------
- [x] Fix promise rejection #1


[2.0.0] - 2017-12-13
--------------------
- [x] Update readme
- [x] Move from callbacks to async/await


[1.2.0] - 2017-07-14
--------------------
- [x] REMOVED config section existence check


[1.1.0] - 2017-07-05
--------------------
- [x] ADDED a check for environment config section existence
- [x] ADDED environment variables support (via `ENV::` prefix)


[1.0.0] - 2017-06-08
--------------------
- [x] ADDED azure vault values fetch fix #7
- [x] CHANGED codebase to native node es6 (no builds) fix #6
