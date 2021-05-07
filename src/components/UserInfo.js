class UserInfo {
  constructor({profileTitle, profileSubtitle, profileAvatar}) {
    this._profileTitle = profileTitle;
    this._profileSubtitle = profileSubtitle;
    this._profileAvatar = profileAvatar;
  }

  getUserInfo() {
    const userData = {
      name: this._profileTitle.textContent,
      about: this._profileSubtitle.textContent,
    }
    return userData;
  }

  setUserInfo(userData) {
    this._profileTitle.textContent = userData.name;
    this._profileSubtitle.textContent = userData.about;
  }

  setUserAvatar(userAvatar) {
    this._profileAvatar.src = userAvatar.avatar;
  }

}

export default UserInfo;
