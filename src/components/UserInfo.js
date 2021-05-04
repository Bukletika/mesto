class UserInfo {
  constructor({profileTitle, profileSubtitle}) {
    this._profileTitle = profileTitle;
    this._profileSubtitle = profileSubtitle;
  }

  getUserInfo() {
    const userData = {
      title: this._profileTitle.textContent,
      subtitle: this._profileSubtitle.textContent
    }
    return userData;
  }

  setUserInfo(userData) {
    this._profileTitle.textContent = userData.title;
    this._profileSubtitle.textContent = userData.subtitle;
  }

}

export default UserInfo;
