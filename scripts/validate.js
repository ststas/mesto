//конфигурация валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible'
}
//функция валидации формы
const enableValidation = ({formSelector, ...rest}) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach(form => {
    form.addEventListener('submit',(evt) => {
      evt.preventDefault();
    })
    setEventListners(form, rest);
  })  
}
//функция установки слушателей
const setEventListners = (formToValidate, {inputSelector, submitButtonSelector, ...rest}) => {
  const formInputFields = Array.from(formToValidate.querySelectorAll(inputSelector));
  const formSubmitButton = formToValidate.querySelector(submitButtonSelector);
  formInputFields.forEach(inputField => {
    inputField.addEventListener('input', () => {
      checkInputValidityErrorUnderLine(inputField, rest)
      checkInputValidityErrorMessage(inputField, rest)
      if(hasInvalidInput(formInputFields)) {
        disableButton(formSubmitButton, rest);
      } else {
        enableButton(formSubmitButton, rest);
      }
    })
  })
}
// фунция установки/снятия красного подчеркивания поля форм
const checkInputValidityErrorUnderLine = (inputField, {inputErrorClass}) => {
  const currentInput = document.querySelector(`#${inputField.id}`);
  if(!inputField.validity.valid){
    currentInput.classList.add(inputErrorClass);
  }else {
    currentInput.classList.remove(inputErrorClass);
  }
}
// функция показа/отмены ошибки
const checkInputValidityErrorMessage = (inputField, {errorClass}) => {
  const currentInputErrorContainer = document.querySelector(`#${inputField.id}-error`);
  if(!inputField.validity.valid){
    currentInputErrorContainer.classList.add(errorClass);
    currentInputErrorContainer.textContent = inputField.validationMessage;
  }else {
    currentInputErrorContainer.classList.remove(errorClass);
    currentInputErrorContainer.textContent = '';
  }
}
//функция проверки валидности поля
const hasInvalidInput = (formInputFields) => {
  return formInputFields.some(item => !item.validity.valid);
}
//функции статуса кнопки submit
const enableButton = (submitButton, {inactiveButtonClass}) => {
  submitButton.classList.remove(inactiveButtonClass);
}
const disableButton = (submitButton, {inactiveButtonClass}) => {
  submitButton.classList.add(inactiveButtonClass);
}
//вызов функции валидации
enableValidation(validationConfig);