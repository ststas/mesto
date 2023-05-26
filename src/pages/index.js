//ИМПОРТ
// ипортируем данные и константы
import {
  validationConfig,
  cardsSectionSelector,
  cardTemplateElement,
  newPlacePopupSelector,
  newPlaceDeletePopupSelector,
  profilePopupSelector,
  profileAvatarPopupSelector,
  profileNameSelector,
  profileAvatarSelector,
  picturePopupSelector,
  profileOccupationSelector,
  profileEditButtonElement,
  profileAddButtonElement,
  profileAvatarEditButtonElement,
  profilePopupFormElement,
  profileAvatarFormElement,
  newPlacePopupFormElement
} from "../scripts/utils/constants.js"
// импортируем классы
import "../pages/index.css"
import Card from "../scripts/components/Card.js"
import FormValidator from "../scripts/components/FormValidator.js"
import PopupWithForm from "../scripts/components/PopupWithForm.js"
import PopupWithImage from "../scripts/components/PopupWithImage.js"
import PopupCardDelete from "../scripts/components/PopupCardDelete.js"
import Section from "../scripts/components/Section.js"
import UserInfo from "../scripts/components/UserInfo.js"
import Api from "../scripts/components/Api.js"

// создаем класс API
const api = new Api ({
  apiUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'd3bd8302-6195-44c4-a6d5-883de21448b7',
    'Content-Type': 'application/json'
  }
})

// КАРТОЧКИ
// создаем класс для попапа с картинкой и устанавливаем слушатели
const picturePopup = new PopupWithImage (picturePopupSelector)
picturePopup.setEventListeners();

// создаем функцию создания новой карточки
const createNewCard = (item, userId) => {
  const newCard = new Card ( item, userId, cardTemplateElement, picturePopup.openPicturePopup, handleCardDeleteClick)
  return newCard.createCard();
}
// создаем функции для рендера и добавления карточек
// cardRenderer используется для отрисовки карточек с сервера
const cardRenderer = (data, userId) =>  {
  const section = new Section ( {items: data, renderer: createNewCard}, userId, cardsSectionSelector )
  section.renderItems()
}
// handleCardRenderer используется для отрисовки карточки при ее добавлении через попап
const handleCardRenderer = (data, userId) =>  {
  const section = new Section ( {items: [data], renderer: createNewCard}, userId, cardsSectionSelector )
  section.addItemPrepend(data, userId)
  }
// создаем попап для создания и добавления карточки
const newPlacePopup = new PopupWithForm({
  popupSelector: newPlacePopupSelector, 
  handlePopupFormSubmit: (data) => {
    Promise.all([api.getUserInfo(), api.addCard(data)])
      .then(([userData, cardData]) => {
        handleCardRenderer(cardData, userData._id)
      })
      .catch(err => console.error(`Ошибка добавления карточки: ${err}`))
      .finally() 
      newPlacePopup.closePopup()
  }
})
newPlacePopup.setEventListeners()
// создаем попап для удаления карточки и устанавливаем слушатели
const cardDeletePopup = new PopupCardDelete ({
  popupSelector: newPlaceDeletePopupSelector, 
  handlePopupFormSubmit: (cardToDelete, cardId) => {
    api.removeCard(cardId)
      .then(()=> {
        cardToDelete.remove()
        cardToDelete = null;
        cardDeletePopup.closePopup()
      })
      .catch(err => console.error(`Ошибка удаления карточки: ${err}`))
      .finally()
  }
})
cardDeletePopup.setEventListeners()
// создаем функцию для удаления карточки
function handleCardDeleteClick (event, cardId) {
  cardDeletePopup.openCardDeletePopup(event.target.closest('.element'), cardId)
}

// ПРОФИЛЬ
// создаем класс профиля пользователя.
const profileInfo = new UserInfo({profileNameSelector, profileOccupationSelector, profileAvatarSelector })
// создаем класс попапа редактирования профайла
const profilePopup = new PopupWithForm({
  popupSelector: profilePopupSelector,
  handlePopupFormSubmit: (data) => {
    api.setUserInfo(data)
      .then(data => profileInfo.setUserInfo(data))
      .catch(err => console.error(`Ошибка редактирования профиля: ${err}`))
      .finally()
    profilePopup.closePopup()
  }
})
profilePopup.setEventListeners()
// создаем класс попапа редактирования аватара профайла
const profileAvatarPopup = new PopupWithForm({
  popupSelector: profileAvatarPopupSelector,
  handlePopupFormSubmit: (data) => {
    api.setUserAvatar(data)
      .then(data => profileInfo.setUserInfo(data))
      .catch(err => console.error(`Ошибка редактирования профиля: ${err}`))
      .finally()
      profileAvatarPopup.closePopup()
  }
})
profileAvatarPopup.setEventListeners()

// ВАЛИДАЦИЯ
// создаем класс для валидации формы профиля
const profilePopupFormValidator = new FormValidator(validationConfig, profilePopupFormElement);
profilePopupFormValidator.enableValidation();

// создаем класс для валидации формы аватара профиля 
const profileAvatarPopupFormValidator = new FormValidator(validationConfig, profileAvatarFormElement);
profileAvatarPopupFormValidator.enableValidation();

// создаем класс для валидации формы добавления новой карточки места
const newPlacePopupFormValidator = new FormValidator(validationConfig, newPlacePopupFormElement);
newPlacePopupFormValidator.enableValidation();

// ОБРАБОТЧИКИ СОБЫТИЙ ДЛЯ КНОПОК ПРОФИЛЯ
// кнопка редактирования профиля
profileEditButtonElement.addEventListener('click', function () {
  profilePopupFormValidator.resetErrorsOnInputFields();
  profilePopup.setInputValues(profileInfo.getUserInfo())
  profilePopup.openPopup();
})
//кнопка редактирования аватара
profileAvatarEditButtonElement.addEventListener('click', function () {
  profileAvatarPopupFormValidator.resetErrorsOnInputFields();
  profileAvatarPopup.openPopup();

})
// кнопка добавления карточки нового места
profileAddButtonElement.addEventListener('click', function () {
  newPlacePopupFormValidator.resetErrorsOnInputFields();
  newPlacePopup.openPopup();
});

// ПОЛУЧЕНИЕ ДАННЫХ
// загрузка карточек и профиля с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    profileInfo.setUserInfo(userData);
    cardRenderer(cardsData, userData._id);
  })
  .catch(err => console.error(`Ошибка загрузки данных с сервера: ${err}`))