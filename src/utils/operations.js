export const Intersect = (arr1, arr2) => {
    return arr1.filter(value => -1 !== arr2.indexOf(value));
};
