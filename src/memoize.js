export function memoize(func) {
    if (typeof func !== 'function') {
        return null;
    }
    const cache = new Map();
    return function memoizedFunc(...args) {
        const key = getHash(args);
        if (!(cache.has(key))) {
            cache.set(key, func.apply(this, args));
        }
        return cache.get(key);
    };
}

function getHash(args) {
    return JSON.stringify(args);
}
