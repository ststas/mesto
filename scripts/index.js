//ипортируем данные
import validationConfig from "./validationconfig.js"
import initialCards from "./initial-сards.js"
//импортируем классы
import Card from "./Card.js"
import FormValidator from "./FormValidator.js"
//определяем переменные
const cardSectionElement = document.querySelector('.elements');
const profileElement = document.querySelector('.profile');
const profileEditButtonElement = profileElement.querySelector('.profile__edit-button');
const profileAddButtonElement = profileElement.querySelector('.profile__add-button');
const profileNameElement = profileElement.querySelector('.profile__name');
const profileOccupationElement = profileElement.querySelector('.profile__occupation');
const profilePopupElement = document.querySelector('#profile-popup');
const profileCloseButtonPopupElement = profilePopupElement.querySelector('.popup__close-button');
const profilePopupFormElement = profilePopupElement.querySelector('.popup__form');
const profileNamePopupElement = profilePopupElement.querySelector('.popup__field_profile_name');
const profileOccupationPopupElement = profilePopupElement.querySelector('.popup__field_profile_occupation');
const newPlacePopupElement = document.querySelector('#newplace-popup');
const newPlaceCloseButtonPopupElement = newPlacePopupElement.querySelector('.popup__close-button');
const newPlacePopupFormElement = newPlacePopupElement.querySelector('.popup__form');
const newPlaceNamePopupElement = newPlacePopupElement.querySelector('.popup__field_newplace_name');
const newPlaceLinkPopupElement = newPlacePopupElement.querySelector('.popup__field_newplace_link');
const picturePopupElement = document.querySelector('#picture-popup');
const picturePopupCloseButton = picturePopupElement.querySelector('.popup__close-button');
const picturePopupImageElement = picturePopupElement.querySelector('.popup__image');
const picturePopupImageCaptionElement = picturePopupElement.querySelector('.popup__image-caption');
//функция создания новой карточки
function createNewCard(item) {
  const newCard = new Card(item, "#card-template", openPicturePopup);
  return newCard.createCard();
}
//функция добавления карточки места
function submitNewPlaceForm(event) {
  event.preventDefault();
  const newCard = {
    name: newPlaceNamePopupElement.value,
    link: newPlaceLinkPopupElement.value,
  };
  cardSectionElement.prepend(createNewCard(newCard));
  newPlacePopupFormElement.reset();
  closePopup(newPlacePopupElement);
}
//выполняем автозаполнение первых шести карточек мест
initialCards.forEach((initialCard) => {
  cardSectionElement.append(createNewCard(initialCard));
})
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
  profilePopupFormValidator.resetErrorsOnInputFields();
  profileNamePopupElement.value = profileNameElement.textContent;
  profileOccupationPopupElement.value = profileOccupationElement.textContent;
  openPopup(profilePopupElement);
});
profileCloseButtonPopupElement.addEventListener('click', function () {closePopup(profilePopupElement)});
profilePopupElement.addEventListener('click', function (event) {closePopupByClickOnOverlay(event)});
profilePopupFormElement.addEventListener('submit', submitProfileForm);
//обработчики событий для добавления новой карточки
profileAddButtonElement.addEventListener('click', function () {
  newPlacePopupFormValidator.resetErrorsOnInputFields();
  newPlacePopupFormElement.reset();
  openPopup(newPlacePopupElement);
});
newPlaceCloseButtonPopupElement.addEventListener('click', function () {closePopup(newPlacePopupElement)});
newPlacePopupElement.addEventListener('click', function (event) {closePopupByClickOnOverlay(event)});
newPlacePopupFormElement.addEventListener('submit', submitNewPlaceForm);
//обработчики событий попапа картинки
picturePopupCloseButton.addEventListener('click', function () {closePopup(picturePopupElement)});
picturePopupElement.addEventListener('click', function (event) {closePopupByClickOnOverlay(event)});
//создаем класс для валидации формы профиля
const profilePopupFormValidator = new FormValidator(validationConfig, profilePopupFormElement);
profilePopupFormValidator.enableValidation();
//создаем класс для валидации формы добавления новой карточки места
const newPlacePopupFormValidator = new FormValidator(validationConfig, newPlacePopupFormElement);
newPlacePopupFormValidator.enableValidation();