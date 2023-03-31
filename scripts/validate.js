// const form = document.querySelectorAll('popup__form')
// console.log(form)
// const validationConfig = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__field',
//   submitButtonSelector: '.popup__submit-button',
//   inactiveButtonClass: 'popup__submit-button_disabled',
//   activeButtonClass: 'popup__submit-button_active'
// }
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible'
}
const enableValidation = ({formSelector, ...rest}) =>{
const forms = Array.from(document.querySelectorAll(formSelector))  
forms.forEach(form => {
  form.addEventListener('submit',(evt) => {
    evt.preventDefault();
  })
})
setEventListners(form, rest)
}

const setEventListners = (formToValidate) => {
  const formInputs = Array.from(form.querySelectorAll('.popup__field'))
  const formButton = form.querySelector('.popup__submit-button')
  disableButton(formButton);
  formInputs.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(input)
      if(hasInvalidInpup(formInputs)) {
        disableButton();
      } else {
        enableButton();
      }
    })
  }) 
}
const checkInputValidity = (input) => {
  const currentInputErrorContainer = document.querySelector('#name-card-error')
  if(!input.checkValidity()){
    currentInputErrorContainer.textContainer = input.validationMessage;

  }else {
    currentInputErrorContainer.textContainer = '';
  }
}

const hasInvalidInput = (formInputs) => {
  return formInputs.some(item => !item.validity.valid)
}

const enableButton = (button) => {
  button.classList.remove('popup__button_invalid')
  button.classList.add('popup__button_valid')
  button.setAttribute('disabled', true)
}
const disableButton = (button) => {
  button.classList.add('popup__button_invalid')
  button.classList.remove('popup__button_valid')
  button.setAttribute('disabled', false)
}

enableValidation(validationConfig);