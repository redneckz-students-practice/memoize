export function memoize(func) {
    if (!(typeof func === 'function')) return null;
    const storage = new Map();
    function generateKey(args) {
        const key = args.map(elem => `${(typeof elem)}:${elem}`).join('|');
        return key;
    }
    return function (...args) {
        const key = generateKey(args);
        if (storage.has(key)) return storage.get(key);
        const value = func.apply(this, args);
        storage.set(key, value);
        return value;
    };
}
