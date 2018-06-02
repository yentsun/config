{
const external = require('./external');


function mount(target, path, value) {

    // credits: https://stackoverflow.com/a/2061827/216042

    const segments = path.split('.');
    if (segments.length < 2) {
        target[segments[0]] = value;
    } else {
        if (!target[segments[0]]) target[segments[0]] = {};
        target = target[segments.shift()];
        mount(target, segments.join('.'), value);
    }
}
const dict = {};
}

Result = (Comment / Section)+ EOF {return dict}
Section = name: SectionHeader  pairs: Pair+ {const value = pairs.reduce((res, [k, v]) => {
    if (typeof v === 'string' && v.includes('::')) {
        const [environment] = name.split('.');
        v = external(environment, v)
    }
    if (k.includes('[]')) {
        const key = k.replace('[]', '');
        res[key] ? res[key].push(v) : res[key] = [v];
    } else {
        res[k] = v;
    }
    return res;
 }, {});
 mount(dict, name, value)
 }
SectionHeader = "[" chars: [a-zA-Z0-9_. ]+ "]" EOL {return chars.join('').trim()}
JSONString = json: (JSONOpen String JSONClose) {
    try {return JSON.parse(json.join(''))}
    catch (e) {return json.join('')}
}
Pair = key: Key Separator value: Value (EOL+ / EOF) {return [key, value]}
Key = chars: [a-zA-Z0-9_\[\] ]+ {return chars.join('').trim()}
Value = JSONString / Null / Boolean / Float / Number / String
Separator = WS* ("=" / ":") WS*
WS = ' '+
Char = (!EOL .)
String = chars: (!(EOL / CommentMarker / JSONOpen / JSONClose) .)*  {return chars.map(v => v[1]).join('').trim()}
Digit = [0-9]
Minus = '-'
Float = num: Number '.' right: Digit+ {return Number(num + '.' + right.join(''))}
Number = m: Minus? digits: Digit+ {return Number((m || '') + digits.join(""))}
Boolean = True / False
True = ('true' / 'on') !Char {return true}
False = ('false' / 'off') !Char {return false}
Null = 'null' !Char {return null}
EOL = '\r\n' / '\n' / '\r'
EOF = !.
JSONOpen = "[" / "{"
JSONClose = "]" / "}"
Comment = CommentMarker String? CommentMarker* EOL+
CommentMarker = (';' / '#')+
