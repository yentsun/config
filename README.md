YT Config
=========

[![Build Status](https://travis-ci.org/yentsun/config.svg?branch=master)](https://travis-ci.org/yentsun/config)
[![Coverage Status](https://coveralls.io/repos/github/yentsun/config/badge.svg?branch=master)](https://coveralls.io/github/yentsun/config?branch=master)
[![dependencies Status](https://david-dm.org/yentsun/config/status.svg)](https://david-dm.org/yentsun/config)
[![Known Vulnerabilities](https://snyk.io/test/github/yentsun/config/badge.svg?targetFile=package.json)](https://snyk.io/test/github/yentsun/config?targetFile=package.json)

This module has been designed to substitute existing ini-config parsers
out there. Some of which lack typecasting, some have too many
dependencies, none of them merges configs according to environment.

Main features:
- environment sections (merged with default)
- basic typecasting (values that look like numbers are returned as numbers)
- valid JSON strings are parsed
- no dependencies other than `lodash.merge`
- parsing is done via PEG.js grammar

Apart from parsing ini format, it achieves two things:
- *never repeat config for different environments* - you have 'default'
  section you override values that are different for other environments
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
null:null

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
  null: null,
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

```js
const configLoader = require('yt-config');
...

async function someFunc()  {
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


Test
====

```sh
npm test
```

[example.js]: example/example.js
