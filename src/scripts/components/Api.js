export default class Api {
  constructor(data){
    this._apiUrl = data.apiUrl;
    this._headers = data.headers
  }

  _getRes(res) {
    return (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
  }

  getUserInfo() {
    return fetch(`${this._apiUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._getRes)
    .catch(err => console.error(`Error: ${err}`))
  }

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
    .catch(err => console.error(`Error: ${err}`))
  }
  
  setUserAvatar(userData) {
    return fetch(`${this._apiUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: userData.avatar,
      })     
    })
    .then(this._getRes)
    .catch(err => console.error(`Error: ${err}`))
  }
 
  getInitialCards() {
    return fetch(`${this._apiUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._getRes)
    .catch(err => console.error(`Error: ${err}`))
  }

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
    .catch(err => console.error(`Error: ${err}`))
  }

  removeCard(idCard) {
    return fetch(`${this._apiUrl}/cards/${idCard}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._getRes)
    .catch(err => console.error(`Error: ${err}`))
  }

  addLike(idCard) {
    return fetch(`${this._apiUrl}/cards/${idCard}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._getRes)
    .catch(err => console.error(`Error: ${err}`))
  }

  removeLike(idCard) {
    return fetch(`${this._apiUrl}/cards/${idCard}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._getRes)
    .catch(err => console.log(`Error: ${err}`))
  }
}