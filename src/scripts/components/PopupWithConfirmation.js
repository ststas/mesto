import Popup from "./Popup.js"

export default class PopupCardDelete extends Popup {
  constructor({popupSelector, handlePopupFormSubmit}) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._handlePopupFormSubmit = handlePopupFormSubmit;
    this._submitButton = this._form.querySelector('.popup__submit-button')
    this._submitButtonText = this._submitButton.textContent
  }
// функция открытия попапа с передачей карточки для удаления и ее идентификатора
  openCardDeletePopup(cardToDelete, cardId) {
    this._cardToDelete = cardToDelete
    this._cardId = cardId
    super.openPopup()
  }

// функция изменения состояния названия кнопки сабмита "Сохранить"
  renderLoading(isLoading, loadingText) {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
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