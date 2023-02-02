// Merge Sort Algorithm - to get a sorted array
const mergeSort = (arr) => {
    if (arr.length === 1) return arr;

    const mid = Math.floor(arr.length / 2);

    const leftHalfOfArray = arr.slice(0, mid);
    const rightHalfOfArray = arr.slice(mid);

    const leftSide = mergeSort(leftHalfOfArray);
    const rightSide = mergeSort(rightHalfOfArray);

    return merge(leftSide, rightSide);
};

const merge = (left, right) => {
    const sortedArr = [];

    while (left.length > 0 && right.length > 0) {
        if (left[0] < right[0]) {
            sortedArr.push(left[0]);
            left.shift();
        } else {
            sortedArr.push(right[0]);
            right.shift();
        }
    }

    while (left.length > 0) {
        sortedArr.push(left[0]);
        left.shift();
    }

    while (right.length > 0) {
        sortedArr.push(right[0]);
        right.shift();
    }

    return sortedArr;
};

const sorted = mergeSort([12, 4, 6, 19, 32, 1, 50, 18, 9, 7]);
console.log(sorted);

// * Binary Search Algorithm * //
// * ARRAY MUST BE SORTED FIRST *//

// Repeat till sub arr is of size 0.
// Calculate mid point of current sub arr
// If target is at middle, stop.
// Else if target is less than what is at middle, repeat, changing the END point to be just to the left of the middle.
// Else if target is greater than what is at middle, repeat, changing the START point to be just to the right of the middle.

const binarySearch = (sortedArr, target) => {
    if (!target) throw new Error("No target was passed as a search argument");
    if (sortedArr.length === 0)
        return `${target} was not found. Does not exist in this data structure.`;
    const mid = Math.floor(sortedArr.length / 2);
    const middleValue = sortedArr[mid];

    if (middleValue === target)
        return `${target} was found. It exists in this data structure.`;
    else if (middleValue > target) {
        return binarySearch(sortedArr.slice(0, mid), target);
    } else if (middleValue < target) {
        return binarySearch(sortedArr.slice(mid + 1), target);
    }
};

const output = binarySearch(sorted);
console.log(output);
