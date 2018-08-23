export const makeHashMap = (array) => {
    return array.reduce((acc, item) => {
        acc[item] = item;
        return acc;
    }, {});
};
