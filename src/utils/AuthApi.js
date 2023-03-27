import { authUrl } from './constants.js';

const register = formValue => {
	return fetch(`${authUrl}/signup`, {
		method: 'POST',
		header: {
			'Content-Type': 'application/json'
		},
		body: formValue
	}).then(response => {});
};
