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
    return this._getRequest(`${this._url}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    });
  }

  getCards() {
    return this._getRequest(`${this._url}/cards`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    });
  }

  editUserInfo(data) {
    return this._getRequest(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  addNewCard(data) {
    return this._getRequest(`${this._url}/cards`, {
      method: "POST",
      credentials: "include",
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
      credentials: "include",
      headers: this._headers,
    });
  }

  removeLike(id) {
    return this._getRequest(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    });
  }

  deleteCard(id) {
    return this._getRequest(`${this._url}/cards/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    });
  }

  editAvatar(data) {
    return this._getRequest(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  signOut() {
    return this._getRequest(`${this._url}/signout`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    })
  }
}

const api = new Api(apiOptions);

export default api;
