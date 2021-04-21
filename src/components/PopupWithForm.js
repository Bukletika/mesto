import Popup from './Popup.js'
import {formCardValidator} from '../pages/index.js'

class PopupWithForm extends Popup {
  constructor(selectPopup, handleAddFormSubmit) {
    super(selectPopup);
    this._handleAddFormSubmit = handleAddFormSubmit;
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

  get getInputValues() {
    return this._getInputValues
  }

  open() {
    super.open();
    this._selectForm.reset();
    this.setEventListeners();
    formCardValidator.clearFormInputs();
  }

  setEventListeners(){
    super.setEventListeners();
    this._selectForm.addEventListener('submit', this._handleAddFormSubmit);
  }
}

export default PopupWithForm;