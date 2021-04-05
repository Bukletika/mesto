// Начальный массив с карточками
const initialCards = [
  {
    name: 'Лондон',
    link: './images/london.jpg'
  },
  {
    name: 'Нью-Йорк',
    link: './images/newyork.jpg'
  },
  {
    name: 'Прага',
    link: './images/praha.jpg'
  },
  {
    name: 'Венеция',
    link: './images/venecia.jpg'
  },
  {
    name: 'Барселона',
    link: './images/barselona.jpg'
  },
  {
    name: 'Париж',
    link: './images/paris.jpg'
  }
];

// Обьект с параметрами для проверки полей формы
const validationParams = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
