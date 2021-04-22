import Popup from './Popup.js'
import { innerPopupImage } from '../utils/constants.js'

class PopupWithImage extends Popup {
  constructor(selectPopup, item) {
    super(selectPopup);
    this._link = item.link;
    this._name = item.name;
    this._selectPopup = selectPopup
  }

  open(){
    super.open();
    innerPopupImage.src = this._link;
    innerPopupImage.alt = this._name;
    this._selectPopup.querySelector('.popup__figcaption').textContent = this._name;
  }

}

export default PopupWithImage;
