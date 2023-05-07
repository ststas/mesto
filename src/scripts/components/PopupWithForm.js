import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handlePopupFormSubmit}) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__field');
    this._handlePopupFormSubmit = handlePopupFormSubmit;
  }
  // получение значений полей формы
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {this._formValues[input.name] = input.value});
    return this._formValues;
  }
  // функция загрузки данных профиля в поля попапа профиля при его открытии
  setInputValues (userData) {
    this._inputList.forEach((input) => {input.value = userData[input.name]});
  }
  // установка слушателей на форму для сабмита
  setEventListeners(){
    super.setEventListeners()
    this._form.addEventListener('submit', this._handlePopupFormSubmit)
  }
  // функция закрытия попапа с очисткой формы
  closePopup() {
    this._form.reset();
    super.closePopup() 
  }
}