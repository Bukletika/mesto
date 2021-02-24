let profileEditButton = document.querySelector('#profile-edit'); // кнопка вызова окна profile popup

let profilePopup = document.querySelector('.popup'); // profile popup
let profileCloseButton = profilePopup.querySelector('.popup__close'); // кнопка закрытия окна profile popup
let profileTitle = document.querySelector('.profile__title'); // элемент в DOM, куда заносим имя
let profileSubtitle = document.querySelector('.profile__subtitle'); // элементв DOM, куда заносим текст о себе

let formElement = document.querySelector('.form');// Находим форму в DOM
let nameInput = formElement.querySelector('.form__item_el_name'); // Находим поле "Имя" формы в DOM
let jobInput = formElement.querySelector('.form__item_el_about'); // Находим поле "О себе" формы в DOM

// Функция копирования текущих значений полей профиля со страницы сайта в поля формы
function getFormCurrentParams() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

// Функция открытия profile popup
function toggleProfilePopup() {
  profilePopup.classList.toggle('popup_opened');
  // Подставляем в форму текущие значения "имени" и "о себе" - запускаем только при открытии popup
  if (profilePopup.classList.contains('popup_opened')) {
    getFormCurrentParams();
  }
}

// Функция обработки формы
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  toggleProfilePopup(evt);
}

profileEditButton.addEventListener('click', toggleProfilePopup); // Обработчик клика на кнопку "Изменить окно профиля"
profileCloseButton.addEventListener('click', toggleProfilePopup); // Обработчик клика на кнопку "Закрыть окно профиля"
formElement.addEventListener('submit', formSubmitHandler); // Обработчик отправки формы
