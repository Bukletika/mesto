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
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithSubmit from '../components/PopupWithSubmit.js'
import UserInfo from '../components/UserInfo.js'

const popupDeleteCard = document.querySelector('.popup_type_submit');
const profileAvatar = document.querySelector('.profile__img');

// Создать экземпляр класса для получения/отправки параметров пользователя
const userParams = new UserInfo({profileTitle,profileSubtitle});

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
    title: result.name,
    subtitle: result.about
  });

  profileAvatar.src = result.avatar;

  // Сгенерировать список карточек на странице html
  initialCards.then(initialCards => {

    const cardList = new Section({
      data: initialCards,
      renderer: (item) => {
        const newElement = new Card({

          // Открыть попап с картинкой карточки
          handleCardClick: () => { popupWithImage.open(item)},

          // Удалить карточку после подтверждения
          setTrash: (evt) => {
            popupWithSubmit.open();
            popupWithSubmit.setSubmitAction(() => {
              api.deleteCard(item._id)
                .then(() => {
                  evt.target.closest('.elements__item').remove();
                  popupWithSubmit.close();
                })
                .catch(err => console.log(`Ошибка при удалении карточки: ${err}`))
            });
          },

          // Установить лайк/дизлайк
          setLike: (evt) => {
            if(evt.target.classList.contains('element__like_active')) {
              api.dislikeCard(item._id)
                .then(() => {
                  evt.target.classList.remove('element__like_active');
                  item.likes.length  = item.likes.length  - 1;
                  evt.target.nextElementSibling.textContent = item.likes.length;
                })
              .catch(err =>  console.log(`Ошибка при отмене лайка: ${err}`))

            }else{
              api.likeCard(item._id)
                .then(() => {
                  evt.target.classList.add('element__like_active');
                  item.likes.length  = item.likes.length  + 1;
                  evt.target.nextElementSibling.textContent = item.likes.length;
                })
              .catch(err => console.log(`Ошибка при добавлении лайка: ${err}`))
            }
          },
          dataCard: item,
          dataProfile
          },
          templateElement
          );

        const resultElement = newElement.generateCard();
        cardList.addItem(resultElement);
      }
    }, '.elements__list');
    cardList.renderItems();

    // Добавить новую карточку на страницу
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

          // Открыть попап с картинкой карточки
          handleCardClick: () => {popupWithImage.open(inputsData)},

          // Удалить карточку после подтверждения
          setTrash: (evt) => {
            popupWithSubmit.open();
            popupWithSubmit.setSubmitAction(() => {
              api.deleteCard(response._id)
                .then(() => {
                  evt.target.closest('.elements__item').remove()
                  popupWithSubmit.close();
                })
                .catch(err => console.log(`Ошибка при удалении карточки: ${err}`))
            });
          },

          // Установить лайк/дизлайк
          setLike: (evt) => {
            if(evt.target.classList.contains('element__like_active')) {
              api.dislikeCard(response._id)
              .then(() => {
                evt.target.classList.remove('element__like_active');
                response.likes.length  = response.likes.length  - 1;
                evt.target.nextElementSibling.textContent = response.likes.length;
              })
              .catch(err => console.log(`Ошибка при отмене лайка: ${err}`))

            }else{
              api.likeCard(response._id)
              .then(() => {
                evt.target.classList.add('element__like_active');
                response.likes.length  = response.likes.length  + 1;
                evt.target.nextElementSibling.textContent = response.likes.length;
              })
              .catch(err => console.log(`Ошибка при добавлении лайка: ${err}`))
            }
          },
          dataCard: inputsData
        } , templateElement).generateCard();
      cardList.addItem(newCard);

      })
      .catch((err) => {
        console.log(`Ошибка добавления карточки: ${err}`)
      })
      .finally(() => {
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
  .catch((err) => {
    console.log(`Ошибка генерации карточек: ${err}`)
  })

})
.catch((err) => {
  console.log(`Ошибка получения профиля: ${err}`)
})

const newProfilePopup = new PopupWithForm(profilePopup, (evt) => {
  userParams.setUserInfo({
    title: nameInput.value,
    subtitle: jobInput.value
  });

  newProfilePopup.loadData()

  api.editProfile({name: nameInput.value, about: jobInput.value})
  .catch(err => console.log(`Ошибка редактирования профиля: ${err}`))
  .finally(() => {
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

  api.editProfileAvatar({avatar: avatarLink.value})
  .catch(err => console.log(`Ошибка редактирования аватара: ${err}`))
  .finally(() => {
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
  .catch(err => console.log(`Ошибка: ${err}`))

});

// Валидация полей в формах
const formProfileValidator = new FormValidator(validationParams, formProfile);
formProfileValidator.enableValidation();

const formProfileImageValidator = new FormValidator(validationParams, formProfileImg);
formProfileImageValidator.enableValidation();

const formCardValidator = new FormValidator(validationParams, formCard);
formCardValidator.enableValidation();


