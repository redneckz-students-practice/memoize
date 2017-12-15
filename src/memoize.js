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

function getHash(obj) {
    let hash = '';

    switch (getType(obj)) {
        case 'Number': hash += `Number ${obj}`;
            break;
        case 'String': hash += `String ${obj}`;
            break;
        case 'Boolean': hash += `Boolean ${obj}`;
            break;
        case 'Array':
            hash += 'Array[';
            obj.forEach((elem) => {
                hash += getHash(elem);
            });
            hash += ']';
            break;
        case 'Object':
            hash += 'Object{';
            Object.keys(obj).forEach((prop) => {
                hash += getHash(obj[prop]);
            });
            hash += '}';
            break;
        default: hash += 'null';
    }
    return hash;
}

function getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
}
