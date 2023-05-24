//ИМПОРТ
// ипортируем данные и константы
import {
  initialCards, 
  validationConfig,
  cardsSectionSelector,
  cardTemplateElement,
  newPlacePopupSelector,
  newPlaceRemovalPopupSelector,
  profilePopupSelector,
  picturePopupSelector,
  profileNameSelector,
  profileOccupationSelector,
  profileAvatarSelector,
  profileEditButtonElement,
  profileAddButtonElement,
  profilePopupFormElement,
  newPlacePopupFormElement
} from "../scripts/utils/constants.js"
// импортируем классы
import "../pages/index.css"
import Card from "../scripts/components/Card.js"
import FormValidator from "../scripts/components/FormValidator.js"
import PopupWithForm from "../scripts/components/PopupWithForm.js"
import PopupWithImage from "../scripts/components/PopupWithImage.js"
import PopupImageRemoval from "../scripts/components/PopupImageRemoval.js"
import Section from "../scripts/components/Section.js"
import UserInfo from "../scripts/components/UserInfo.js"
import Api from "../scripts/components/Api.js"


//создаем класс API
const api = new Api ({
  apiUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'd3bd8302-6195-44c4-a6d5-883de21448b7',
    'Content-Type': 'application/json'
  }
})

function addCardLike (idCard) {
  return api.addLike(idCard)
  .then(res => {
    const likesArray = res.likes
    const likesCounter = likesArray.length
  })
  .catch(err => console.log(err))

}

function removeCardLike (idCard) {
  return api.removeLike(idCard).then(res => console.log(res)).catch(err => console.log(err))
}

// КАРТОЧКИ
// создаем класс для попапа с картинкой и устанавливаем слушатели
const picturePopup = new PopupWithImage (picturePopupSelector)
picturePopup.setEventListeners();
//const 


// создаем функцию удаления карточки нового места
function removeCard (idCard) { 
const imageRemovalPopup = new PopupImageRemoval({
  popupSelector: newPlaceRemovalPopupSelector, 
  handlePopupFormSubmit: (event) => {
    event.preventDefault();
    api.removeCard(idCard).then()

    imageRemovalPopup.closePopup()
  }
})
imageRemovalPopup.setEventListeners()
imageRemovalPopup.openPopup()
}

// // создаем функцию рендера и добавления карточки нового места
function createNewCard (cardsData, userDataId, method) {
  const section = new Section ({
  items: cardsData,
  renderer: (cardData) => {
    const newCard = new Card (
      cardData,
      userDataId,
      cardTemplateElement,
      picturePopup.openPicturePopup,
      addCardLike,
      removeCardLike,
      removeCard
      )
      return newCard.createCard();
    }},
  cardsSectionSelector,
  method
)
section.renderItem()
}

// создаем класс попапа для добавления карточки нового места
const newPlacePopup = new PopupWithForm({
  popupSelector: newPlacePopupSelector, 
  handlePopupFormSubmit: (event) => {
    event.preventDefault();
    const cardData = newPlacePopup.getInputValues();
    api.getUserInfo()
    .then((userData) => {
      console.log(userData)
      cardData.owner = {}
      cardData.likes = []
      cardData.owner._id = userData._id
      api.addNewCard(cardData)
      createNewCard([cardData], userData._id, 'prepend')
    })
    .catch(err => console.log("Error:", err));
    newPlacePopup.closePopup();
  }
})

newPlacePopup.setEventListeners()

// ПРОФИЛЬ
// создаем класс для профиля пользователя.
const profileInfo = new UserInfo({profileNameSelector, profileOccupationSelector,profileAvatarSelector})

// создаем класс для попапа профайла
const profilePopup = new PopupWithForm({
  popupSelector: profilePopupSelector, 
  handlePopupFormSubmit: (event) => {
    event.preventDefault();
    api.setUserInfo(profilePopup.getInputValues())
    profileInfo.setUserInfo(profilePopup.getInputValues())
    profilePopup.closePopup()
  }
})
profilePopup.setEventListeners() 

// ВАЛИДАЦИЯ
// создаем класс для валидации формы профиля
const profilePopupFormValidator = new FormValidator(validationConfig, profilePopupFormElement);
profilePopupFormValidator.enableValidation();
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
// кнопка добавления карточки нового места
profileAddButtonElement.addEventListener('click', function () {
  newPlacePopupFormValidator.resetErrorsOnInputFields();
  newPlacePopup.openPopup();
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userData, cardsData]) => {
  profileInfo.setUserInfo(userData);
  createNewCard(cardsData, userData._id, 'append');
})
.catch(err => console.log('Error', err))