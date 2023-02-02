// Fibonacci Iteratively
const fibs = (n) => {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fibs(n - 2) + fibs(n - 1);
};

const fibsSequencer = (n) => {
    const arr = [];
    for (let i = n; i > 0; i--) {
        arr.push(fibs(i));
    }
    return arr.reverse();
};

// ********************************** //

// Fibonacci Recursively
function fibsRec(n) {
    if (n === 0) return [0];
    if (n === 1) return [0, 1];
    const array = fibsRec(n - 1);
    return [...array, array[n - 2] + array[n - 1]];
}

// ********************************** //

// console.log(fibsRec(19));
console.log(fibsSequencer(19));
