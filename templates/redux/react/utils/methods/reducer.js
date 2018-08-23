/* eslint-disable */
import { actionTypes } from '../../store/actionTypes';
import { extend, concat } from 'lodash';
import { replacements, deleteById } from './methods';

export function setupReducerBlock(action, state, actionName, stateKeys, propKey, lookUpKey) {

	let states = {...state};

	stateKeys = !!stateKeys ? stateKeys : 'general';
	propKey = !!propKey ? propKey : 'id';

	if (action.type && action.type === actionTypes[`${actionName}_PENDING`]) {
		states[stateKeys].pending = true;
		states[stateKeys].error = null;
		return states;
	}

	if (action.type && action.type === actionTypes[`${actionName}_SUCCESS`]) {
		const reducer = states[stateKeys];
		const array = reducer.data.array;
		const payload = action.payload;
        const allArrays = array.concat(payload.array)
        const deleted = payload.deleted || payload.archived;

        states[stateKeys].pending = null;
        if (payload && payload.array && payload.array.length > 0) {
            states[stateKeys].data = deleted ? deleteById(array, payload.id, propKey || 'id', lookUpKey || 'thread_id') : replacements(allArrays, propKey || 'id', lookUpKey || 'thread_id');
        }
		states[stateKeys].error = null;
		return states;
	}

	if (action.type && action.type === actionTypes[`${actionName}_ERROR`]) {
		states[stateKeys].pending = null;
		states[stateKeys].error = action.payload;
		return states;
	}

}

export function setupInitialState(array = ['general']) {
    return array.reduce((acc, item) => {
        acc[item] = { data: { array: [], dictionary: {}, count: null, lookUpArray: {} }, error: null, pending: null };
        return acc;
    }, {});
}
