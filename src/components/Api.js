class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getInitialProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Произошла ошибка");
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Произошла ошибка");
    }).catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
  }

  editProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Произошла ошибка");
    }).catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
  }

  editProfileAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Произошла ошибка");
    }).catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(data),
    }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Произошла ошибка");
    }).catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
    }).then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject("Произошла ошибка");
    }).catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
  }

  likeCard(dataId) {
    return fetch(`${this._url}/cards/likes/${dataId}`, {
        method: "PUT",
        headers: this._headers
    }).then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject("Произошла ошибка");
    }).catch((err) => {
      console.log(`Ошибка: ${err}`)
    })

  }

  dislikeCard(dataId) {
    return fetch(`${this._url}/cards/likes/${dataId}`, {
        method: "DELETE",
        headers: this._headers
    }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Произошла ошибка");
    }).catch((err) => {
      console.log(`Ошибка: ${err}`)
    })

  }


}

export default Api;
