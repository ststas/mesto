//ИМПОРТ
// ипортируем данные и константы
import {
  initialCards, 
  validationConfig,
  cardsSectionSelector,
  cardTemplateElement,
  newPlacePopupSelector,
  profilePopupSelector,
  picturePopupSelector,
  profileNameSelector,
  profileOccupationSelector,
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
import Section from "../scripts/components/Section.js"
import UserInfo from "../scripts/components/UserInfo.js"


// КАРТОЧКИ
// создаем класс для попапа с картинкой и устанавливаем слуша
const picturePopup = new PopupWithImage (picturePopupSelector)
picturePopup.setEventListeners();
// создаем классы для создания и добавления карточки нового места
const section = new Section ({
  items: initialCards,
  renderer: (item) => {
    const newCard = new Card (item, cardTemplateElement, picturePopup.openPicturePopup)
    return newCard.createCard();
    }
  },
  cardsSectionSelector
)
const newPlacePopup = new PopupWithForm({
  popupSelector: newPlacePopupSelector, 
  handlePopupFormSubmit: (event) => {
    event.preventDefault();
    section.addItem(newPlacePopup._getInputValues())
    newPlacePopup.closePopup()
  }
})
newPlacePopup.setEventListeners()
//заполняем 6 карточек из массива
section.renderItemsfromArray();

// ПРОФИЛЬ
// создаем класс для профиля пользователя.
const profileInfo = new UserInfo({profileNameSelector, profileOccupationSelector})
// создаем класс для попапа профайла (пока без возможности редактирования данных профиля пользователя)
const profilePopup = new PopupWithForm({
  popupSelector: profilePopupSelector, 
  handlePopupFormSubmit: (event) => {
    event.preventDefault();
    profileInfo.setUserInfo(profilePopup._getInputValues())
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