export default class Card {
  constructor(cardData, userDataId, template, handleCardClick, addLike, removeLike, removeCard) {
    // this._cardData = cardData
    this._title = cardData.name;
    this._image = cardData.link;
    this._likes = cardData.likes;
    this._idCard = cardData._id
    this._ownerId = cardData.owner._id
    this._userDataId = userDataId;
    this._template = template;
    this._handleCardClick = handleCardClick
    this._addLike = addLike;
    this._removeLike = removeLike;
    this._removeCard = removeCard;
  }
// функция создания шаблона карточки
  _getTemplate () {
    const cardElement = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }
// функция создания карточки
createCard () {
  // console.log(this._cardData)
  this._element = this._getTemplate();
  this._elementImage = this._element.querySelector('.element__image')
  this._elementImage.src = this._image
  this._elementImage.alt = this._title
  this._element.querySelector('.element__title').textContent = this._title
  this._deleteButton = this._element.querySelector('.element__delete-button')

  if(this._userDataId !== this._ownerId) {
    this._deleteButton.classList.add('element__delete-button_disable')
  }

  this._likesCounter = this._element.querySelector('.element__likes-counter')
  this._likesCounter.textContent = this._likes.length

  this._setEventListeners()   
  return this._element;
}  
// функция лайка карточки
_likeCard = () => {
  this._likeButton.classList.toggle('element__heart-button_active')
  if(this._likeButton.classList.contains('element__heart-button_active')) {
    this._addLike(this._idCard, this._likes, this._likesCounter);
  } else {
    this._removeLike(this._idCard, this._likes, this._likesCounter)
  }
}
// функция удаления карточки
_deleteCard = () => {
    this._element.remove();
    this._element = null;
}
// функция установки слушателей на кнопки и изображение карточки
  _setEventListeners () {
    this._likeButton = this._element.querySelector('.element__heart-button')
    this._likeButton.addEventListener('click', () => {
      this._likeCard();
    })
    this._deleteButton.addEventListener('click', () => {
      // this._deleteCard();
      this._removeCard(this._idCard)

    })
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._title, this._image);
    })
  }  

}