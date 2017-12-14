
export function memoize(func) {
    if (typeof func !== 'function') {
        return null;
    }

    const cache = new Map();

    return function memoizedFunc(...rest) {
        const index = getHash(rest);

        if (cache.has(index)) {
            return cache.get(index);
        }
        cache.set(index, func.apply(this, rest));
        return cache.get(index);
    };
}

function getHash(args) {
    return args.reduce((previousValue, currentValue) =>
        previousValue + JSON.stringify(currentValue));
}
