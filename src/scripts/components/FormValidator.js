export default class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
  } 
// функция валидации
  enableValidation () {
    this._setEventListeners()
  } 
// функция установки слушателей
  _setEventListeners () {
    this._formInputFields = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._formSubmitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._formInputFields.forEach(inputField => {
      inputField.addEventListener('input', () => {
        this._inputField = inputField;
        this._checkInputValidity();
        if(this._hasInvalidInput(this._formInputFields)) {
          this._disableButton(this._formSubmitButton);
        } else {
          this._enableButton(this._formSubmitButton);
        }
      })
    })
  }
// функция валидации полей ввода формы
  _checkInputValidity () {
    if(!this._inputField.validity.valid){
      this._showErrorMessageAndRedUnderline()
    }else {
      this._removeErrorMessageAndRedUnderline()
    }
  }
// функция показа ошибки
  _showErrorMessageAndRedUnderline () {
    this._formElement.querySelector(`#${this._inputField.id}-error`).classList.add(this._errorClass);
    this._formElement.querySelector(`#${this._inputField.id}-error`).textContent = this._inputField.validationMessage;
    this._formElement.querySelector(`#${this._inputField.id}`).classList.add(this._inputErrorClass);
  }
// функция отмены ошибки
  _removeErrorMessageAndRedUnderline () {
    this._formElement.querySelector(`#${this._inputField.id}-error`).classList.remove(this._errorClass);
    this._formElement.querySelector(`#${this._inputField.id}-error`).textContent = '';
    this._formElement.querySelector(`#${this._inputField.id}`).classList.remove(this._inputErrorClass);
  }
// функции статуса кнопки submit
  _enableButton () {
    this._formSubmitButton.classList.remove(this._inactiveButtonClass);
    this._formSubmitButton.removeAttribute('disabled');
  }
  _disableButton () {
    this._formSubmitButton.classList.add(this._inactiveButtonClass);
    this._formSubmitButton.setAttribute('disabled', true);
  }
// функция сброса ошибок полей формы
  resetErrorsOnInputFields () {
    this._formInputFields.forEach(inputField => {
      this._inputField = inputField;
      if(!inputField.validity.valid) {
        this._removeErrorMessageAndRedUnderline()
      }
    })
    this._disableButton()
  }
// функция проверки валидности всех полей для установки статуса кнопки submit
  _hasInvalidInput = () => {
    return this._formInputFields.some(item => !item.validity.valid);
  }   
}