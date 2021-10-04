import { authOption } from './constants'

class Auth {
    constructor(authOption) {
        this._baseUrl = authOption.baseUrl;
        this._headers = authOption.headers;
    }

    _checkResponse(res) {
        if (!res.ok) {
            return new Error(res.status);
        }
        return res.json();
    }

    login(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({ password, email })
        })
            .then(this._checkResponse);
    }

    register(email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ password, email })
        })
            .then(this._checkResponse);
    };

    tokenCheck(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(this._checkResponse);
    }
}
const auth = new Auth(authOption);
export default auth;