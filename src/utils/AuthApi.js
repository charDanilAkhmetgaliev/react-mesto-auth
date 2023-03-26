import { authUrl } from './constants.js';
class AuthApi {
  constructor() {
    this._url = authUrl;
  }

  _processResponse(response, error) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(error);
  }

  registerNewUser(bodyData) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(bodyData)
    }).then(response => this._processResponse(response, 'register err'))
  }
}

const authApi = new AuthApi();

export default authApi;