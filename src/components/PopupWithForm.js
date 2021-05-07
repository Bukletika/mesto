import Popup from './Popup.js'

class PopupWithForm extends Popup {
  constructor(selectPopup, handleAddFormSubmit) {
    super(selectPopup);
    this._handleAddFormSubmit = handleAddFormSubmit;
    this._submitButton = selectPopup.querySelector('.popup__button');
    this._selectForm = selectPopup.querySelector('.popup__form');
    this._allInputFields = this._selectForm.querySelectorAll('.popup__input');
  }

  _getInputValues = () => {
    const inputData = {}
    const inputValue = this._allInputFields.forEach((input) => {
      inputData[input.name] = input.value
    })
    return inputData;
  }

  loadData(buttonText = 'Сохранение...') {
    this._submitButton.textContent = buttonText;
  }

  endLoadData(buttonText = 'Сохранить') {
    this._submitButton.textContent = buttonText;
  }

  get getInputValues() {
    return this._getInputValues
  }

  open() {
    super.open();
    this._selectForm.reset();
  }

  setEventListeners(){
    super.setEventListeners();
    this._selectForm.addEventListener('submit', this._handleAddFormSubmit);
  }
}

export default PopupWithForm;
