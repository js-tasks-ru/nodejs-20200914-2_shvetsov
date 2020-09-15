function sum(a, b) {
    let result;
    if (isFiniteNumber(a) && isFiniteNumber(b)) {
        result = a + b;
    } else {
        throw new TypeError('Not number');
    }
    return result;
}

function isFiniteNumber(value) {
    return Number.isFinite(value);
}

module.exports = sum;
