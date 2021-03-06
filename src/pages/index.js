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
        formProfileImg
      } from '../utils/constants.js'

import Api from '../components/Api.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithSubmit from '../components/PopupWithSubmit.js'
import UserInfo from '../components/UserInfo.js'

const popupDeleteCard = document.querySelector('.popup_type_submit');
const profileAvatar = document.querySelector('.profile__img');

// Создать экземпляр класса для получения/отправки параметров пользователя
const userParams = new UserInfo({profileTitle,profileSubtitle, profileAvatar});

// Создать экземпляр api
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-23",
  headers: { authorization: '528d5e73-a9a5-4772-abda-cd25c7cb79ab', 'Content-Type': 'application/json'},
})

// Получить информацию о пользователе с сервера
const dataProfile = api.getInitialProfile();

// Взять объект с карточками с сервера
const initialCards = api.getInitialCards();

// Создать экземпляр Popup окна с картинкой
const popupWithImage = new PopupWithImage(imagePopup);
popupWithImage.setEventListeners();

// Создать экземпляр для Popup удаления карточки
const popupWithSubmit = new PopupWithSubmit(popupDeleteCard);
popupWithSubmit.setEventListeners();

dataProfile.then((result) => {

  userParams.setUserInfo({
    name: result.name,
    about: result.about,
  });

  userParams.setUserAvatar({
    avatar: result.avatar
  })

  // Функция для создания новой карточки
  const createCard = (item) => {
    const newElement = new Card({

      // Открыть попап с картинкой карточки
      handleCardClick: () => { popupWithImage.open(item)},

      // Удалить карточку после подтверждения
      setTrash: (evt) => {
        popupWithSubmit.open();
        popupWithSubmit.setSubmitAction(() => {
          popupWithSubmit.loadData();
          api.deleteCard(item._id)
            .then(() => {
              newElement.removeCard();
              popupWithSubmit.close();
            })
            .catch(err => console.log(`Ошибка при удалении карточки: ${err}`))
            .finally(() => {
              popupWithSubmit.endLoadData();
            })
        });
      },

      // Установить лайк/дизлайк
      setLike: (evt) => {
        if(newElement.isLiked()) {
          api.dislikeCard(item._id)
            .then((res) => {
              newElement.updateLikes(res);
            })
            .catch(err =>  console.log(`Ошибка при отмене лайка: ${err}`))

        }else{
          api.likeCard(item._id)
            .then((res) => {
              newElement.updateLikes(res);
            })
          .catch(err => console.log(`Ошибка при добавлении лайка: ${err}`))
        }
      },
      dataCard: item,
      dataProfile
      },
      templateElement);

      const generateCard = newElement.generateCard();

      return generateCard;
  }


  // Сгенерировать список карточек на странице html
  initialCards.then(initialCards => {

    const cardList = new Section({
      data: initialCards,
      renderer: (item) => {
        const resultElement = createCard(item);
        cardList.addItem(resultElement);
      }
    }, '.elements__list');

    cardList.renderItems();

    // Добавить новую карточку на страницу

    const newCardPopup = new PopupWithForm(cardPopup, (evt) => {
      evt.preventDefault();

      newCardPopup.loadData();

      const inputsData = newCardPopup.getInputValues();

      const sendCard = api.addCard(inputsData)

      sendCard.then(function(response){
        const newCard = createCard(response);
        cardList.addItem(newCard);
      })
      .then(() => {
        newCardPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка добавления карточки: ${err}`)
      })
      .finally(() => {
        newCardPopup.endLoadData();
      })

    });

    newCardPopup.setEventListeners();

    cardAddButton.addEventListener('click', function() {
      newCardPopup.open();
      formCardValidator.clearFormInputs();
    });

  })

  .catch((err) => {
    console.log(`Ошибка генерации карточек: ${err}`)
  })

})

.catch((err) => {
  console.log(`Ошибка получения профиля: ${err}`)
})

const newProfilePopup = new PopupWithForm(profilePopup, (evt) => {

  newProfilePopup.loadData();

  const userProfile = newProfilePopup.getInputValues();

  api.editProfile(userProfile)
  .then((res) => {
    userParams.setUserInfo(res);
    newProfilePopup.close();
  })
  .catch(err => console.log(`Ошибка редактирования профиля: ${err}`))
  .finally(() => {
    newProfilePopup.endLoadData();
  })

});

newProfilePopup.setEventListeners();

profileEditButton.addEventListener('click', function() {
  newProfilePopup.open();
  formProfileValidator.clearFormInputs();
  const userData = userParams.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
});

const editProfileImagePopup = new PopupWithForm(profileImagePopup, (evt) => {
  editProfileImagePopup.loadData();

  const userAvatar = editProfileImagePopup.getInputValues();

  api.editProfileAvatar(userAvatar)
  .then((res) => {
    userParams.setUserAvatar(res);
    editProfileImagePopup.close();
  })
  .catch(err => console.log(`Ошибка редактирования аватара: ${err}`))
  .finally(() => {
    editProfileImagePopup.endLoadData();
  })

});

editProfileImagePopup.setEventListeners();

profileImageEditButton.addEventListener('click', function() {
  formProfileImageValidator.clearFormInputs();
  editProfileImagePopup.open();
});

// Валидация полей в формах
const formProfileValidator = new FormValidator(validationParams, formProfile);
formProfileValidator.enableValidation();

const formProfileImageValidator = new FormValidator(validationParams, formProfileImg);
formProfileImageValidator.enableValidation();

const formCardValidator = new FormValidator(validationParams, formCard);
formCardValidator.enableValidation();


