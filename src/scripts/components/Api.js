export default class Api {
  constructor(data){
    this._apiUrl = data.apiUrl;
    this._headers = data.headers
  }

  _getRes(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserInfo() {
    return fetch(`${this._apiUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._getRes)
  }

  setUserInfo(userData) {
    fetch(`${this._apiUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })     
    })
  }

  getInitialCards() {
    return fetch(`${this._apiUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._getRes)
  }

  addNewCard(cardData) {
    fetch(`${this._apiUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })     
    })
    .then(this._getRes)
  }

  removeCard(idCard) {
    return fetch(`${this._apiUrl}/cards/${idCard}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._getRes)
  }

  addLike(idCard) {
    return fetch(`${this._apiUrl}/cards/${idCard}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._getRes)
  }

  removeLike(idCard) {
    return fetch(`${this._apiUrl}/cards/${idCard}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._getRes)
  }

}