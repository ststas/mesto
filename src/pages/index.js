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
import PopupCardDelete from "../scripts/components/PopupWithConfirmation.js"
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
// универсальная функция-обработчик для попапов
function handleSubmit(request, popupInstance, loadingText) {
  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {popupInstance.closePopup()})
    .catch((err) => {console.error(`Ошибка: ${err}`)})
    .finally(() => {popupInstance.renderLoading(false)});
}

// ПРОФИЛЬ
// класс профиля пользователя.
const profileInfo = new UserInfo({profileNameSelector, profileOccupationSelector, profileAvatarSelector })

// класс попапа редактирования профайла
const profilePopup = new PopupWithForm({
  popupSelector: profilePopupSelector,
  handlePopupFormSubmit: (inputValues) => {
    function makeRequest() {
      return api.setUserInfo(inputValues)
        .then((userData) => {profileInfo.setUserInfo(userData)});
    }
    handleSubmit(makeRequest, profilePopup, "Сохранение...");
  }
})
profilePopup.setEventListeners()
// класс попапа редактирования аватара профайла
const profileAvatarPopup = new PopupWithForm({
  popupSelector: profileAvatarPopupSelector,
  handlePopupFormSubmit: (inputValues) => {
    function makeRequest() {
      return api.setUserAvatar(inputValues)
        .then((userData) => {profileInfo.setUserInfo(userData)});
    }
    handleSubmit(makeRequest, profileAvatarPopup, "Сохранение...");
  }
})
profileAvatarPopup.setEventListeners()

// КАРТОЧКИ
// попап с картинкой и устанавка слушателей
const picturePopup = new PopupWithImage (picturePopupSelector)
picturePopup.setEventListeners();
// функции добавления лайка карточки
function addCardLike (card) {
  return api.addLike(card._cardId)
  .then(res => {
    card._likeButton.classList.toggle('element__heart-button_active')
    card._likes = res.likes
    card._likesCounter.textContent = card._likes.length
  })
  .catch(err => console.error(`Ошибка добавления лайка карточки: ${err}`))
}
// функции удаления лайка карточки
function removeCardLike (card) {
  return api.removeLike(card._cardId)
  .then(res => {
    card._likeButton.classList.toggle('element__heart-button_active')
    card._likes = res.likes
    card._likesCounter.textContent = card._likes.length
  })
  .catch(err => console.error(`Ошибка снятия лайка карточки: ${err}`))
}
// функция создания новой карточки
function createNewCard (item, userId) {
  const newCard = new Card (
    item,
    userId,
    cardTemplateElement,
    picturePopup.openPicturePopup,
    handleCardDeleteClick,
    addCardLike,
    removeCardLike
    )
  return newCard.createCard();
}
// функция рендера и добавления карточек
function cardRenderer (data, userId, method) {
  const section = new Section ( {items: data, renderer: createNewCard}, userId, cardsSectionSelector )
  section.renderItems(data, userId, method)
}
// попап рендера и добавления карточки и установка слушателей
const newPlacePopup = new PopupWithForm({
  popupSelector: newPlacePopupSelector, 
  handlePopupFormSubmit: (inputValues) => {
    function makeRequest() {
      return api.addCard(inputValues)
        .then((cardDataRes) => {cardRenderer(cardDataRes, profileInfo.getUserId(), 'prepend' )});
    }
    handleSubmit(makeRequest, newPlacePopup, "Создаем...");
  } 
})
newPlacePopup.setEventListeners()
// попап удаления карточки и устанавка слушателей
const cardDeletePopup = new PopupCardDelete ({
  popupSelector: newPlaceDeletePopupSelector, 
  handlePopupFormSubmit: (cardToDelete, cardId) => {
    function makeRequest() {
      return api.removeCard(cardId)
        .then(() => {
          cardToDelete.remove();
          cardToDelete = null
        })
    }
    handleSubmit(makeRequest, cardDeletePopup, "Удаление...");
  }
})
cardDeletePopup.setEventListeners()
// функция удаления карточки
function handleCardDeleteClick (event, cardId) {
  cardDeletePopup.openCardDeletePopup(event.target.closest('.element'), cardId)
}

// ВАЛИДАЦИЯ
// класс валидации формы профиля
const profilePopupFormValidator = new FormValidator(validationConfig, profilePopupFormElement);
profilePopupFormValidator.enableValidation();

// класс валидации формы аватара профиля 
const profileAvatarPopupFormValidator = new FormValidator(validationConfig, profileAvatarFormElement);
profileAvatarPopupFormValidator.enableValidation();

// класс валидации формы добавления новой карточки места
const newPlacePopupFormValidator = new FormValidator(validationConfig, newPlacePopupFormElement);
newPlacePopupFormValidator.enableValidation();

// ОБРАБОТЧИКИ СОБЫТИЙ ДЛЯ КНОПОК ПРОФИЛЯ
// кнопка редактирования профиля
profileEditButtonElement.addEventListener('click', function () {
  profilePopupFormValidator.resetErrorsOnInputFields();
  profilePopup.setInputValues(profileInfo.getUserInfo())
  profilePopup.openPopup();
})
// кнопка редактирования аватара
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
    profileInfo.getUserId()
    cardRenderer(cardsData, userData._id, 'append');
  })
  .catch(err => console.error(`Ошибка загрузки данных с сервера: ${err}`))
  