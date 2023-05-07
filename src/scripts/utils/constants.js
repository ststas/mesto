//массив для автозаполенения карточек мест
const initialCards = [
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'

  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  }
];
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
const picturePopupSelector = '#picture-popup';
const profileNameSelector = '.profile__name';
const profileOccupationSelector = '.profile__occupation';
const profileElement = document.querySelector('.profile');
const profileEditButtonElement = profileElement.querySelector('.profile__edit-button');
const profileAddButtonElement = profileElement.querySelector('.profile__add-button');
const profilePopupElement = document.querySelector('#profile-popup')
const profilePopupFormElement = profilePopupElement.querySelector('.popup__form');
const newPlacePopupElement = document.querySelector('#newplace-popup')
const newPlacePopupFormElement = newPlacePopupElement.querySelector('.popup__form');

export {
  initialCards, 
  validationConfig,
  cardsSectionSelector,
  cardTemplateElement,
  newPlacePopupSelector,
  profilePopupSelector,
  picturePopupSelector,
  profileNameSelector,
  profileOccupationSelector,
  profileEditButtonElement,
  profileAddButtonElement,
  profilePopupFormElement,
  newPlacePopupFormElement
}