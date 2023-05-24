export default class UserInfo {
  constructor ({profileNameSelector, profileOccupationSelector, profileAvatarSelector}) {
    this._profileName = document.querySelector(profileNameSelector)
    this._profileOccupation = document.querySelector(profileOccupationSelector)
    this._profileAvatar = document.querySelector(profileAvatarSelector)
  }
  // получение данных из профиля
  getUserInfo() {
    return {
      name: this._profileName.textContent, 
      about: this._profileOccupation.textContent 
     }
  }
  // установка данных профиля из полей формы попапа профиля
  setUserInfo(userData) {
    if(userData.name){this._profileName.textContent = userData.name};
    if(userData.about){this._profileOccupation.textContent = userData.about};
    if(userData.avatar){this._profileAvatar.src = userData.avatar};
  }

}