import { kebabCase, isEmpty } from 'lodash';

export function formatWithCount(response, cb) {
	return response.data.reduce((acc, item, index, array) => {
		return cb(acc, item, index, array);
	}, { count: Number(response.count), dictionary: {}, array: [] });
}

export function formatWithObject(response, prop='id') {
    if (!isEmpty(response)) {
        let dict = {};
        const key = Array.isArray(prop) ? kebabCase(prop.map(e => response[e]).join('-')) : response[prop];
        dict[key] = response;
        return { array: [response], dictionary: dict, count: 1 };
    } else {
        return { array: [], dictionary: {}, count: 0, lookUpArray: {} };
    }
}

export function formatWithSingleObject(response, prop='id', lookUpKey='thread_id') {
    if (!isEmpty(response)) {
        let dictionary = {};
        const key = Array.isArray(prop) ? kebabCase(prop.map(e => response[e]).join('-')) : response[prop];
        dictionary[key] = response;
        let lookUp = {};
        lookUp[response[lookUpKey]] = [response];
        return { array: [response], dictionary: dictionary, count: 1, lookUpArray: lookUp };
    } else {
        return { array: [], dictionary: {}, count: 0, lookUpArray: {} };
    }
}
