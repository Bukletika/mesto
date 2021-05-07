import Popup from './Popup.js'

class PopupWithSubmit extends Popup {
  constructor(selectPopup) {
    super(selectPopup);
  }

  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }

  setEventListeners() {
    this._selectPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });
    super.setEventListeners();
  }


}


export default PopupWithSubmit;
