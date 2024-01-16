import { apiOptions } from "./constants.js";

class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _getRequest(url, options) {
    return fetch(`${url}`, options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUserInfo() {
    return this._getRequest(`https://nomoreparties.co/v1/cohort-76/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  getCards() {
    return this._getRequest(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  editUserInfo(data) {
    return this._getRequest(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  addNewCard(data) {
    return this._getRequest(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.removeLike(id);
    } else {
      return this.addLike(id);
    }
  }

  addLike(id) {
    return this._getRequest(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  removeLike(id) {
    return this._getRequest(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  deleteCard(id) {
    return this._getRequest(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  editAvatar(data) {
    return this._getRequest(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }
}

const api = new Api(apiOptions);

export default api;
