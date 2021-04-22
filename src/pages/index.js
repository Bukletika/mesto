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
        nameInput,
        jobInput,
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
      popupWithImage.setEventListeners();
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
  const newCard = new Card({ data: inputsData, handleCardClick: () => {
    const popupWithImage = new PopupWithImage(imagePopup, inputsData);
    popupWithImage.setEventListeners();
    popupWithImage.open();
  }} , templateElement).generateCard();
  cardList.addItem(newCard);

  newCardPopup.close();
});

newCardPopup.setEventListeners();

cardAddButton.addEventListener('click', function() {
  newCardPopup.open();
  formCardValidator.clearFormInputs();
});

const newProfilePopup = new PopupWithForm(profilePopup, (evt) => {
  userParams.setUserInfo();
  newProfilePopup.close();
});

newProfilePopup.setEventListeners();

profileEditButton.addEventListener('click', function() {
  formProfile.reset();
  formProfileValidator.clearFormInputs();
  newProfilePopup.open();

  const userData = userParams.getUserInfo();
  nameInput.value = userData.title;
  jobInput.value = userData.subtitle;

});

const formProfileValidator = new FormValidator(validationParams, formProfile);
formProfileValidator.enableValidation();
export const formCardValidator = new FormValidator(validationParams, formCard);
formCardValidator.enableValidation();
