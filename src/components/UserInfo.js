import { nameInput, jobInput } from '../utils/constants.js'

class UserInfo {
  constructor({profileTitle,profileSubtitle}) {
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

  setUserInfo() {
    this._profileTitle.textContent = nameInput.value;
    this._profileSubtitle.textContent = jobInput.value;
  }
}

export default UserInfo;
