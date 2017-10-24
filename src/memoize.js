export function memoize(action) {
    if (typeof action !== 'function') {
        return null;
    }
    const cache = {};
    return function my(...args) {
        let checksum = 0;
        if (args.length > 0) {
            checksum = check(args);
        }

        if (typeof cache[checksum] === 'undefined') {
            cache[checksum] = action.apply(this, args);
        }
        return cache[checksum];
    };

    function check(...args) {
        const params = JSON.stringify(args);
        let checksum = 0;
        let i;
        let len;
        if (params.length === 0) {
            return checksum;
        }

        for (i = 0, len = params.length; i < len; i += 1) {
            checksum += ((((checksum || params.length) - checksum) + ((params.charCodeAt(i) * i) + i)) || 0);
        }

        return checksum;
    }
}
