import Popup from "./Popup.js"

export default class PopupCardDelete extends Popup {
  constructor({popupSelector, handlePopupFormSubmit}) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._handlePopupFormSubmit = handlePopupFormSubmit;
  }
//функция открытия попапа с передачей карточки для удаления и ее идентификатора
  openCardDeletePopup(cardToDelete, cardId) {    
    super.openPopup()
    this._cardToDelete = cardToDelete
    this._cardId = cardId
  }
// установка слушателей
  setEventListeners(){
    super.setEventListeners()
    this._form.addEventListener('submit', (event) => {
      event.preventDefault(); 
      this._handlePopupFormSubmit(this._cardToDelete, this._cardId)
    })
  }
}