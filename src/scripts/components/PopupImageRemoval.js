import Popup from "./Popup.js"

export default class PopupImageRemoval extends Popup {
  constructor({popupSelector, handlePopupFormSubmit}) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._handlePopupFormSubmit = handlePopupFormSubmit;
  }

  setEventListeners(){
    super.setEventListeners()
    this._form.addEventListener('submit', this._handlePopupFormSubmit)
  }
  
  // // получение значений полей формы
  // getInputValues() {
  //   this._formValues = {};
  //   this._inputList.forEach((input) => {this._formValues[input.name] = input.value});
  //   return this._formValues;
  // }
  // // функция загрузки данных профиля в поля попапа профиля при его открытии
  // setInputValues (userData) {
  //   this._inputList.forEach((input) => {input.value = userData[input.name]});
  // }

  // установка слушателей на форму для сабмита
 
  // // функция закрытия попапа с очисткой формы
  // closePopup() {
  //   super.closePopup() 
  // }
}