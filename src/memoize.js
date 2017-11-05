export function memoize(functionMemoize) {
    if (typeof functionMemoize !== 'function') {
        return null;
    }
    const cache = {};
    return function my(...args) {
        let index = 0;
        if (args.length > 0) {
            index = check(args);
        }

        if (!(index in cache)) {
            cache[index] = this::functionMemoize(...args);
        }
        return cache[index];
    };

    function check(...args) {
        const params = new Array(stringify(args));
        if (params.length === 0) {
            return 0;
        }
        if (functionMemoize.calculateHash === undefined || functionMemoize.params !== params) {
            const hashValue = params.reduce((sum, cur, i) =>
                sum + (((cur || params.length - cur) + ((cur.charCodeAt(i) * i) + i))));
            Object.defineProperties(functionMemoize, {
                params: {
                    value: params,
                    writable: true,
                    configurable: true
                },
                calculateHash: {
                    value: hashValue,
                    writable: false,
                    configurable: true
                }
            });
        }
        return functionMemoize.calculateHash;
    }

    function type(obj) {
        return Object.prototype.toString.call(obj).match(/.* (.*)\]/)[1];
    }

    function objectStringify(obj) {
        const result = [];
        Object.keys(obj).forEach((key) => {
            const val = stringify(obj[key]);
            if (val !== null) {
                result.push(`"${key}": ${val}`);
            }
        });
        return `{${result.join(',')}}`;
    }

    function stringify(obj) {
        switch (type(obj)) {
            case 'Null':
                return 'null';
            case 'Number':
                return `Number:${obj}`;
            case 'String':
                return `"String:${obj}"`;
            case 'Array':
                return `[${
                    obj.map(o => stringify(o)).join(',')
                }]`;
            case 'Boolean':
                return `Boolean:${obj.toString()}`;
            case 'RegExp':
                return `RegExp:${obj.toString()}`;
            case 'Object':
                return objectStringify(obj);
            case 'Function':
            case 'Undefined':
            default:
                return null;
        }
    }
}
