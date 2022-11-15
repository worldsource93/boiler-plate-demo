'use strict';

const q = module.exports;


// localStorage API
q.storageSetItem = (k, v) => {
	return localStorage.setItem(k, v);
};

q.storageGetItem = (k) => {
	return localStorage.getItem(k);
};

q.storageDelItem = (k) => {
	localStorage.removeItem(k);
};

q.storageClsItem = () => {
	localStorage.clear();
};


// cookie API
q.getCookie = (name) => {
	const matches = document.cookie.match(new RegExp(
		'(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
};

q.setCookie = (name, value, option) => {
	const options = {
		path: '/',
		...option
	};

	if (options.expires instanceof Date) {
		options.expires = options.expires.toUTCString();
	}

	let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

	for (const optionKey in options) {
		updatedCookie += `;${optionKey}`;
		const optionValue = options[optionKey];
		if (optionValue !== true) {
			updatedCookie += `=${optionValue}`;
		}
	}

	document.cookie = updatedCookie;
};

q.deleteCookie = (name) => {
	setCookie(name, '', { 'max-age': -1 });
};

q.clearCookie = () => {
	// deleteCookie('blabla');
};

const restSVR = ROOTPATH + process.env.REST_SERVER_URL;
const authSVR = ROOTPATH + process.env.AUTH_SERVER_URL;