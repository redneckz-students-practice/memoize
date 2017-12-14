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
                hash += getHash(prop);
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
