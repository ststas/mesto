const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible'
}

const enableValidation = ({formSelector, ...rest}) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach(form => {
    form.addEventListener('submit',(evt) => {
      evt.preventDefault();
    })
    setEventListners(form, rest);
  })  
  }
  
  
  const setEventListners = (formToValidate, {inputSelector, submitButtonSelector, ...rest}) => {
    const formInputs = Array.from(formToValidate.querySelectorAll(inputSelector));
    const formButton = formToValidate.querySelector(submitButtonSelector);
    disableButton(formButton, rest);
    formInputs.forEach(input => {
      input.addEventListener('input', () => {
        checkInputValidity(input, rest)
        if(hasInvalidInput(formInputs)) {
          disableButton(formButton, rest);
        } else {
          enableButton(formButton, rest);
        }
      })
    }) 
  }
  
  const checkInputValidity = (input, {inputErrorClass, errorClass}) => {
    const currentInput = document.querySelector(`#${input.id}`);
    const currentInputErrorContainer = document.querySelector(`#${input.id}-error`);
    if(!input.checkValidity()){
      currentInput.classList.add(inputErrorClass);
      currentInputErrorContainer.classList.add(errorClass);
      currentInputErrorContainer.textContent = input.validationMessage;
    }else {
      currentInput.classList.remove(inputErrorClass);
      currentInputErrorContainer.classList.remove(errorClass);
      currentInputErrorContainer.textContent = '';
    }
  }
  
  const hasInvalidInput = (formInputs) => {
    return formInputs.some(item => !item.validity.valid);
  }
  
  const enableButton = (button, {inactiveButtonClass}) => {
    button.classList.remove(inactiveButtonClass);
  }
  const disableButton = (button, {inactiveButtonClass}) => {
    button.classList.add(inactiveButtonClass);
  }
  enableValidation(validationConfig);