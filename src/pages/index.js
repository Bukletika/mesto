import './index.css'
import {validationParams,
        templateElement,
        imagePopup,
        profileEditButton,
        cardAddButton,
        profilePopup,
        profileTitle,
        profileSubtitle,
        profileImageEditButton,
        profileImagePopup,
        cardPopup,
        formCard,
        nameInput,
        jobInput,
        formProfile,
        formProfileImg,
        avatarLink
      } from '../utils/constants.js'

import Api from '../components/Api.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithSubmit from '../components/PopupWithSubmit.js'
import UserInfo from '../components/UserInfo.js'
export const trashSubmit = document.querySelector('.popup__button_type_submit');

const popupDeleteCard = document.querySelector('.popup_type_submit');
const profileAvatar = document.querySelector('.profile__img');

// Создаеть экземпляр функции для получения/отправки параметров пользователя
const userParams = new UserInfo({profileTitle,profileSubtitle});

// Создать экземпляр api
export const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-23",
  headers: { authorization: '528d5e73-a9a5-4772-abda-cd25c7cb79ab', 'Content-Type': 'application/json'},
})

// Получить информацию о пользователе с сервера
const dataProfile = api.getInitialProfile();

// Взять объект с карточками с сервера
const initialCards = api.getInitialCards();

// Создать экземпляр Popup картинки
const popupWithImage = new PopupWithImage(imagePopup);
popupWithImage.setEventListeners();

// Создать экземпляр для Popup удаления карточки
const popupWithSubmit = new PopupWithSubmit(popupDeleteCard);


// После получения ответа о параметрах пользователя от сервера мы можем сгенерировать карточки на странице
dataProfile.then((result) => {

  userParams.setUserInfo({
    title: result.name,
    subtitle: result.about
  });

  profileAvatar.src = result.avatar;


  // Генерация карточек на странице после получения массива карточек с сервера
  initialCards.then(initialCards => {

    const cardList = new Section({
      data: initialCards,
      renderer: (item) => {
        const newElement = new Card({
          handleCardClick: () => { popupWithImage.open(item);},
          setTrash: (evt) => {
            popupWithSubmit.open();
            let trashButton = evt.target;
            popupWithSubmit.setEventListeners(item, trashButton);
          },
          setLike: (evt) => {
            if(evt.target.classList.contains('element__like_active')) {
              api.dislikeCard(item._id);
              evt.target.classList.remove('element__like_active');
              item.likes.length  = item.likes.length  - 1;
              evt.target.nextElementSibling.textContent = item.likes.length;
            }else{
              api.likeCard(item._id);
              evt.target.classList.add('element__like_active');
              item.likes.length  = item.likes.length  + 1;
              evt.target.nextElementSibling.textContent = item.likes.length;
            }
          },
          dataCard: item,
          dataProfile
          },
          templateElement,
          );

        const resultElement = newElement.generateCard();
        cardList.addItem(resultElement);
      }
    }, '.elements__list');
    cardList.renderItems();


    const newCardPopup = new PopupWithForm(cardPopup, (evt) => {
      evt.preventDefault();

      newCardPopup.loadData();

      const inputsData = newCardPopup.getInputValues();

      const sendCard = api.addCard({
        name: inputsData.name,
        link: inputsData.link
      })

     sendCard.then(function(response){

      const newCard = new Card({
        handleCardClick: () => {popupWithImage.open(inputsData);},
        setTrash: (evt) => {
          popupWithSubmit.open();
          let trashButton = evt.target;
          popupWithSubmit.setEventListeners(response, trashButton);
        },
        setLike: (evt) => {
          if(evt.target.classList.contains('element__like_active')) {
            api.dislikeCard(response._id);
            evt.target.classList.remove('element__like_active');
            response.likes.length  = response.likes.length  - 1;
            evt.target.nextElementSibling.textContent = response.likes.length;
          }else{
            api.likeCard(response._id);
            evt.target.classList.add('element__like_active');
            response.likes.length  = response.likes.length  + 1;
            evt.target.nextElementSibling.textContent = response.likes.length;
          }
        },
        dataCard: inputsData
      } , templateElement).generateCard();
      cardList.addItem(newCard);

      }).finally(() => {
        newCardPopup.endLoadData();
        newCardPopup.close();
      })

    });

    newCardPopup.setEventListeners();

    cardAddButton.addEventListener('click', function() {
      newCardPopup.open();
      formCardValidator.clearFormInputs();
    });

  })

})

const newProfilePopup = new PopupWithForm(profilePopup, (evt) => {
  userParams.setUserInfo({
    title: nameInput.value,
    subtitle: jobInput.value
  });

  newProfilePopup.loadData()

  api.editProfile({name: nameInput.value, about: jobInput.value}).finally(() => {
    newProfilePopup.endLoadData();
    newProfilePopup.close();
  })

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

const editProfileImagePopup = new PopupWithForm(profileImagePopup, (evt) => {
  editProfileImagePopup.loadData()

  api.editProfileAvatar({avatar: avatarLink.value}).finally(() => {
    editProfileImagePopup.endLoadData();
    editProfileImagePopup.close();
  })

  profileAvatar.src = avatarLink.value;
});

editProfileImagePopup.setEventListeners();

profileImageEditButton.addEventListener('click', function() {
  formProfileImg.reset();
  formProfileImageValidator.clearFormInputs();
  editProfileImagePopup.open();

  dataProfile.then((result) => {
    avatarLink.value = result.avatar;
  })

});

const formProfileValidator = new FormValidator(validationParams, formProfile);
formProfileValidator.enableValidation();

const formProfileImageValidator = new FormValidator(validationParams, formProfileImg);
formProfileImageValidator.enableValidation();

export const formCardValidator = new FormValidator(validationParams, formCard);
formCardValidator.enableValidation();


