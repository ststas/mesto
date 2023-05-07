export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');
  }
  // функция открытия попапа
  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  // функция закрытия попапа
  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  // функция закрытия попапа по esc
  _handleEscClose = (event) => {
    if(event.key === 'Escape') {
      this.closePopup();
    }
  }
  // функция закрытия попапа по кнопке закрыть
  _handleCloseButton = () => {
    this.closePopup();
  }
  // функция закрытия попапа по оверлею
  _handleClickOnOverlay = (event) => {
    if (event.target === event.currentTarget) {
      this.closePopup();
    }
  }
  // устанавливаем обработчки событий
  setEventListeners() {
    this._closeButton.addEventListener('click', this._handleCloseButton);
    this._popup.addEventListener('click', this._handleClickOnOverlay);
  }
}