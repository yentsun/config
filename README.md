YT Config
=========

[![Tests](https://github.com/yentsun/config/actions/workflows/test.yml/badge.svg)](https://github.com/yentsun/config/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/yentsun/config/branch/master/graph/badge.svg)](https://codecov.io/gh/yentsun/config)
[![npm version](https://badge.fury.io/js/yt-config.svg)](https://badge.fury.io/js/yt-config)
[![Node.js Version](https://img.shields.io/node/v/yt-config.svg)](https://nodejs.org/)
[![License](https://img.shields.io/github/license/yentsun/config.svg)](https://github.com/yentsun/config/blob/master/LICENSE)

This module has been designed to substitute existing ini-config parsers
out there. Some of which lack typecasting, some have too many
dependencies, none of them merges configs according to environment.

Main features:
- environment sections (merged with default)
- basic typecasting (values that look like numbers are returned as numbers)
- valid JSON strings are parsed
- **zero dependencies** - completely self-contained

Apart from parsing ini format, it achieves two things:
- *never repeat config for different environments* - you have 'default'
  section and you override values that differ for other environments
- *have all of the config in one file*


Example
=======

This ini:

```ini
[default]
negInt = -1
posInt = 2
keyDecimal = 10.5
arrayDecimal[] = -10.5
arrayDecimal[] = 12.43
switchOne = on
switchTwo = off
flag = true
falseFlag = false

[default.log]
level = DEBUG


; DEVELOPMENT

[development]
keyDEV = dev
array = ["one", "two", "three", 3]

[development.log]
level = INFO


; STAGING

[staging]
keySTG = stagingValue

[staging.log]
level = ERROR
```

will result in the following config object:

```js
{ negInt: -1,
  posInt: 2,
  keyDecimal: 10.5,
  arrayDecimal: [ -10.5, 12.43 ],
  switchOne: true,
  switchTwo: false,
  flag: true,
  falseFlag: false,
  log: { level: 'INFO' },
  keyDEV: 'dev',
  array: [ 'one', 'two', 'three', 3 ],
  environment: 'development' }
```

*(`development` is the default environment)*

If we set `NODE_ENV` to `staging`:

```js
{ negInt: -1,
  posInt: 2,
  keyDecimal: 10.5,
  arrayDecimal: [ -10.5, 12.43 ],
  switchOne: true,
  switchTwo: false,
  flag: true,
  falseFlag: false,
  null: null,
  log: { level: 'ERROR' },
  keySTG: 'stagingValue',
  environment: 'staging' }
```

For a working example see [example.js]


Install
=======

```sh
npm i yt-config
```


Usage
=====

**v5.x (ES6 Modules):**

```js
import configLoader from 'yt-config';

async function someFunc() {
    const config = await configLoader('config.ini');
}
```

**v4.x (CommonJS - deprecated):**

```js
const configLoader = require('yt-config');

async function someFunc() {
    const config = await configLoader('config.ini');
}
```

Advanced example
================

If we need to get some values from environment:

```ini
[default.db]
port = 3636
host = some.host
user = some_user
password = ENV::DB_PASSWORD
```


Migrating from v4 to v5
========================

Version 5.0.0 introduces breaking changes. Here's how to migrate:

### 1. Update Import Syntax

**Before (v4.x - CommonJS):**
```js
const configLoader = require('yt-config');
```

**After (v5.x - ES6 Modules):**
```js
import configLoader from 'yt-config';
```

### 2. Update package.json

If you're using ES6 modules in your project, ensure your `package.json` includes:
```json
{
  "type": "module"
}
```

Or use `.mjs` file extension for your ES6 module files.

### 3. Node.js Version Requirement

- **v4.x:** Any LTS version
- **v5.x:** Node.js >=18.0.0

### 4. Benefits of Upgrading

- ✅ **Zero dependencies** - No more `lodash.merge` dependency
- ✅ **All security vulnerabilities fixed** (31 vulnerabilities in v4.x)
- ✅ **Modern ES6 syntax**
- ✅ **Better code quality** - 95.4% test coverage
- ✅ **Smaller package size**

### API Compatibility

The API remains the same - only the import syntax changes. All configuration files and usage patterns work identically.


Test
====

```sh
npm test
```

[example.js]: example/example.js
