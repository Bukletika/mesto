class Card {
  constructor({handleCardClick, setTrash, setLike, dataCard, dataProfile},
    templateElement){
    this.name = dataCard.name;
    this.link = dataCard.link;
    this.likes = dataCard.likes;
    this.handleCardClick = handleCardClick;
    this._templateElement = templateElement;
    this._id = dataCard._id;
    this._owner = dataCard.owner;
    this._dataProfile = dataProfile;
    this._setTrash = setTrash;
    this._setLike = setLike;
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

    const likes = this._element.querySelector('.element__like-counter');
    const heart = this._element.querySelector('.element__like');
    const elemTrash = this._element.querySelector('.element__trash')

    if(this.likes) {
      likes.textContent = this.likes.length;
    }else{
      likes.textContent = 0;
    }

    if(this._dataProfile) {
      this._dataProfile.then((result) => {

        if (this._owner._id !== result._id) {
          elemTrash.remove();
          elemTrash.classList.add('element__trash_type_disabled');
        }
        const needle = this.likes.some(function(item) {
          return item._id == result._id;
        });
        if(needle) {
          heart.classList.toggle('element__like_active')
        }
      })
    }

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', this._setLike);
    this._element.querySelector('.element__trash').addEventListener('click', this._setTrash);
    this._element.querySelector('.element__image').addEventListener('click', this.handleCardClick);
  }

}

export default Card;

