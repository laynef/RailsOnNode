import {
	isEmpty,
	each,
	size,
	snakeCase,
	kebabCase,
	uniqWith,
	isEqual,
	extend,
} from 'lodash';

export const formDataFormat = (obj) => {
	let forms = new FormData();
	each(obj, (val, key) => {
		forms.append(key, val);
	});
	return forms;
};

export const querystring = (obj) => {
	if (isEmpty(obj)) return '';
	let str = '';
	let count = 0;
	each(obj, (val, key, collection) => {
		if (Array.isArray(val)) val = val.join(',');
		str += `${snakeCase(key)}=${val}`;
		if (size(collection) !== count + 1) str += '&';
		count += 1;
	});
	return '?' + str;
};

export const breakDownQS = (str) => {
    const querystring = str.replace(/\?/g, '');
    const array = querystring.split(',');
    const arr = array.map(e => e.split('='));
    return arr.reduce((acc, item) => {
        acc[item[0]] = item[1];
        return acc;
    }, {});
};

export const replacements = (allArrayData, prop, lookUpKey) => {
	const unique = allArrayData.reduce((acc, item) => {
		acc[item[prop]] = !!acc[item[prop]] ? extend(acc[item[prop]], item) : item;
		return acc;
	}, {});
	const array = Object.values(unique);
	return array.reduce((acc, item) => {
		let key = item[prop];
		const keys = item[lookUpKey] || false;
		if (prop === 'params' && prop === 'full_name') key =  kebabCase(item[prop]);
		acc.dictionary[key] = item;
		if (!!keys) {
			acc.lookUpArray[keys] = acc.lookUpArray[keys] ? acc.lookUpArray[keys] : [];
			acc.lookUpArray[keys].push(item);
		}
		return acc;
	}, { count: array.length, array, dictionary: {}, lookUpArray: {} });
};

export const deleteById = (allArrays, id, prop, lookUpKey) => {
    return allArrays.filter(e => e.id != id).reduce((acc, item) => {
        const key = item[prop];
        const keys = item[lookUpKey] || false;
        acc.array.push(item);
        acc.dictionary[key] = item;
        if (!!keys) {
            acc.lookUpArray[keys] = acc.lookUpArray[keys] ? acc.lookUpArray[keys] : [];
            acc.lookUpArray[keys].push(item);
        }
        return acc;
    }, { count: allArrays.length - 1, dictionary: {}, array: [], lookUpArray: {} });
};
