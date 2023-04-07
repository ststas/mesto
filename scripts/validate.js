//конфигурация валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible'
}
//функция выбора попап форм
const enableValidation = ({formSelector, ...rest}) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach(form => {
    setEventListners(form, rest);
  })  
}
//функция установки слушателей
const setEventListners = (formToValidate, {inputSelector, submitButtonSelector, ...rest}) => {
  const formInputFields = Array.from(formToValidate.querySelectorAll(inputSelector));
  const formSubmitButton = formToValidate.querySelector(submitButtonSelector);
  formInputFields.forEach(inputField => {
    inputField.addEventListener('input', () => {
      checkInputValidity(inputField, rest);
      if(hasInvalidInput(formInputFields)) {
        disableButton(formSubmitButton, rest);
      } else {
        enableButton(formSubmitButton, rest);
      }
    })
  })
}
//функция валидации полей ввода формы
const checkInputValidity = (inputField, rest) => {
  if(!inputField.validity.valid){
    showErrorMessageAndRedUnderline(inputField, rest)
  }else {
    removeErrorMessageAndRedUnderline(inputField, rest)
  }
}
//функция показа ошибки
const showErrorMessageAndRedUnderline = (inputField, {errorClass, inputErrorClass}) => {
  const currentInput = document.querySelector(`#${inputField.id}`);
  const currentInputErrorContainer = document.querySelector(`#${inputField.id}-error`);
  currentInputErrorContainer.classList.add(errorClass);
  currentInputErrorContainer.textContent = inputField.validationMessage;
  currentInput.classList.add(inputErrorClass);
}
//функция отмены ошибки
const removeErrorMessageAndRedUnderline = (inputField, {errorClass, inputErrorClass}) => {
  const currentInput = document.querySelector(`#${inputField.id}`);
  const currentInputErrorContainer = document.querySelector(`#${inputField.id}-error`);
  currentInputErrorContainer.classList.remove(errorClass);
  currentInput.classList.remove(inputErrorClass);
}
//функции статуса кнопки submit
const enableButton = (submitButton, {inactiveButtonClass}) => {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.removeAttribute('disabled');
}
const disableButton = (submitButton, {inactiveButtonClass}) => {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.setAttribute('disabled', true);
}
//функция проверки валидности всех полей для установки статуса кнопки submit
const hasInvalidInput = (formInputFields) => {
  return formInputFields.some(item => !item.validity.valid);
}
//вызов функции валидации
enableValidation(validationConfig);