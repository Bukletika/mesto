// Обьект с параметрами для проверки полей формы
export const validationParams = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

export const templateElement = document.querySelector('.template');
export const imagePopup = document.querySelector('.popup_type_image'); // image popup
export const profileEditButton = document.querySelector('.profile__edit-button'); // кнопка вызова окна редактирования профиля
export const cardAddButton = document.querySelector('.profile__add-button'); // кнопка вызова окна добавления новой карточки
export const profilePopup = document.querySelector('.popup_type_profile'); // profile popup
export const profileImagePopup = document.querySelector('.popup_type_profileimage'); // profile image popup
export const profileImageEditButton = document.querySelector('.profile__button'); //кнопка вывзоа попапа редактирования изображения профиля
export const profileTitle = document.querySelector('.profile__title'); // элемент в DOM, куда заносим имя
export const profileSubtitle = document.querySelector('.profile__subtitle'); // элементы DOM, куда заносим текст о себе
export const cardPopup = document.querySelector('.popup_type_card'); // card popup
export const formCard = document.querySelector('.form-card');// Находим форму в DOM
export const formProfile = document.querySelector('.form-profile');// Находим форму в DOM
export const formProfileImg = document.querySelector('.form-profile-img');// Находим форму в DOM
export const nameInput = formProfile.querySelector('.form__item_el_name'); // Находим поле "Имя" формы в DOM
export const jobInput = formProfile.querySelector('.form__item_el_about'); // Находим поле "О себе" формы в DOM

