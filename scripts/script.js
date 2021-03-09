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


// находит template и клонирует его код в новый элемент, вставляет данные из исходного массива элементов
function createElementDomNode (item) {
  const newCard = templateElement.content.cloneNode(true);
  const name = newCard.querySelector('.element__title');
  name.textContent = item.name;

  const image = newCard.querySelector('.element__image');
  image.src = item.link;
  image.alt = item.name;

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

renderList();

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
