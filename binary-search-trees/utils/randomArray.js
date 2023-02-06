const randomUnsortedArray = () =>
    Array.from({ length: randomLength() }, () => randomNum());

// Prevents size 0 array from being generated, causing potential errors.
function randomLength() {
    return Math.floor(Math.random() * 101) + 1;
}

function randomNum() {
    return Math.floor(Math.random() * 101);
}

export default randomUnsortedArray;
