class Card {
  constructor(data, template) {
    this._title = data.name;
    this._image = data.link;
    this._template = template;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _likeCard = () => {
    this._element.querySelector('.element__heart-button').classList.toggle('element__heart-button_active')
  }

  _deleteCard = () => {
      this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.element__heart-button').addEventListener('click', () =>{
      this._likeCard();
    })
    this._element.querySelector('.element__delete-button').addEventListener('click', () =>{
      this._deleteCard();
    })
  }

  createCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__title').textContent = this._title
    this._element.querySelector('.element__image').src = this._image
    this._element.querySelector('.element__image').alt = this._title
    this._setEventListeners()
    
    return this._element;
  }
}

export default Card;