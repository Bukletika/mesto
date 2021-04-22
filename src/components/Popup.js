class Popup {
  constructor(selectPopup) {
    this._selectPopup = selectPopup
    this._popupCloseButton = this._selectPopup.querySelector('.popup__close')
    this._popupContainer = this._selectPopup.querySelector('.popup__container')
    this._closeByEsc = this._handleEscClose.bind(this)
  }

  open(){
    this._selectPopup.classList.add('popup_opened');
    document.addEventListener('keydown',  this._closeByEsc);
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
    this._popupCloseButton.addEventListener('click', () => { this.close() });
    this._selectPopup.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup_opened')) {
        this.close()
      }
    });
  }

}

export default Popup;
