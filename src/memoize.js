
export function memoize(func) {
    if (typeof func !== 'function') {
        return null;
    }

    const cache = {};

    return function memoizedFunc(...rest) {
        let index = 0;
        let returnResult;
        if (rest.length > 0) {
            index = getHash(rest);
        }

        if (!(index in cache)) {
            returnResult = func.apply(this, rest);
            cache[index] = returnResult;
        }
        return cache[index];
    };
}

function getHash(args) {
    return args.reduce((previousValue, currentValue) =>
        previousValue + JSON.stringify(currentValue));
}
