const elementsContainer = document.querySelector('.elements__list');
const templateElement = document.querySelector('.template');

const imagePopup = document.querySelector('.popup_type_image'); // image popup
const imageCloseButton = imagePopup.querySelector('.popup__close'); // кнопка закрытия окна image popup

const imageFigure = document.querySelector('.popup__figure');
imageFigure.insertAdjacentHTML('afterbegin', '<img class="popup__image">');
const innerPopupImage = document.querySelector('.popup__image');


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
    innerPopupImage.src = image.src;
    innerPopupImage.alt = image.alt;
    imagePopup.querySelector('.popup__figcaption').textContent = image.alt;
    openPopup(imagePopup);
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
const popupWindows  = document.querySelectorAll('.popup');
const popupContainers = document.querySelectorAll('.popup__container');

const profileEditButton = document.querySelector('.profile__edit-button'); // кнопка вызова окна редактирования профиля
const cardAddButton = document.querySelector('.profile__add-button'); // кнопка вызова окна добавления новой карточки

const profilePopup = document.querySelector('.popup_type_profile'); // profile popup
const profileCloseButton = profilePopup.querySelector('.popup__close'); // кнопка закрытия окна profile popup
const profileTitle = document.querySelector('.profile__title'); // элемент в DOM, куда заносим имя
const profileSubtitle = document.querySelector('.profile__subtitle'); // элементы DOM, куда заносим текст о себе

const cardPopup = document.querySelector('.popup_type_card'); // card popup
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

// Функция отключения popup окна по ESC
const handleRemovePopupByEsc = function (evt) {
  const selectPopup = document.querySelector('.popup_opened');
  if(evt.key === 'Escape'){
    closePopup(selectPopup);
  }
}

// Функция открытия popup окон
function openPopup(selectPopup) {
  selectPopup.classList.add('popup_opened');
  document.addEventListener('keydown', handleRemovePopupByEsc);
}

// Функция закрытия popup окон
function closePopup(selectPopup) {
  selectPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleRemovePopupByEsc);
}

// Функция очистки ошибок инпутов при открытии формы
const clearFormInputs = (selectPopup) => {
  const form = selectPopup.querySelector('.form');
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  inputList.forEach(
    inputElement => {
      hideInputError(form, inputElement, 'popup__input_type_error', 'popup__error_visible');
    }
  );

  const buttonElement = form.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement, 'popup__button_disabled');
}


// Функция popup окна с редактированием профиля
function openEditFormPopup(selectPopup) {
  openPopup(selectPopup);
  formElement.reset();
  clearFormInputs(selectPopup);
  // Подставляем в форму текущие значения "имени" и "о себе" - запускаем только при открытии popup profile
  if (profilePopup.classList.contains('popup_opened')) {
    getFormCurrentParams();
  }
}

// Функция popup окна с добавлением карточки
function openAddCardPopup(selectPopup) {
  formCard.reset();
  openPopup(selectPopup);
  clearFormInputs(selectPopup);
}

// Закрытие popup окна по клику на затемненную область
popupWindows.forEach(element => {
  element.addEventListener('click', function(evt){
    closePopup(evt.target);
  });
});

popupContainers.forEach(element => {
  element.addEventListener('click', function (evt) {
    evt.stopPropagation();
  });
});


// Handler формы редактирования профиля
function handleEditProfileFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(profilePopup);
}

// Handler  формы добавления новой карточки
function handleAddCardFormSubmit (evt) {
  evt.preventDefault();
  const newCard =  createElementDomNode ({name: cardTitle.value, link: cardLink.value});
  elementsContainer.prepend(newCard);
  closePopup(cardPopup);
}

profileEditButton.addEventListener('click', function() {openEditFormPopup(profilePopup)}); // Обработчик клика на кнопку "Изменить окно профиля"
profileCloseButton.addEventListener('click', function() {closePopup(profilePopup)}); // Обработчик клика на кнопку "Закрыть окно профиля"

cardAddButton.addEventListener('click', function() {openAddCardPopup(cardPopup)}); // Обработчик клика на кнопку "Изменить окно карточки"
cardCloseButton.addEventListener('click', function() {closePopup(cardPopup)}); // Обработчик клика на кнопку "Закрыть окно карточки"

imageCloseButton.addEventListener('click', function() {closePopup(imagePopup)}); // Обработчик клика на кнопку "Закрыть окно изображения"

formElement.addEventListener('submit', handleEditProfileFormSubmit); // Обработчик отправки формы
formCard.addEventListener('submit', handleAddCardFormSubmit); // Обработчик формы добавления новой карточки



