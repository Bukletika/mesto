import {openPopup, innerPopupImage, imagePopup} from './index.js'

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

  _setLike = (evt) => {
    evt.target.classList.toggle('element__like_active');
  }

  _setTrash = (evt) => {
    evt.target.closest('.elements__item').remove();
  }
  _setPopupImage = () => {
    innerPopupImage.src = this.link;
    innerPopupImage.alt = this.name;
    imagePopup.querySelector('.popup__figcaption').textContent = this.name;
    openPopup(imagePopup);
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', this._setLike);
    this._element.querySelector('.element__trash').addEventListener('click', this._setTrash);
    this._element.querySelector('.element__image').addEventListener('click', this._setPopupImage);
  }

}

export default Card;

