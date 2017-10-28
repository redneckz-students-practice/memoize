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
        return params.reduce((sum, cur, i) => sum + (((cur || params.length - cur) + ((cur.charCodeAt(i) * i) + i))));
    }
}
