export default class Card {
  constructor(data, template, handleCardClick) {
    this._title = data.name;
    this._image = data.link;
    this._template = template;
    this._handleCardClick = handleCardClick
  }
// функция создания шаблона карточки
  _getTemplate () {
    const cardElement = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }
// функция создания карточки
createCard () {
  this._element = this._getTemplate();
  this._elementImage = this._element.querySelector('.element__image')
  this._elementImage.src = this._image
  this._elementImage.alt = this._title
  this._element.querySelector('.element__title').textContent = this._title
  this._setEventListeners()   
  return this._element;
}  
// функция установки слушателей на кнопки и изображение карточки
  _setEventListeners () {
    this._likeButton = this._element.querySelector('.element__heart-button')
    this._likeButton.addEventListener('click', () => {
      this._likeCard();
    })
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._deleteCard();
    })
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._title, this._image);
    })
  }  
// функция лайка карточки
  _likeCard = () => {
    this._likeButton.classList.toggle('element__heart-button_active')
  }
// функция удаления карточки
  _deleteCard = () => {
      this._element.remove();
      this._element = null;
  }
}