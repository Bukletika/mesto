import Popup from './Popup.js'

class PopupWithImage extends Popup {
  constructor(selectPopup) {
    super(selectPopup);
    this._innerPopupImage = document.querySelector('.popup__image');
    this._popupFigcaption = this._selectPopup.querySelector('.popup__figcaption');
  }

  open(item){
    this._innerPopupImage.src = item.link;
    this._innerPopupImage.alt = item.name;
    this._popupFigcaption.textContent = item.name;
    super.open();
  }

}

export default PopupWithImage;
