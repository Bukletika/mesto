class Popup {
  constructor(selectPopup) {
    this._selectPopup = selectPopup
    this._popupCloseButton = this._selectPopup.querySelector('.popup__close')
    this._popupContainer = this._selectPopup.querySelector('.popup__container')
    this._closeByEsc = this._handleEscClose.bind(this)
  }

  open(){
    this._selectPopup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close(){
    this._selectPopup.classList.remove('popup_opened');
    document.removeEventListener('keydown',  this._closeByEsc)
  }

  _handleEscClose = (evt) => {
    if(evt.key === 'Escape'){
      this.close()
    }
  }

  setEventListeners(){
    document.addEventListener('keydown',  this._closeByEsc)
    this._popupCloseButton.addEventListener('click', () => { this.close() });
    this._selectPopup.addEventListener('click', this.close.bind(this));
    this._popupContainer.addEventListener('click', function (evt) { evt.stopPropagation() });
  }

}

export default Popup;
