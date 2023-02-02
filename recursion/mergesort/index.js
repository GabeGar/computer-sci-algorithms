const mergeSort = (arr) => {
    // Base case #1 - return and err out of the function, on empty array argument
    if (arr.length === 0 || !Array.isArray(arr)) {
        throw new Error(
            "The mergeSort function works only on non-empty arrays."
        );
    } else {
        // Base case #2 - return the single element/indexed arr, when length is down to 1.
        if (arr.length === 1) return arr;
        else {
            // Recursive case
            // Keep dividing the array up until it returns no elements
            // Using array.slice() to return halves of the array --- immutable method (does not mutate the original array).
            const mid = Math.floor(arr.length / 2);
            const left = arr.slice(0, mid);
            const right = arr.slice(mid);
            // Recursively call mergeSort on both sides of the array to accomplish the aforementioned and store in memory.
            // Finally pass array memory reference, from the recursive calls to merge, in order to get a single, sorted array
            const leftArr = mergeSort(left);
            const rightArr = mergeSort(right);
            return merge(leftArr, rightArr);
        }
    }
};

const merge = (leftArr, rightArr) => {
    // Push to the final array while sorting
    const sortedArr = [];

    // Main sorting mechanism, while both lengths are greater than 0.
    // Compares left array at 0th index against right array at 0th index.
    // Array.prototype.shift() pops element from the start off the array that was pushed. Thus, reducing/mutating array size.
    while (leftArr.length > 0 && rightArr.length > 0) {
        if (leftArr[0] < rightArr[0]) {
            sortedArr.push(leftArr[0]);
            leftArr.shift();
        } else {
            sortedArr.push(rightArr[0]);
            rightArr.shift();
        }
    }

    // Catch all, for either of the two arrays, when the length of one arr has reached 0, prior to the other.
    while (leftArr.length > 0) {
        sortedArr.push(leftArr[0]);
        leftArr.shift();
    }

    while (rightArr.length > 0) {
        sortedArr.push(rightArr[0]);
        rightArr.shift();
    }

    return sortedArr;
};

const output = mergeSort([9, 4, 8, 2, 12, 32, 99, 43, 15, 1, 7, 6]);
console.log(output);
