import { nameInput, jobInput } from '../utils/constants.js'

class UserInfo {
  constructor({profileTitle,profileSubtitle}) {
    this._profileTitle = profileTitle;
    this._profileSubtitle = profileSubtitle;
  }

  getUserInfo() {
    nameInput.value = this._profileTitle.textContent;
    jobInput.value = this._profileSubtitle.textContent;
  }

  setUserInfo() {
    this._profileTitle.textContent = nameInput.value;
    this._profileSubtitle.textContent = jobInput.value;
  }
}

export default UserInfo;
