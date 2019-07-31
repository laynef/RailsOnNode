import { fileNames } from '../utils/methods/files';

const allActions = fileNames.reduce((acc, item) => {
    let object = require(`./components/${item}`);
    acc = {...acc, ...object};
    return acc;
}, {});

export default allActions;
