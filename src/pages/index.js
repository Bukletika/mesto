import './index.css'
import {initialCards,
        validationParams,
        templateElement,
        imagePopup,
        profileEditButton,
        cardAddButton,
        profilePopup,
        profileTitle,
        profileSubtitle,
        cardPopup,
        formCard,
        formProfile} from '../utils/constants.js'

import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js';
import Popup from '../components/Popup.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'


const userParams = new UserInfo({profileTitle,profileSubtitle});

const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const newElement = new Card({ data: item, handleCardClick: () => {
      const popupWithImage = new PopupWithImage(imagePopup, item);
      popupWithImage.open();
    }} , templateElement);

    const resultElement = newElement.generateCard();
    cardList.addItem(resultElement);
  }
}, '.elements__list');

cardList.renderItems();

const newCardPopup = new PopupWithForm(cardPopup, (evt) => {
  evt.preventDefault();

  const inputsData = newCardPopup.getInputValues();
  const cardItem = new Section({
    data: [inputsData],
    renderer: (item) => {
      const newElement = new Card({ data: item, handleCardClick: () => {
        const popupWithImage = new PopupWithImage(imagePopup, item);
        popupWithImage.open();
      }} , templateElement);

      const resultElement = newElement.generateCard();
      cardItem.addItem(resultElement);
    }
  }, '.elements__list');

  cardItem.renderItems();

  newCardPopup.close();
});


cardAddButton.addEventListener('click', function() {
  newCardPopup.open();
});

const newProfilePopup = new PopupWithForm(profilePopup, (evt) => {
  userParams.setUserInfo();
  newProfilePopup.close();
});

profileEditButton.addEventListener('click', function() {
  formProfile.reset();
  formProfileValidator.clearFormInputs();
  newProfilePopup.open()
  userParams.getUserInfo();
});

const formProfileValidator = new FormValidator(validationParams, formProfile);
formProfileValidator.enableValidation();
export const formCardValidator = new FormValidator(validationParams, formCard);
formCardValidator.enableValidation();
