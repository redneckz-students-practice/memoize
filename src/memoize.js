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
        const params = new Array(JSON.stringify(args));
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
}
