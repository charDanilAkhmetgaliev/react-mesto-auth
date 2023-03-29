import { authUrl } from './constants.js';

const processResponse = (response, error) => {
	console.log(response.status);
	if (response.status === 200 || response.status === 201) {
		return response.json();
	} else {
		console.log('Данные некорректны');
		return Promise.reject(error);
	}
};

const requestConstructor = (formValue, method, endPoint, error, headers) => {
	return fetch(`${authUrl}/${endPoint}`, {
		method: method,
		headers: headers,
		body: JSON.stringify(formValue)
	}).then(response => processResponse(response, error));
};

const registerUser = formValue => {
	return requestConstructor(formValue, 'POST', 'signup', 'Ошибка регистрации', {'Content-Type': 'application/json'});
};

const loginUser = formValue => {
	return requestConstructor(formValue, 'POST', 'signin', 'Ошибка авторизации', {'Content-Type': 'application/json'})
		.then(data => {
			const jwtToken = JSON.stringify(data);
			if (jwtToken) {
				localStorage.setItem('jwt', jwtToken);
				return jwtToken;
			} else {
				return;
			}
		})
};

const getContent = jwt => {
	return fetch(`${authUrl}/users/me`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${jwt}`
		}
	}).then(response => processResponse(response, 'Ошибка получения данных'))
		.then(data => data)
}

export { registerUser, loginUser, getContent };
