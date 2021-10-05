import { options } from './constants'

class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkResponse(res) {
        if (!res.ok) {
            return new Error(res.status);
        }
        return res.json();
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            credentials: 'include',
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: 'include',
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    updateUserInfo(user) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            credentials: 'include',
            body: JSON.stringify({
                name: user.name,
                about: user.about,
            })
        })
            .then(this._checkResponse);
    }

    updateUserAvatar({ link }) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            credentials: 'include',
            body: JSON.stringify({
                avatar: link,

            })
        })
            .then(this._checkResponse);
    }

    addNewCard(card) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                name: card.name,
                link: card.link,
            })
        })
            .then(this._checkResponse);;
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            headers: this._headers,
            credentials: 'include',
            method: 'DELETE',
        })
            .then(this._checkResponse);
    }

    _likeCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            headers: this._headers,
            credentials: 'include',
            method: 'PUT',
        })
            .then(this._checkResponse);
    }

    _removeLikeCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            headers: this._headers,
            credentials: 'include',
            method: 'DELETE',
        })
            .then(this._checkResponse);
    }

    changeLikeCardStatus(id, isChange) {
        if (isChange) {
            return this._likeCard(id);
        } else {
            return this._removeLikeCard(id);
        }
    }
}

const api = new Api(options);

export default api;