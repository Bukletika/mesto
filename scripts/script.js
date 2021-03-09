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


// 1. Настройка окна popup
let profileEditButton = document.querySelector('#profile-edit');
let profilePopup = document.querySelector('.popup-profile');
let profileCloseButton = profilePopup.querySelector('.popup__close');

function toggleProfilePopup(event) {
  event.preventDefault();
  profilePopup.classList.toggle('popup_opened');
}

profileEditButton.addEventListener('click', toggleProfilePopup);
profileCloseButton.addEventListener('click', toggleProfilePopup);

// Закрытие по клику на затемненную область
profilePopup.addEventListener('click', toggleProfilePopup);
document.querySelector('.popup__container').addEventListener('click', function (event) {
  event.stopPropagation();
});


// 2. Настройка передачи данных пользователя

// Находим форму в DOM
let formElement = document.querySelector('.form_edit_author');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.form__item_el_name');
let jobInput = formElement.querySelector('.form__item_el_about');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;

    // Выберите элементы, куда должны быть вставлены значения полей
    let profileTitle = document.querySelector('.profile__title');
    let profileSubtitle = document.querySelector('.profile__subtitle');

    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = nameInputValue;
    profileSubtitle.textContent = jobInputValue;

    toggleProfilePopup(evt);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
