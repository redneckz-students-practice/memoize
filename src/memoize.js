export function memoize(func) {
    if (typeof func !== 'function') {
        return null;
    }

    const cache = new Map();

    return function memoizedFunc(...rest) {
        const index = getHash(rest);
        let result;
        if (!(cache.has(index))) {
            result = func.apply(this, rest);
            cache.set(index, result);
        }
        return cache.get(index);
    };
}

function getHash(rest) {
    if (rest.length === 0) {
        return 0;
    }
    function appendCurrent(previousValue, currentValue) {
        return previousValue + JSON.stringify(currentValue);
    }
    return rest.reduce(appendCurrent);
}
