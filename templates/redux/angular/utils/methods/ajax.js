import axios from 'axios';
import { getJSONHeader, getCSRFHeader } from './token';
import { actionTypes } from '../../store/actionTypes';

export function ajax(dispatch, actionName, method, route, success, auth = true, body = null) {

    const actions = Array.isArray(actionName) ? actionName : [actionName];

	actions.forEach(e => dispatch({ type: actionTypes[`${e}_PENDING`] }));

	const getFromApi = !body ? () => axios[method](
		`https://${process.env.API_HOST_URL}${process.env.API_BASE}${route}`,
		auth ? getJSONHeader() : {},
	) : () => axios[method](
		`https://${process.env.API_HOST_URL}${process.env.API_BASE }${route}`,
		body,
		auth ? getJSONHeader() : {},
	);

	return getFromApi()
		.then((response) => {
			actions.forEach(e => dispatch({
				payload: success(response.data),
				type: actionTypes[`${e}_SUCCESS`],
			}));
			return success(response.data);
		})
		.catch((error) => {
			actions.forEach(e => dispatch({
				type: actionTypes[`${e}_ERROR`],
				payload: error.data,
			}));
		});
};

export function set(data) {
	axios.post('/set', data, getCSRFHeader());
}

export function webRoute(route, data) {
	axios.post(route, data, getCSRFHeader());
}

export function getIpState() {
    return window.IPLOCATION && window.IPLOCATION.region ? window.IPLOCATION.region : false;
}
