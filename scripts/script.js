// определяем переменные для открытия/закрытия всплывающего окна и отправки формы
let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let submitButton = document.querySelector('.popup__submit-button');

// определяем перемененные для имени и профессии в профиле
let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');
// определяем перемененные для имени и профессии в полях редактирования всплывающего окна
let formElement = document.querySelector('.popup__form')
let popupName = document.querySelectorAll('.popup__field')[0];
let popupOccupation = document.querySelectorAll('.popup__field')[1];
// передаем значение имени и профессии из профиля в поля редактирования всплывающего окна
popupName.value = profileName.textContent;
popupOccupation.value = profileOccupation.textContent;

//функции открытия и закрытия всплывающего окна 
function popupOpen() {
  popup.classList.add('popup_opened');
}
function popupClose() {
  popup.classList.remove('popup_opened');
}

//функция отправки данных из полей редактирования всплывающего окна в профиль
function submitForm(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileOccupation.textContent = popupOccupation.value;
}

// назначаем обработчики событий
editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', submitForm);
submitButton.addEventListener('click', popupClose);