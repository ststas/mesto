//определяем массив для автозаполенения карточек мест
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
//определяем переменные для заполенения карточек мест
const cardSectionElement = document.querySelector('.elements');
const cardElement = document.querySelector('#card-template').content;
// определяем переменные для открытия/закрытия/редактирования всплывающих окон профиля, нового места
// и просмотра картинки
const profileElement = document.querySelector('.profile');
const profileEditButtonElement = profileElement.querySelector('.profile__edit-button');
const profileAddButtonElement = profileElement.querySelector('.profile__add-button');
const profilePopupElement = document.querySelector('#profile-popup');
const profileCloseButtonPopupElement = profilePopupElement.querySelector('.popup__close-button');
let profileNameElement = profileElement.querySelector('.profile__name');
let profileOccupationElement = profileElement.querySelector('.profile__occupation');
const profilePopupFormElement = profilePopupElement.querySelector('.popup__form')
let profileNamePopupElement = profilePopupElement.querySelectorAll('.popup__field')[0];
let profileOccupationPopupElement = profilePopupElement.querySelectorAll('.popup__field')[1];
const newPlacePopupElement = document.querySelector('#newplace-popup');
const newPlaceCloseButtonPopupElement = newPlacePopupElement.querySelector('.popup__close-button');
const newPlacePopupFormElement = newPlacePopupElement.querySelector('.popup__form')
let newPlaceNamePopupElement = newPlacePopupElement.querySelectorAll('.popup__field')[0];
let newPlaceLinkPopupElement = newPlacePopupElement.querySelectorAll('.popup__field')[1];
const picturePopupElement = document.querySelector('#picture-popup');
const picturePopupCloseButton = picturePopupElement.querySelector('.popup__close-button');
//определяем функцию для автозаполенения карточек мест
function addCard (item) {
  const newCardElement = cardElement.cloneNode(true);
  newCardElement.querySelector('.element__title').textContent = item.name;
  newCardElement.querySelector('.element__image').src = item.link;
  addNewPlaceEventListeners(newCardElement);
  cardSectionElement.append(newCardElement);
}
//выполняем автозаполненение карточек места
initialCards.forEach(addCard);
//функции открытия и закрытия всплывающего окна отправки новой карточки места
function openNewPlacePopup () {
  newPlacePopupElement.classList.add('popup_opened');
  newPlaceNamePopupElement.value = '';
  newPlaceLinkPopupElement.value = '';  
}
function closeNewPlacePopup () {
  newPlacePopupElement.classList.remove('popup_opened');
}
function closeNewPlacePopupByClickOnOverlay (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closeNewPlacePopup();
}
// функция создания новой карточки места
function submitNewPlaceForm(event) {
  event.preventDefault();
  function addNewPlace () {
    const newCardElement = cardElement.cloneNode(true);
    newCardElement.querySelector('.element__image').src = newPlaceLinkPopupElement.value;
    newCardElement.querySelector('.element__title').textContent = newPlaceNamePopupElement.value;
    addNewPlaceEventListeners(newCardElement);
    cardSectionElement.prepend(newCardElement);
    }   
  addNewPlace();
  closeNewPlacePopup();
}
//функция удаления карточки места
function deleteNewPlaceForm (event) {
  const newPlace = event.target.closest('.element');
  newPlace.remove();
}
//функция like карточки места
function newPlaceLike (event) {
  const newPlaceHeart = event.target.closest('.element__heart-button');
  newPlaceHeart.classList.toggle('element__heart-button_active');
}
//функции открытия и закрытия всплывающего окна редактирования профиля
function openEditProfilePopup () {
  profilePopupElement.classList.add('popup_opened');
  profileNamePopupElement.value = profileNameElement.textContent;
  profileOccupationPopupElement.value = profileOccupationElement.textContent;
}
function closeEditProfilePopup () {
  profilePopupElement.classList.remove('popup_opened');
}
function closeEditProfilePopupByClickOnOverlay(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closeEditProfilePopup();
}
//функция отправки данных из полей редактирования всплывающего окна в профиль
function submitProfileForm(evt) {
  evt.preventDefault();
  profileNameElement.textContent = profileNamePopupElement.value;
  profileOccupationElement.textContent = profileOccupationPopupElement.value;
  closeEditProfilePopup();
}
//функции открытия и закрытия всплывающего окна с картинкой
function openPicturePopup (event) {
  picturePopupElement.classList.add('popup_opened-picture');
  const cardElement = event.target.closest('.element');
  picturePopupElement.querySelector('.popup__image').src = cardElement.querySelector('.element__image').src;
  picturePopupElement.querySelector('.popup__image-caption').textContent = cardElement.querySelector('.element__title').textContent;
}
function closePicturePopup () {
  picturePopupElement.classList.remove('popup_opened-picture');
}
function closePicturePopupByClickOnOverlay (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePicturePopup();
}
// назначаем обработчики событий
profileEditButtonElement.addEventListener('click', openEditProfilePopup);
profileCloseButtonPopupElement.addEventListener('click', closeEditProfilePopup);
profilePopupElement.addEventListener('click', closeEditProfilePopupByClickOnOverlay);
profilePopupFormElement.addEventListener('submit', submitProfileForm);
profileAddButtonElement.addEventListener('click', openNewPlacePopup);
newPlaceCloseButtonPopupElement.addEventListener('click', closeNewPlacePopup);
newPlacePopupElement.addEventListener('click', closeNewPlacePopupByClickOnOverlay);
newPlacePopupFormElement.addEventListener('submit', submitNewPlaceForm);
function addNewPlaceEventListeners (newCardElement) {
newCardElement.querySelector('.element__delete-button').addEventListener('click', deleteNewPlaceForm)
newCardElement.querySelector('.element__heart-button').addEventListener('click', newPlaceLike)
newCardElement.querySelector('.element__image').addEventListener('click', openPicturePopup);
}
picturePopupCloseButton.addEventListener('click', closePicturePopup);
picturePopupElement.addEventListener('click', closePicturePopupByClickOnOverlay);