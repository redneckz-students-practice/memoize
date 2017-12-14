export function memoize(func) {
    if (typeof func !== 'function') {
        return null;
    }

    const cache = [];

    return function memoizedFunc(...rest) {
        let index = 0;
        let result;
        if (rest.length !== 0) {
            index = getHash(rest);
        }

        if (!(index in cache)) {
            result = func.apply(this, rest);
            cache[index] = result;
        }
        return cache[index];
    };
}

function getHash(rest) {
    function appendCurrent(previousValue, currentValue) {
        return previousValue + JSON.stringify(currentValue);
    }
    return rest.reduce(appendCurrent);
}
