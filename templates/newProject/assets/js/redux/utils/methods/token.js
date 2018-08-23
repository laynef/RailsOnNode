export function getJSONHeader() {
	return window.TOKEN && window.STORE.user.login.data.user_id ? {
		headers: {
			Authorization: window.TOKEN,
			User: window.STORE.user.login.data.user_id ,
		},
	} : {};
}

export function getCSRFHeader() {
	return window.CSRF ? {
		headers: {
			'X-CSRF-Token': window.CSRF,
		},
	} : {};
}

