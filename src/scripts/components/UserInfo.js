export default class UserInfo {
  constructor ({profileNameSelector, profileOccupationSelector}) {
    this._profileName = document.querySelector(profileNameSelector)
    this._profileOccupation = document.querySelector(profileOccupationSelector)
  }
  // получение данных из профиля
  getUserInfo() {
    return {
      name: this._profileName.textContent, 
      occupation: this._profileOccupation.textContent 
     }
  }
  // установка данных профиля из полей формы попапа профиля
  setUserInfo(formData) {
    this._profileName.textContent = formData.name;
    this._profileOccupation.textContent = formData.occupation;
  }
}