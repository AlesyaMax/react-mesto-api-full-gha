import { apiAuthOptions } from "../utils/constants.js";

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
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  authorization(data) {
    return this._getRequest(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  checkAuth(token) {
    return this._getRequest(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

const apiAuth = new ApiAuth(apiAuthOptions);

export default apiAuth;
