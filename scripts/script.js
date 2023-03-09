// определяем переменные для открытия/закрытия всплывающего окна и отправки формы
const popupElement = document.querySelector('.popup');
const profileElement = document.querySelector('.profile');
const profileEditButtonElement = profileElement.querySelector('.profile__edit-button');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
// const popupSubmitButtonElement = popupElement.querySelector('.popup__submit-button');

// определяем перемененные для имени и профессии в профиле
let profileNameElement = profileElement.querySelector('.profile__name');
let profileOccupationElement = profileElement.querySelector('.profile__occupation');
// определяем перемененные для имени и профессии в полях редактирования всплывающего окна
const popupFormElement = popupElement.querySelector('.popup__form')
let popupNameElement = popupElement.querySelectorAll('.popup__field')[0];
let popupOccupationElement = popupElement.querySelectorAll('.popup__field')[1];

//функции открытия и закрытия всплывающего окна 
function openPopup () {
  popupElement.classList.add('popup_opened');
  popupNameElement.value = profileNameElement.textContent;
  popupOccupationElement.value = profileOccupationElement.textContent;
}
function closePopup() {
  popupElement.classList.remove('popup_opened');
}
function closePopupByClickOnOverlay(event) {
  console.log(event.target, event.currentTarget);
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup();
}

//функция отправки данных из полей редактирования всплывающего окна в профиль
function submitForm(evt) {
  evt.preventDefault();
  profileNameElement.textContent = popupNameElement.value;
  profileOccupationElement.textContent = popupOccupationElement.value;
  closePopup();
}

// назначаем обработчики событий
profileEditButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupFormElement.addEventListener('submit', submitForm);
popupElement.addEventListener('click', closePopupByClickOnOverlay);