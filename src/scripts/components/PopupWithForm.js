import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handlePopupFormSubmit}) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__field');
    this._handlePopupFormSubmit = handlePopupFormSubmit;
    this._submitButton = this._form.querySelector('.popup__submit-button')
  }
  // функция изменения состояния названия кнопки сабмита "Сохранить"
  renderLoadingSave(isLoading) {
    if(isLoading) {
      this._submitButton.textContent = 'Сохранение...'}
    else {
      this._submitButton.textContent = 'Сохранить'}
  }
// функция возврата к начальному состоянию названия кнопки сабмита "Создать"
  renderLoadingCreate() {
    this._submitButton.textContent = 'Создать'
  }

  // получение значений полей формы
  getInputValues() {
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
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.renderLoadingSave(true) 
      this._handlePopupFormSubmit(this.getInputValues())
    })
  }
  // функция закрытия попапа с очисткой формы
  closePopup() {
    this._form.reset();
    super.closePopup() 
  }
}