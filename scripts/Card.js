class Card {
  constructor(data, templateElement) {
    this.name = data.name;
    this.link = data.link;
    this._templateElement = templateElement;
  }

  _getTemplate() {
    const newCard = this._templateElement.content.cloneNode(true);

    return newCard;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__title').textContent = this.name;
    const image = this._element.querySelector('.element__image');

    image.src = this.link;
    image.alt = this.name;

    return this._element;
  }

  _setEventListeners() {

    this._element.querySelector('.element__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__like_active');
    });

    this._element.querySelector('.element__trash').addEventListener('click', (evt) => {
      evt.target.closest('.elements__item').remove();
    });

    this._element.querySelector('.element__image').addEventListener('click', (evt) => {
      innerPopupImage.src = image.src;
      innerPopupImage.alt = image.alt;
      imagePopup.querySelector('.popup__figcaption').textContent = image.alt;
      openPopup(imagePopup);
    });

  }



}
