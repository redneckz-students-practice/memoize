export function memoize(func) {
    if (typeof func !== 'function') {
        return null;
    }
    const cache = new Map();
    return function memoizedFunc(...rest) {
        const znach = getHash(rest);
        if (cache.has(znach)) {          
            return cache.get(znach);
           }
        if (!(cache.has(znach))) {
            cache.set(znach, func.apply(this, rest));
            return cache.get(znach);
        }
    };
}

function getHash(rest) {
    if (rest.length === 0) {
        return 0;
    }
    return JSON.stringify(rest);
}