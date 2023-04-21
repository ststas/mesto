//ипортируем классы и данные
import initialCards from "./initial-сards.js";
import Card from "./Card.js"

//определяем переменные для заполенения карточек
const cardSectionElement = document.querySelector('.elements');

const profileElement = document.querySelector('.profile');
const profileEditButtonElement = profileElement.querySelector('.profile__edit-button');
const profileAddButtonElement = profileElement.querySelector('.profile__add-button');
const profileNameElement = profileElement.querySelector('.profile__name');
const profileOccupationElement = profileElement.querySelector('.profile__occupation');
const profilePopupElement = document.querySelector('#profile-popup');
const profileCloseButtonPopupElement = profilePopupElement.querySelector('.popup__close-button');
const profileSubmitButtonPopupElement = profilePopupElement.querySelector('.popup__submit-button');
const profilePopupFormElement = profilePopupElement.querySelector('.popup__form');
const profileNamePopupElement = profilePopupElement.querySelector('.popup__field_profile_name');
const profileOccupationPopupElement = profilePopupElement.querySelector('.popup__field_profile_occupation');
const profileInputFields = Array.from(profilePopupElement.querySelectorAll('.popup__field'));

const newPlacePopupElement = document.querySelector('#newplace-popup');
const newPlaceCloseButtonPopupElement = newPlacePopupElement.querySelector('.popup__close-button');
const newPlaceSubmitButtonPopupElement = newPlacePopupElement.querySelector('.popup__submit-button');
const newPlacePopupFormElement = newPlacePopupElement.querySelector('.popup__form');
const newPlaceNamePopupElement = newPlacePopupElement.querySelector('.popup__field_newplace_name');
const newPlaceLinkPopupElement = newPlacePopupElement.querySelector('.popup__field_newplace_link');
const newPlaceInputFields = Array.from(newPlacePopupFormElement.querySelectorAll('.popup__field'))

const picturePopupElement = document.querySelector('#picture-popup');
const picturePopupCloseButton = picturePopupElement.querySelector('.popup__close-button');
const picturePopupImageElement = picturePopupElement.querySelector('.popup__image');
const picturePopupImageCaptionElement = picturePopupElement.querySelector('.popup__image-caption');



//выполняем автозаполнение первых шести карточек мест
initialCards.forEach((initialCard) => {
  const card = new Card(initialCard, "#card-template", openPicturePopup);
  cardSectionElement.append(card.createCard())
})

//функция создания новой карточки места
function submitNewPlaceForm(event) {
  event.preventDefault();
  const newCard = {
    name: newPlaceNamePopupElement.value,
    link: newPlaceLinkPopupElement.value,
  };
  const card = new Card(newCard, "#card-template", openPicturePopup);
  cardSectionElement.prepend(card.createCard());
  newPlacePopupFormElement.reset();
  closePopup(newPlacePopupElement);
}

//функции открытия и закрытия попапа
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByPressOnEsc);
}
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByPressOnEsc);
}
const closePopupByPressOnEsc = function (event) {
  if(event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}
const closePopupByClickOnOverlay = function (event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}
//функция открытия попапа картинки
function openPicturePopup (name, link) {
  picturePopupImageElement.src = link
  picturePopupImageElement.alt = name
  picturePopupImageCaptionElement.textContent = name;
  openPopup(picturePopupElement);
}

//функция отправки данных из полей редактирования всплывающего окна в профиль
function submitProfileForm(event) {
  event.preventDefault();
  profileNameElement.textContent = profileNamePopupElement.value;
  profileOccupationElement.textContent = profileOccupationPopupElement.value;
  closePopup(profilePopupElement);
}

//обработчики событий для профиля
profileEditButtonElement.addEventListener('click', function () {
  openPopup(profilePopupElement);
  profileNamePopupElement.value = profileNameElement.textContent;
  profileOccupationPopupElement.value = profileOccupationElement.textContent;
  // disableButton(profileSubmitButtonPopupElement, {inactiveButtonClass: validationConfig.inactiveButtonClass})
  // profileInputFields.forEach(inputField => {
  //   checkInputValidity(inputField, {errorClass: validationConfig.errorClass, inputErrorClass: validationConfig.inputErrorClass})
  // })
});
profileCloseButtonPopupElement.addEventListener('click', function () {closePopup(profilePopupElement)});
profilePopupElement.addEventListener('click', function (event) {closePopupByClickOnOverlay(event)});
profilePopupFormElement.addEventListener('submit', submitProfileForm);

//обработчики событий для добавления новой карточки
profileAddButtonElement.addEventListener('click', function () {
  newPlacePopupFormElement.reset();
  // newPlaceInputFields.forEach(inputField => {
  //   removeErrorMessageAndRedUnderline(inputField, {errorClass: validationConfig.errorClass, inputErrorClass: validationConfig.inputErrorClass})
  // })
  // disableButton(newPlaceSubmitButtonPopupElement, {inactiveButtonClass: validationConfig.inactiveButtonClass})
  openPopup(newPlacePopupElement);
});
newPlaceCloseButtonPopupElement.addEventListener('click', function () {closePopup(newPlacePopupElement)});
newPlacePopupElement.addEventListener('click', function (event) {closePopupByClickOnOverlay(event)});
newPlacePopupFormElement.addEventListener('submit', submitNewPlaceForm);

//обработчики событий попапа картинки
picturePopupCloseButton.addEventListener('click', function () {closePopup(picturePopupElement)});
picturePopupElement.addEventListener('click', function (event) {closePopupByClickOnOverlay(event)});

