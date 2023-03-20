//определяем массив для автозаполенения карточек
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
//определяем переменные для заполенения карточек
const cardElements = document.querySelector('.elements');
const cardElement = document.querySelector('#card-template').content;
//определяем функцию для автозаполенения карточек
function addCard (item) {
  const newCardElement = cardElement.cloneNode(true);
  newCardElement.querySelector('.element__image').src = item.link;
  newCardElement.querySelector('.element__title').textContent = item.name;
  cardElements.append(newCardElement);
} 
//выполняем автозаполненение карточек
initialCards.forEach(addCard);

// определяем переменные для открытия/закрытия всплывающих окон редактирования профиля и создания нового места
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

//функции открытия и закрытия всплывающего окна редактирования профиля
function openEditProfilePopup () {
  profilePopupElement.classList.add('popup_opened');
  profileNamePopupElement.value = profileNameElement.textContent;
  profileOccupationPopupElement.value = profileOccupationElement.textContent;
}

function closeEditProfilePopup() {
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

//функции открытия и закрытия всплывающего окна отправки нового места
function openNewPlacePopup () {
  newPlacePopupElement.classList.add('popup_opened');
  newPlaceNamePopupElement.value = '';
  newPlaceLinkPopupElement.value = '';  
}

function closeNewPlacePopup () {
  newPlacePopupElement.classList.remove('popup_opened');  
}

//функция создания новой карточки
function submitNewPlaceForm(evt) {
  evt.preventDefault();
  function addNewPlace () {
    const newCardElement = cardElement.cloneNode(true);
    newCardElement.querySelector('.element__image').src = newPlaceLinkPopupElement.value;
    newCardElement.querySelector('.element__title').textContent = newPlaceNamePopupElement.value;
    cardElements.prepend(newCardElement);
    }   
  addNewPlace();
  closeNewPlacePopup();
}

// назначаем обработчики событий
profileEditButtonElement.addEventListener('click', openEditProfilePopup);
profileAddButtonElement.addEventListener('click', openNewPlacePopup);
profileCloseButtonPopupElement.addEventListener('click', closeEditProfilePopup);
profilePopupElement.addEventListener('click', closeEditProfilePopupByClickOnOverlay);
profilePopupFormElement.addEventListener('submit', submitProfileForm);

newPlaceCloseButtonPopupElement.addEventListener('click', closeNewPlacePopup);
newPlacePopupFormElement.addEventListener('submit', submitNewPlaceForm);