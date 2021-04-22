import Popup from './Popup.js'
import { innerPopupImage } from '../utils/constants.js'

class PopupWithImage extends Popup {
  constructor(selectPopup) {
    super(selectPopup);
    this._selectPopup = selectPopup
  }

  open(item){
    super.open();
    innerPopupImage.src = item.link;
    innerPopupImage.alt = item.name;
    this._selectPopup.querySelector('.popup__figcaption').textContent = item.name;
  }

}

export default PopupWithImage;
