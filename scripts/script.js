// ОБРАБОТКА НАЧАЛЬНОГО МАССИВА

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

const elementsContainer = document.querySelector('.elements__list');
const templateElement = document.querySelector('.template');


let imagePopup = document.querySelector('.image-popup'); // image popup
let imageCloseButton = imagePopup.querySelector('.popup__close'); // кнопка закрытия окна image popup


// Находит template и клонирует его код в новый элемент, вставляет данные из исходного массива элементов
function createElementDomNode (item) {
  const newCard = templateElement.content.cloneNode(true);
  const name = newCard.querySelector('.element__title');
  name.textContent = item.name;

  const image = newCard.querySelector('.element__image');
  image.src = item.link;
  image.alt = item.name;

  newCard.querySelector('.element__like').addEventListener('click', function(evt){
    evt.target.classList.toggle('element__like_active');
  });

  newCard.querySelector('.element__trash').addEventListener('click', function(evt){
    evt.target.closest('.elements__item').remove();
  });

  newCard.querySelector('.element__image').addEventListener('click', function(evt){
    imagePopup.querySelector('.image-popup__image').src = image.src;
    imagePopup.querySelector('.image-popup__image').alt = image.alt;
    imagePopup.querySelector('.image-popup__caption').innerHTML = image.alt;
    togglePopup(imagePopup);
  });

  return newCard;
}

// получить результирующий html код для списка карточек
function renderList() {
 const result = initialCards.map(function(item){
  const newElement = createElementDomNode(item);
  return newElement;
 });

 elementsContainer.append(...result);
}


//--------------------------------------------------------------------------------



// ОБРАБОТКА ОКОН POPUP
let profileEditButton = document.querySelector('#profile-edit'); // кнопка вызова окна редактирования профиля
let cardAddButton = document.querySelector('#card-add'); // кнопка вызова окна добавления новой карточки

let profilePopup = document.querySelector('.profile-popup'); // profile popup
let profileCloseButton = profilePopup.querySelector('.popup__close'); // кнопка закрытия окна profile popup
let profileTitle = document.querySelector('.profile__title'); // элемент в DOM, куда заносим имя
let profileSubtitle = document.querySelector('.profile__subtitle'); // элементв DOM, куда заносим текст о себе


let cardPopup = document.querySelector('.card-popup'); // card popup
let cardCloseButton = cardPopup.querySelector('.popup__close'); // кнопка закрытия окна карточки

let formCard = document.querySelector('.form-card');// Находим форму в DOM
let cardTitle = formCard.querySelector('.form__item_el_title');
let cardLink = formCard.querySelector('.form__item_el_link');

let formElement = document.querySelector('.form-profile');// Находим форму в DOM
let nameInput = formElement.querySelector('.form__item_el_name'); // Находим поле "Имя" формы в DOM
let jobInput = formElement.querySelector('.form__item_el_about'); // Находим поле "О себе" формы в DOM


// Функция копирования текущих значений полей профиля со страницы сайта в поля формы
function getFormCurrentParams() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

// Функция открытия profile popup

function togglePopup(selectPopup) {
  selectPopup.classList.toggle('popup_opened');
  cardTitle.value = '';
  cardLink.value = '';
  // Подставляем в форму текущие значения "имени" и "о себе" - запускаем только при открытии popup
  if (profilePopup.classList.contains('popup_opened')) {
    getFormCurrentParams();
  }
}

// Функция обработки формы редактирования профиля
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  togglePopup(profilePopup);
}

//Функция обработки формы добавления новой карточки
function formCardHandler (evt) {
  evt.preventDefault();

  const newCard =  createElementDomNode ({name: cardTitle.value, link: cardLink.value});

  elementsContainer.prepend(newCard);


  togglePopup(cardPopup);
}




renderList();

profileEditButton.addEventListener('click', function() {togglePopup(profilePopup)}); // Обработчик клика на кнопку "Изменить окно профиля"
profileCloseButton.addEventListener('click', function() {togglePopup(profilePopup)}); // Обработчик клика на кнопку "Закрыть окно профиля"

cardAddButton.addEventListener('click', function() {togglePopup(cardPopup)}); // Обработчик клика на кнопку "Изменить окно карточки"
cardCloseButton.addEventListener('click', function() {togglePopup(cardPopup)}); // Обработчик клика на кнопку "Закрыть окно карточки"

imageCloseButton.addEventListener('click', function() {togglePopup(imagePopup)}); // Обработчик клика на кнопку "Закрыть окно изображения"

formElement.addEventListener('submit', formSubmitHandler); // Обработчик отправки формы
formCard.addEventListener('submit', formCardHandler);



