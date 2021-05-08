import Popup from './Popup.js'

class PopupWithSubmit extends Popup {
  constructor(selectPopup) {
    super(selectPopup);
    this._submitButton = selectPopup.querySelector('.popup__button');
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

  loadData(buttonText = 'Удаление...') {
    this._submitButton.textContent = buttonText;
  }

  endLoadData(buttonText = 'Да') {
    this._submitButton.textContent = buttonText;
  }

}


export default PopupWithSubmit;
