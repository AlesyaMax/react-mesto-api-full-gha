import { apiOptions } from "../utils/constants.js";

class ApiAuth {
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

  register(data) {
    return this._getRequest(`${this._url}/signup`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  authorization(data) {
    return this._getRequest(`${this._url}/signin`, {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data),
    });
  }

  checkAuth(token) {
    return this._getRequest(`${this._url}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
  }
}

const apiAuth = new ApiAuth(apiOptions);

export default apiAuth;
