import { fileNames } from '../utils/methods/files';

const constants = fileNames.reduce((acc, item) => {
    let array = require(`./components/${item}`);
    acc = acc.concat(array.actionTypes.map(e => e.actionName));
    return acc;
}, []);

const data = fileNames.reduce((acc, item) => {
    let array = require(`./components/${item}`);
    acc[item] = array.actionTypes;
    return acc;
}, {});

const actionTypes = constants.reduce((acc, item) => {
    acc[`${item}_PENDING`] = `${item}_PENDING`;
    acc[`${item}_SUCCESS`] = `${item}_SUCCESS`;
    acc[`${item}_ERROR`] = `${item}_ERROR`;
    return acc;
}, {});

export default {
    actionTypes,
    ...data,
};
