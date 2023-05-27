export default class Api {
  constructor(data){
    this._apiUrl = data.apiUrl;
    this._headers = data.headers
  }
  // функция получения респонса и его преобразования в объект
  _getRes(res) {
    return (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
  }
  // функция получения информации пользователя
  getUserInfo() {
    return fetch(`${this._apiUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._getRes)
  }
  // функция установки новой информации пользователя
  setUserInfo(userData) {
    return fetch(`${this._apiUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })     
    })
    .then(this._getRes)
  }
  // функция установки нового аватара пользователя
  setUserAvatar(userData) {
    return fetch(`${this._apiUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: userData.avatar,
      })     
    })
    .then(this._getRes)
  }
  // функция получения информации о карточках
  getInitialCards() {
    return fetch(`${this._apiUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._getRes)
  }
  // функция добавления новой карточки
  addCard(cardData) {
    return fetch(`${this._apiUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })     
    })
    .then(this._getRes)
  }
  // функция добавления новой карточки
  removeCard(idCard) {
    return fetch(`${this._apiUrl}/cards/${idCard}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._getRes)
  }
  // функция добавления лайка карточки
  addLike(idCard) {
    return fetch(`${this._apiUrl}/cards/${idCard}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._getRes)
  }
  // функция удаления лайка карточки
  removeLike(idCard) {
    return fetch(`${this._apiUrl}/cards/${idCard}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._getRes)
  }
}