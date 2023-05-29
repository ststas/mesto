export default class Api {
  constructor(data){
    this._apiUrl = data.apiUrl;
    this._headers = data.headers
  }
  // функция получения ответа и преобразования его в объект
  _getRes(res) {
    return (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
  }
  // функция отправки fetch запроса
  _request (url, options) {
    return fetch(`${this._apiUrl}/${url}`, options).then(this._getRes)
  }
  // функция получения информации пользователя
  getUserInfo() {
    return this._request(`users/me`, {method: 'GET', headers: this._headers})
  }
  // функция установки новой информации пользователя
  setUserInfo(userData) {
    return this._request(`users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })     
    })
  }
  // функция установки нового аватара пользователя
  setUserAvatar(userData) {
    return this._request(`users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: userData.avatar,
      })     
    })
  }
  // функция получения информации о карточках
  getInitialCards() {
    return this._request(`cards`, {
      method: 'GET',
      headers: this._headers
    })
  }
  // функция добавления новой карточки
  addCard(cardData) {
    return this._request(`cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })     
    })
  }
  // функция добавления новой карточки
  removeCard(idCard) {
    return this._request(`cards/${idCard}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }
  // функция добавления лайка карточки
  addLike(idCard) {
    return this._request(`cards/${idCard}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
  }
  // функция удаления лайка карточки
  removeLike(idCard) {
    return this._request(`cards/${idCard}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }
}