//определяем переменные для заполенения карточек мест
const cardSectionElement = document.querySelector('.elements');
const cardElement = document.querySelector('#card-template').content;
// определяем переменные для открытия/закрытия/редактирования всплывающих окон профиля, нового места
// и просмотра картинки
const profileElement = document.querySelector('.profile');
const profileEditButtonElement = profileElement.querySelector('.profile__edit-button');
const profileAddButtonElement = profileElement.querySelector('.profile__add-button');
const profileNameElement = profileElement.querySelector('.profile__name');
const profileOccupationElement = profileElement.querySelector('.profile__occupation');
const profilePopupElement = document.querySelector('#profile-popup');
const profileCloseButtonPopupElement = profilePopupElement.querySelector('.popup__close-button');
const profilePopupFormElement = profilePopupElement.querySelector('.popup__form')
const profileNamePopupElement = profilePopupElement.querySelector('.popup__field_profile-name');
const profileOccupationPopupElement = profilePopupElement.querySelector('.popup__field_profile-occupation');
const newPlacePopupElement = document.querySelector('#newplace-popup');
const newPlaceCloseButtonPopupElement = newPlacePopupElement.querySelector('.popup__close-button');
const newPlacePopupFormElement = newPlacePopupElement.querySelector('.popup__form')
const newPlaceNamePopupElement = newPlacePopupElement.querySelector('.popup__field_newplace-name');
const newPlaceLinkPopupElement = newPlacePopupElement.querySelector('.popup__field_newplace-link');
const picturePopupElement = document.querySelector('#picture-popup');
const picturePopupCloseButton = picturePopupElement.querySelector('.popup__close-button');
//определяем функцию для автозаполенения карточек мест
function createCard (item) {
  const newCardElement = cardElement.cloneNode(true);
  newCardElement.querySelector('.element__title').textContent = item.name;
  newCardElement.querySelector('.element__image').src = item.link;
  newCardElement.querySelector('.element__image').alt = item.alt;
  addNewPlaceEventListeners(newCardElement);
  return newCardElement;
}
// определяем функцию для публикации карточек мест
function addCard (item) {
  cardSectionElement.append(createCard(item));
}
// выполняем автозаполнение первых шести карточек мест
initialCards.forEach(addCard);
//функции открытия и закрытия попапа
const popupOpen = function openPopup (popup) {
  popup.classList.add('popup_opened');
}
const popupClose = function openClose (popup) {
  popup.classList.remove('popup_opened');
}
function closeEditProfilePopupByClickOnOverlay (event) {
  if (event.target === event.currentTarget) {
    profilePopupElement.classList.remove('popup_opened');
  }
}
function closePicturePopupByClickOnOverlay (event) {
  if (event.target === event.currentTarget) {
    picturePopupElement.classList.remove('popup_opened');
  }
}
function closeNewPlacePopupByClickOnOverlay (event) {
  if (event.target === event.currentTarget) {
    newPlacePopupElement.classList.remove('popup_opened');
  }
}
// функция создания новой карточки места
function submitNewPlaceForm(item) {
  item.preventDefault();
  item.name = newPlaceNamePopupElement.value
  item.link = newPlaceLinkPopupElement.value
  item.alt = 'пользовательское изображение';
  cardSectionElement.prepend(createCard(item));
  newPlacePopupFormElement.reset();
  newPlacePopupElement.classList.remove('popup_opened');
}
//функция удаления карточки места
function deleteNewPlaceForm (event) {
  const newPlace = event.target.closest('.element');
  newPlace.remove();
}
//функция like карточки места
function addRemoveNewPlaceLike (event) {
  const newPlaceHeart = event.target.closest('.element__heart-button');
  newPlaceHeart.classList.toggle('element__heart-button_active');
}
//функция отправки данных из полей редактирования всплывающего окна в профиль
function submitProfileForm(event) {
  event.preventDefault();
  profileNameElement.textContent = profileNamePopupElement.value;
  profileOccupationElement.textContent = profileOccupationPopupElement.value;
  profilePopupElement.classList.remove('popup_opened');
}
// назначаем обработчики событий
profileEditButtonElement.addEventListener('click', function () {
  popupOpen(profilePopupElement);
  profileNamePopupElement.value = profileNameElement.textContent;
  profileOccupationPopupElement.value = profileOccupationElement.textContent;
});
profileCloseButtonPopupElement.addEventListener('click', function () {popupClose(profilePopupElement)});
profilePopupElement.addEventListener('click', closeEditProfilePopupByClickOnOverlay);
profilePopupFormElement.addEventListener('submit', submitProfileForm);
profileAddButtonElement.addEventListener('click', function () {
  popupOpen(newPlacePopupElement);
});
newPlaceCloseButtonPopupElement.addEventListener('click', function () {popupClose(newPlacePopupElement)});
newPlacePopupElement.addEventListener('click', closeNewPlacePopupByClickOnOverlay);
newPlacePopupFormElement.addEventListener('submit', submitNewPlaceForm);
function addNewPlaceEventListeners (newCardElement) {
newCardElement.querySelector('.element__delete-button').addEventListener('click', deleteNewPlaceForm)
newCardElement.querySelector('.element__heart-button').addEventListener('click', addRemoveNewPlaceLike)
newCardElement.querySelector('.element__image').addEventListener('click', function (event) {
  popupOpen(picturePopupElement);
  const cardElement = event.target.closest('.element');
  picturePopupElement.querySelector('.popup__image').src = cardElement.querySelector('.element__image').src;
  picturePopupElement.querySelector('.popup__image').alt = cardElement.querySelector('.element__image').alt;
  picturePopupElement.querySelector('.popup__image-caption').textContent = cardElement.querySelector('.element__title').textContent;
});
}
picturePopupCloseButton.addEventListener('click', function () {popupClose(picturePopupElement)});
picturePopupElement.addEventListener('click', closePicturePopupByClickOnOverlay);