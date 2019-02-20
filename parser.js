function dotSplit (input) {
    return input
    .replace(/\1/g, '\u0002LITERAL\\1LITERAL\u0002')
    .replace(/\\\./g, '\u0001')
    .split(/\./)
    .map((part) => {
        return part
        .replace(/\1/g, '\\.')
        .replace(/\2LITERAL\\1LITERAL\2/g, '\u0001')
    })
}

module.exports = (input) => {

    const output = {};
    let p = output;
    let section;
    const re = /^\[([^\]]*)\]$|^([^=]+)(=(.*))?$/i;
    const lines = input.split(/[\r\n]+/g);

    lines.forEach((line) => {

        // empty line or comment - ignore
        if (!line || line.match(/^\s*[;#]/))
            return;

        const match = line.match(re);

        if (!match)
            return;

        // section
        if (match[1]) {
            section = unsafe(match[1]);
            p = output[section] = output[section] || {};
            return;
        }

        let key = unsafe(match[2]);
        let value = match[3] ? unsafe(match[4]) : true;

        switch (value) {
            case 'true':
            case 'false':
            case 'null':
                value = JSON.parse(value);
        }

        // Convert keys with '[]' suffix to an array
        if (key.length > 2 && key.slice(-2) === '[]') {
            key = key.substring(0, key.length - 2);

            if (!p[key]) {
                p[key] = [];
            } else if (!Array.isArray(p[key])) {
                p[key] = [p[key]];
            }
        }

        if (Array.isArray(p[key])) {
            p[key].push(value);
        } else {
            p[key] = value;
        }
    });

    Object.keys(output).filter((key) => {

        if (!output[key] || typeof output[key] !== 'object' || Array.isArray(output[key])) {
            return false;
        }

        const parts = dotSplit(key);
        let p = output;
        const last = parts.pop();
        const nl = last.replace(/\\\./g, '.');

        parts.forEach((part) => {

            if (!p[part] || typeof p[part] !== 'object')
                p[part] = {};

            p = p[part];
        });

        if (p === output && nl === last) {
            return false
        }
        p[nl] = output[key];
        return true;
    }).forEach(function (del) {
        delete output[del];
    });

    return output;
};

function isQuoted(value) {
    return (value.charAt(0) === '"' && value.slice(-1) === '"') ||
        (value.charAt(0) === "'" && value.slice(-1) === "'")
}

function unsafe(value) {
    value = (value || '').trim();

    if (isQuoted(value)) {

        if (value.charAt(0) === "'") {
            value = value.substr(1, value.length - 2)
        }

        try {
            value = JSON.parse(value)
        } catch (_) {}
    } else {
        let esc = false;
        let unesc = '';

        for (let i = 0, l = value.length; i < l; i++) {
            const char = value.charAt(i);

            if (esc) {

                if ('\\;#'.indexOf(char) !== -1) {
                    unesc += char
                } else {
                    unesc += '\\' + char
                }
                esc = false
            } else if (';#'.indexOf(char) !== -1) {
                break
            } else if (char === '\\') {
                esc = true
            } else {
                unesc += char
            }
        }
        if (esc) {
            unesc += '\\'
        }

        return unesc.trim()
    }
    return value
}
