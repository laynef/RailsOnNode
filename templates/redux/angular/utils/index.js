const fileName = [
	'ajax',
	'token',
	'forms',
	'methods',
	'reducer',
	'oneReducer',
	'responses',
	'files',
	'permissions',
	'returns',
];

const dictionary = fileName.reduce((acc, item) => {
	acc = { ...acc, ...require(`./methods/${item}`) };
	return acc;
}, {});

export default dictionary;
