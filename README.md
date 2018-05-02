YT Config
=========

[![Build Status](https://travis-ci.org/yentsun/config.svg?branch=master)](https://travis-ci.org/yentsun/config)
[![Coverage Status](https://coveralls.io/repos/github/yentsun/config/badge.svg?branch=master)](https://coveralls.io/github/yentsun/config?branch=master)
[![dependencies Status](https://david-dm.org/yentsun/config/status.svg)](https://david-dm.org/yentsun/config)

This module is a wrapper around [ini] package but adds some missing
features:

- environment sections (merged with default)
- basic typecasting (values that look like numbers are returned as numbers)
- valid JSON values are returned parsed

It was made to achieve two things:

- *never repeat config for different environments* - you have default sections
  that are valid for any environment and you only override values that 
  are different
- *have all of the config in one file*


Example
=======

This ini:

```ini
[default]
array = [1, 2, 3, 4, 5]
decimal = 20.5

[default.db]
port = 3636
host = some.host

[development.db]
host = localhost

[production.db]
host = production.host
```

will result in the following config object:

```js
{ array: [ 1, 2, 3, 4, 5 ],
  decimal: 20.5,
  db: { port: 3636, host: 'localhost' },
  environment: 'development' }

```

*(`development` is the default environment)*

If we set `NODE_ENV` to `production`:

```js
{ array: [ 1, 2, 3, 4, 5 ],
  decimal: 20.5,
  db: { port: 3636, host: 'production.host' },
  environment: 'production' }

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

[ini]: https://www.npmjs.com/package/ini
[example.js]: example/example.js
