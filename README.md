YT Config
=========

This module is based mostly on [ini module] but adds some missing features:

- sections (environment) merge with default
- typecasting
- fetch values from remote storage (only Azure Vault currently)


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

Or even from Azure Vault (experimental):

```ini
[default.db]
port = 3636
host = some.host
user = some_user
password = AZURE::db-password
```

This will work provided you have Azure SDK credentials in your env:

- `AZURE_CLIENT_ID`
- `AZURE_CLIENT_SECRET`
- `AZURE_VAULT_URI`


Test
====

```sh
npm test
```

[ini module]: https://www.npmjs.com/package/ini
[example.js]: example/example.js
