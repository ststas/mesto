import Popup from "./Popup.js"

export default class PopupImageDelete extends Popup {
  constructor({popupSelector, handlePopupFormSubmit}) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._handlePopupFormSubmit = handlePopupFormSubmit;
  }

  setEventListeners(){
    super.setEventListeners()
    this._form.addEventListener('submit', this._handlePopupFormSubmit)
  }
}