class Card {
  constructor(data, template, openPicturePopup) {
    this._title = data.name;
    this._image = data.link;
    this._template = template;
    this._openPicturePopup = openPicturePopup
  }
//функция создания шаблона карточки
  _getTemplate () {
    const cardElement = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }
//функция создания карточки
createCard () {
  this._element = this._getTemplate();
  this._element.querySelector('.element__title').textContent = this._title
  this._element.querySelector('.element__image').src = this._image
  this._element.querySelector('.element__image').alt = this._title
  this._setEventListeners()   
  return this._element;
}  
//функция установки слушателей на кнопки и изображение карточки
  _setEventListeners () {
    this._element.querySelector('.element__heart-button').addEventListener('click', () => {
      this._likeCard();
    })
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._deleteCard();
    })
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openPicturePopup(this._title, this._image);
    })
  }  
//функция лайка карточки
  _likeCard = () => {
    this._element.querySelector('.element__heart-button').classList.toggle('element__heart-button_active')
  }
//функция удаления карточки
  _deleteCard = () => {
      this._element.remove();
      this._element = null;
  }
}
export default Card;