/* eslint-disable */
import { actionTypes } from '../../store/actionTypes';


export function oneReducerBlock(action, state, actionName, stateKeys, propKey, lookUpKey) {

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
        const data = reducer.data;

        states[stateKeys].pending = null;
        states[stateKeys].data = Object.assign({}, data, action.payload);
		states[stateKeys].error = null;
		return states;
	}

	if (action.type && action.type === actionTypes[`${actionName}_ERROR`]) {
		states[stateKeys].pending = null;
		states[stateKeys].error = action.payload;
		return states;
	}

}
