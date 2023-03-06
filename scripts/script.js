let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

function popupOpen() {
  popup.classList.add('popup_opened');
  console.log('мы открыли popup');
}

function popupClose() {
  popup.classList.remove('popup_opened');
  console.log('мы закрыли popup');
}


editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);