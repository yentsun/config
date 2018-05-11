{
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
Pair = key: Key Separator value: Value CommentInline* (EOL+ / EOF) {return [key, value]}
Key = chars: [a-zA-Z0-9_\[\] ]+ {return chars.join('').trim()}
Value = JSONString / Null / Boolean / Number / String
Separator = WS* ("=" / ":") WS*
WS = ' '+
String = chars: (!(EOL / CommentMarker / JSONOpen / JSONClose) .)*  {return chars.map(v => v[1]).join('').trim()}
Number = digits: [0-9.]+ {return Number(digits.join(""))}
Boolean = True / False
True = ('true' / 'on') WS* {return true}
False = ('false' / 'off') WS* {return false}
Null = 'null' {return null}
EOL = "\r\n" / '\n' / '\r'
EOF = !.
JSONOpen = "[" / "{"
JSONClose = "]" / "}"
CommentInline = CommentMarker String
Comment = CommentMarker String? EOL+
CommentMarker = (';' / '#')+
