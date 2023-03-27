import { authUrl } from './constants.js';

const processResponse = (response, error) => {
	console.log(response.status);
	switch (response.status) {
		case 200:
			return response.json();
		case 400:
			console.log('Данные некорректны');
			return Promise.reject(error);
		default:
			return Promise.reject(error);
	}
};

const requestConstructor = (formValue, method, endPoint, error) => {
	return fetch(`${authUrl}/${endPoint}`, {
		method: method,
		header: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'password': formValue.password,
			'email': formValue.email
		})
	}).then(response => processResponse(response, error));
};

const register = formValue => {
	return requestConstructor(formValue, 'POST', 'signup', 'Ошибка регистрации');
};

const login = formValue => {
	return requestConstructor(formValue, 'POST', 'signin', 'Ошибка авторизации');
};

const getContent = jwt => {
	return fetch(`${authUrl}/users/me`, {
		method: 'GET',
		header: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwt}`
		}
	}).then(response => processResponse(response));
};

const onSignOut = () => {};

export { register, login, getContent };
