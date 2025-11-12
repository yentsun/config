# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**yt-config** - An INI-based configuration parser with environment-aware merging and automatic typecasting.

### Key Features
- Environment-based configuration sections (default + environment-specific overrides)
- Automatic typecasting (numbers, booleans, JSON arrays)
- External value resolution from environment variables (e.g., `ENV::DB_PASSWORD`)
- Nested configuration via dot notation (e.g., `[default.log]`)
- Array support using `[]` suffix syntax
- Single dependency: `lodash.merge`

## Development Commands

**Run tests:**
```bash
npm test
```

**Test with coverage:**
```bash
npm run coverage
```

**Lint code:**
```bash
npm run lint        # Check for issues
npm run lint:fix    # Auto-fix issues
```

## Architecture

**Module System:** ES6 modules (import/export)

### Core Files
1. **index.js** - Main entry point. Async function that loads INI file, determines environment (from `NODE_ENV`, defaults to `development`), merges default section with environment-specific section using lodash.merge
2. **parser.js** - INI parser implementation. Handles section parsing, key-value extraction, array syntax (`key[]=value`), dot notation for nesting, typecasting, and external value resolution
3. **external.js** - External value resolver. Supports `ENV::KEY` for environment variables and `DUMMY::KEY` for testing. Automatically converts numeric strings to numbers

### Code Quality Tools
- **ESLint** - Comprehensive linting and formatting rules (no Prettier needed)
- **c8** - Code coverage tool with ES6 module support (94.81% coverage)

### Configuration Flow
1. Read INI file contents (index.js)
2. Parse into sections using regex pattern `/^\[([^\]]*)\]$|^([^=]+)(=(.*))?$/i` (parser.js)
3. Process dot notation sections (e.g., `[staging.log]` → `{staging: {log: {...}}}`)
4. Resolve external values via `::` syntax (external.js)
5. Typecast values:
   - `on`/`true` → `true`
   - `off`/`false` → `false`
   - Numeric strings → `Number`
   - Valid JSON → parsed objects/arrays
6. Merge `default` section with environment-specific section (index.js)
7. Add `environment` property to result

### INI Format Specifics
- Sections: `[section]` or `[section.nested]`
- Arrays: `key[] = value1` + `key[] = value2` → `[value1, value2]`
- Comments: `;` or `#`
- Quoted values: Preserve special characters and spacing
- Escape sequences: `\\`, `\;`, `\#`
- External values: `MODULE::KEY` format (currently supports `ENV` and `DUMMY`)

## Coding Style Rules

All enforced via ESLint:

- **Import spacing:** Always use 2 blank lines after import statements before the first code statement
- **Indentation:** 4 spaces (enforced by ESLint)
- **Quotes:** Single quotes (enforced by ESLint)
- **Semicolons:** Always required (enforced by ESLint)
- **No trailing commas:** No comma after last item in objects/arrays
- **Object spacing:** `{ foo: 'bar' }` not `{foo: 'bar'}`
- **Array spacing:** `[1, 2, 3]` not `[ 1, 2, 3 ]`
- **No unnecessary assignments:** Avoid patterns like `const x = ...; return x;` - return directly instead

## Testing

Tests are in **test.js** using Mocha and Node's built-in assert module. Test configurations are in **test_configs/** directory.

Test scenarios cover:
- Basic parsing with all data types
- Environment variable resolution
- Fallback to default when environment section missing
- Error handling for unknown external modules
- File not found errors

Run `npm run coverage` to see detailed coverage report.
