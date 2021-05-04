import Popup from './Popup.js'
import { api, trashSubmit } from '../pages/index.js'

class PopupWithSubmit extends Popup {
  constructor(selectPopup) {
    super(selectPopup);
    this._selectPopup = selectPopup
  }

  _deleteCard(item){
    api.deleteCard(item._id);
  }

  setEventListeners(item,trashButton){
    super.setEventListeners();

    trashSubmit.addEventListener('click', () => {
      this._deleteCard(item)
      trashButton.closest('.elements__item').remove()
      this.close()
    }, {once: true})

  }

}


export default PopupWithSubmit;
