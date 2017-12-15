
export function memoize(func) {
    if (typeof func !== 'function') {
        return null;
    }

    const cache = new Map();

    return function memoizedFunc(...rest) {
        const key = getHash(rest);

        if (cache.has(key)) {
            return cache.get(key);
        }
        cache.set(key, func.apply(this, rest));
        return cache.get(key);
    };
}

function getHash(args) {
    if (args.length === 0) {
        return 0;
    }
    return JSON.stringify(args);
}
