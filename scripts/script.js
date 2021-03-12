const elementsContainer = document.querySelector('.elements__list');
const templateElement = document.querySelector('.template');

const imagePopup = document.querySelector('.image-popup'); // image popup
const popupImage = imagePopup.querySelector('.image-popup__image'); // Изображение в popup
const imageCloseButton = imagePopup.querySelector('.popup__close'); // кнопка закрытия окна image popup



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

  image.addEventListener('click', function(evt){
    popupImage.src = image.src;
    popupImage.alt = image.alt;
    imagePopup.querySelector('.image-popup__caption').textContent = image.alt;
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

renderList();
//--------------------------------------------------------------------------------



// ОБРАБОТКА ОКОН POPUP
const profileEditButton = document.querySelector('#profile-edit'); // кнопка вызова окна редактирования профиля
const cardAddButton = document.querySelector('#card-add'); // кнопка вызова окна добавления новой карточки

const profilePopup = document.querySelector('.profile-popup'); // profile popup
const profileCloseButton = profilePopup.querySelector('.popup__close'); // кнопка закрытия окна profile popup
const profileTitle = document.querySelector('.profile__title'); // элемент в DOM, куда заносим имя
const profileSubtitle = document.querySelector('.profile__subtitle'); // элементы DOM, куда заносим текст о себе

const cardPopup = document.querySelector('.card-popup'); // card popup
const cardCloseButton = cardPopup.querySelector('.popup__close'); // кнопка закрытия окна карточки

const formCard = document.querySelector('.form-card');// Находим форму в DOM
const cardTitle = formCard.querySelector('.form__item_el_title');
const cardLink = formCard.querySelector('.form__item_el_link');

const formElement = document.querySelector('.form-profile');// Находим форму в DOM
const nameInput = formElement.querySelector('.form__item_el_name'); // Находим поле "Имя" формы в DOM
const jobInput = formElement.querySelector('.form__item_el_about'); // Находим поле "О себе" формы в DOM

// Функция копирования текущих значений полей профиля со страницы сайта в поля формы
function getFormCurrentParams() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

// Функция открытия popup окон
function togglePopup(selectPopup) {
  selectPopup.classList.toggle('popup_opened');
}

// Функция popup окна с редактированием профиля
function toggleEditFormPopup(selectPopup) {
  togglePopup(selectPopup);
  // Подставляем в форму текущие значения "имени" и "о себе" - запускаем только при открытии popup profile
  if (profilePopup.classList.contains('popup_opened')) {
    getFormCurrentParams();
  }
}

// Функция popup окна с добавлением карточки
function toggleAddCardPopup(selectPopup) {
  cardTitle.value = '';
  cardLink.value = '';
  togglePopup(selectPopup);
}

// Handler формы редактирования профиля
function editProfileFormSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  togglePopup(profilePopup);
}

// Handler  формы добавления новой карточки
function addCardFormSubmitHandler (evt) {
  evt.preventDefault();
  const newCard =  createElementDomNode ({name: cardTitle.value, link: cardLink.value});
  elementsContainer.prepend(newCard);
  togglePopup(cardPopup);
}

profileEditButton.addEventListener('click', function() {toggleEditFormPopup(profilePopup)}); // Обработчик клика на кнопку "Изменить окно профиля"
profileCloseButton.addEventListener('click', function() {toggleEditFormPopup(profilePopup)}); // Обработчик клика на кнопку "Закрыть окно профиля"

cardAddButton.addEventListener('click', function() {toggleAddCardPopup(cardPopup)}); // Обработчик клика на кнопку "Изменить окно карточки"
cardCloseButton.addEventListener('click', function() {toggleAddCardPopup(cardPopup)}); // Обработчик клика на кнопку "Закрыть окно карточки"

imageCloseButton.addEventListener('click', function() {togglePopup(imagePopup)}); // Обработчик клика на кнопку "Закрыть окно изображения"

formElement.addEventListener('submit', editProfileFormSubmitHandler); // Обработчик отправки формы
formCard.addEventListener('submit', addCardFormSubmitHandler); // Обработчик формы добавления новой карточки



