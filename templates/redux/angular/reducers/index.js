import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { fileNames } from '../utils/methods/files';

const remainingReducers = fileNames.reduce((acc, item) => {
    let reducer = require(`./components/${item}`);
    acc[`${item}`] = reducer;
    return acc;
}, {});

export default combineReducers({
    form,
    ...remainingReducers,
});
