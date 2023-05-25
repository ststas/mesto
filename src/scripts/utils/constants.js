//конфигурация валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible'
}
//константы
const cardsSectionSelector = '.elements'
const cardTemplateElement = '#card-template';
const newPlacePopupSelector = '#newplace-popup';
const profilePopupSelector = '#profile-popup';
const profileAvatarPopupSelector = '#profile-avatar-popup';
const picturePopupSelector = '#picture-popup';
const profileNameSelector = '.profile__name';
const profileOccupationSelector = '.profile__occupation';
const profileAvatarSelector = '.profile__avatar'
const profileElement = document.querySelector('.profile');
const profileEditButtonElement = profileElement.querySelector('.profile__edit-button');
const profileAddButtonElement = profileElement.querySelector('.profile__add-button');
const profileAvatarEditButtonElement = profileElement.querySelector('.profile__avatar-block');

const profilePopupElement = document.querySelector('#profile-popup')
const profilePopupFormElement = profilePopupElement.querySelector('.popup__form');

const profileAvatarPopupElement = document.querySelector('#profile-avatar-popup')
const profileAvatarFormElement = profileAvatarPopupElement.querySelector('.popup__form');

const newPlacePopupElement = document.querySelector('#newplace-popup')
const newPlacePopupFormElement = newPlacePopupElement.querySelector('.popup__form');

export {
  validationConfig,
  cardsSectionSelector,
  cardTemplateElement,
  newPlacePopupSelector,
  profilePopupSelector,
  profileAvatarPopupSelector,
  profileNameSelector,
  profileAvatarSelector,
  picturePopupSelector,
  profileOccupationSelector,
  profileEditButtonElement,
  profileAddButtonElement,
  profileAvatarEditButtonElement,
  profilePopupFormElement,
  profileAvatarFormElement,
  newPlacePopupFormElement
}