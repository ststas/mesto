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
const profileNamePopupElement = profilePopupElement.querySelector('.popup__field_profile_name');
const profileOccupationPopupElement = profilePopupElement.querySelector('.popup__field_profile_occupation');
const newPlacePopupElement = document.querySelector('#newplace-popup');
const newPlaceCloseButtonPopupElement = newPlacePopupElement.querySelector('.popup__close-button');
const newPlacePopupFormElement = newPlacePopupElement.querySelector('.popup__form')
const newPlaceNamePopupElement = newPlacePopupElement.querySelector('.popup__field_newplace_name');
const newPlaceLinkPopupElement = newPlacePopupElement.querySelector('.popup__field_newplace_link');
const picturePopupElement = document.querySelector('#picture-popup');
const picturePopupCloseButton = picturePopupElement.querySelector('.popup__close-button');
const picturePopupImageElement = picturePopupElement.querySelector('.popup__image');
const picturePopupImageCaptionElement = picturePopupElement.querySelector('.popup__image-caption');
//определяем функцию для автозаполенения карточек мест
function createCard (item) {
  const newCardElement = cardElement.cloneNode(true);
  const newCardNameElement = newCardElement.querySelector('.element__title');
  const newCardImageElement = newCardElement.querySelector('.element__image');
  newCardNameElement.textContent = item.name;
  newCardImageElement.src = item.link;
  newCardImageElement.alt = item.name;
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
const openPopup = function openPopup (popup) {
  popup.classList.add('popup_opened');
}
const closePopup = function openClose (popup) {
  popup.classList.remove('popup_opened');
}
function closeEditProfilePopupByClickOnOverlay (event) {
  if (event.target === event.currentTarget) {
    closePopup(profilePopupElement);
  }
}
function closeNewPlacePopupByClickOnOverlay (event) {
  if (event.target === event.currentTarget) {
    closePopup(newPlacePopupElement);
  }
}
function closePicturePopupByClickOnOverlay (event) {
  if (event.target === event.currentTarget) {
    closePopup(picturePopupElement)
  }
}
function submitNewPlaceForm(event) {
  event.preventDefault();
  const newCard = {
  name: newPlaceNamePopupElement.value,
  link: newPlaceLinkPopupElement.value,
  };
  cardSectionElement.prepend(createCard(newCard));
  newPlacePopupFormElement.reset();
  closePopup(newPlacePopupElement);
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
  closePopup(profilePopupElement);
}
// назначаем обработчики событий
profileEditButtonElement.addEventListener('click', function () {
  openPopup(profilePopupElement);
  profileNamePopupElement.value = profileNameElement.textContent;
  profileOccupationPopupElement.value = profileOccupationElement.textContent;
});
profileCloseButtonPopupElement.addEventListener('click', function () {closePopup(profilePopupElement)});
profilePopupElement.addEventListener('click', closeEditProfilePopupByClickOnOverlay);
profilePopupFormElement.addEventListener('submit', submitProfileForm);
profileAddButtonElement.addEventListener('click', function () {
  openPopup(newPlacePopupElement);
});
newPlaceCloseButtonPopupElement.addEventListener('click', function () {closePopup(newPlacePopupElement)});
newPlacePopupElement.addEventListener('click', closeNewPlacePopupByClickOnOverlay);
newPlacePopupFormElement.addEventListener('submit', submitNewPlaceForm);
function addNewPlaceEventListeners (newCardElement) {
newCardElement.querySelector('.element__delete-button').addEventListener('click', deleteNewPlaceForm)
newCardElement.querySelector('.element__heart-button').addEventListener('click', addRemoveNewPlaceLike)
newCardElement.querySelector('.element__image').addEventListener('click', function (event) {
  openPopup(picturePopupElement);
  const cardElement = event.target.closest('.element');
  const cardElementImage = cardElement.querySelector('.element__image');
  const cardElementTitle = cardElement.querySelector('.element__title');
  picturePopupImageElement.src = cardElementImage.src;
  picturePopupImageElement.alt = cardElementImage.alt;
  picturePopupImageCaptionElement.textContent = cardElementTitle.textContent;
});
}
picturePopupCloseButton.addEventListener('click', function () {closePopup(picturePopupElement)});
picturePopupElement.addEventListener('click', closePicturePopupByClickOnOverlay);