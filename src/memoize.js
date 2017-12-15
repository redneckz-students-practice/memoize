export function memoize(func) {
    if (typeof func !== 'function') {
        return null;
    }

    const cache = new Map();

    return function memoizedFunc(...rest) {
        const key = getHash(rest);
        let result;
        if (!cache.has(key)) {
            result = func.apply(this, rest);
            cache.set(key, result);
        }
        return cache.get(key);
    };
}

function getHash(rest) {
    if (rest.length === 0) {
        return 0;
    }
    return JSON.stringify(rest);
}
