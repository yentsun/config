import resolveExternal from './external.js';


function isNumeric(val) {
    return !isNaN(val);
}

function isQuoted(value) {
    return (
        (value.charAt(0) === '"' && value.slice(-1) === '"') ||
        (value.charAt(0) === "'" && value.slice(-1) === "'")
    );
}

function dotSplit(input) {
    return input
        .replace(/\1/g, '\u0002LITERAL\\1LITERAL\u0002')
        .replace(/\\\./g, '\u0001')
        .split(/\./)
        .map((part) => {
            return part.replace(/\1/g, '\\.').replace(/\2LITERAL\\1LITERAL\2/g, '\u0001');
        });
}

export default (input) => {
    const output = {};
    let dummy = output;
    let section;
    const pattern = /^\[([^\]]*)\]$|^([^=]+)(=(.*))?$/i;
    const lines = input.split(/[\r\n]+/g);

    lines.forEach((line) => {
        // empty line or comment - ignore
        if (!line || line.match(/^\s*[;#]/)) return;

        const match = line.match(pattern);

        if (!match) return;

        // section
        if (match[1]) {
            section = sanitizeValue(match[1]);
            dummy = output[section] = output[section] || {};
            return;
        }

        let key = sanitizeValue(match[2]);
        let value = match[3] ? sanitizeValue(match[4]) : true;

        if (key.length > 2 && key.slice(-2) === '[]') {
            key = key.substring(0, key.length - 2);

            if (!dummy[key]) {
                dummy[key] = [];
            } else if (!Array.isArray(dummy[key])) {
                dummy[key] = [dummy[key]];
            }
        }

        // detect external config
        if (typeof value === 'string' && value.includes('::')) {
            value = resolveExternal(value);
        }

        // type cast
        if (['on', 'true'].includes(value)) {
            value = true;
        } else if (['off', 'false'].includes(value)) {
            value = false;
        } else if (isNumeric(value)) {
            value = Number(value);
        } else {
            try {
                value = JSON.parse(value);
            } catch (_error) {
                // mute errors
            }
        }

        if (Array.isArray(dummy[key])) {
            dummy[key].push(value);
        } else {
            dummy[key] = value;
        }
    });

    Object.keys(output)
        .filter((key) => {
            if (!output[key] || typeof output[key] !== 'object' || Array.isArray(output[key])) {
                return false;
            }

            const parts = dotSplit(key);
            let dummy = output;
            const last = parts.pop();
            const nl = last.replace(/\\\./g, '.');

            parts.forEach((part) => {
                if (!dummy[part] || typeof dummy[part] !== 'object') dummy[part] = {};

                dummy = dummy[part];
            });

            if (dummy === output && nl === last) {
                return false;
            }
            dummy[nl] = output[key];
            return true;
        })
        .forEach((del) => {
            delete output[del];
        });

    return output;
};

function sanitizeValue(value) {
    value = (value || '').trim();

    if (isQuoted(value)) {
        if (value.charAt(0) === "'") {
            value = value.substring(1, value.length - 2);
        }

        try {
            value = JSON.parse(value);
        } catch (_error) {}
    } else {
        let escape = false;
        let unescape = '';

        for (let i = 0, l = value.length; i < l; i++) {
            const char = value.charAt(i);

            if (escape) {
                if ('\\;#'.includes(char)) {
                    unescape += char;
                } else {
                    unescape += '\\' + char;
                }

                escape = false;
            } else if (';#'.includes(char)) {
                break;
            } else if (char === '\\') {
                escape = true;
            } else {
                unescape += char;
            }
        }

        if (escape) {
            unescape += '\\';
        }

        return unescape.trim();
    }
    return value;
}
