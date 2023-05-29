export default class Card {
  constructor(
    data,
    userId,
    template,
    handleCardClick,
    handleCardDeleteClick,
    addCardLike,
    removeCardLike
    ) 
  
  {
    this._title = data.name;
    this._image = data.link;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes
    this._userId = userId;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._handleCardDeleteClick = handleCardDeleteClick;
    this._addCardLike = addCardLike;
    this._removeCardLike = removeCardLike;
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
  this._likesCounter = this._element.querySelector('.element__likes-counter')
  this._likesCounter.textContent = this._likes.length
  this._likeButton = this._element.querySelector('.element__heart-button')
  this._deleteButton = this._element.querySelector('.element__delete-button')
  this._setEventListeners()   
  return this._element;
}  
// установка слушателей на кнопки и изображение карточки
  _setEventListeners () {
    this._likes.forEach(like => {
      if(like._id === this._userId) {
        this._likeButton.classList.add('element__heart-button_active')
      }
      })
    this._likeButton.addEventListener('click', () => {
      this._likeCard(this);
    })

    if(this._ownerId === this._userId){
      this._deleteButton.addEventListener('click', (event) => {
        event.preventDefault()
        this._handleCardDeleteClick(event, this._cardId);
      }) 
    } else 
        {this._deleteButton.classList.add('element__delete-button_disable')}

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._title, this._image);
    })
  }  
// функция лайка карточки
  _likeCard = () => {
    if(this._likeButton.classList.contains('element__heart-button_active')) 
    {this._removeCardLike(this)}
    else 
      {this._addCardLike(this)}
  }
}