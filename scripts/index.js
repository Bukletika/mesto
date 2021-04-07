import Card from './Card.js'
import FormValidator from './FormValidator.js'

const elementsContainer = document.querySelector('.elements__list');
const templateElement = document.querySelector('.template');
export const imagePopup = document.querySelector('.popup_type_image'); // image popup
const imageCloseButton = imagePopup.querySelector('.popup__close'); // кнопка закрытия окна image popup

export const innerPopupImage = document.querySelector('.popup__image');


// получить результирующий html код для списка карточек
const renderList = () => {
  const result = initialCards.map(function(item){
    const newElement = new Card(item, templateElement);
    const resultElement = newElement.generateCard();

    return resultElement;
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

const formProfile = document.querySelector('.form-profile');// Находим форму в DOM
const nameInput = formProfile.querySelector('.form__item_el_name'); // Находим поле "Имя" формы в DOM
const jobInput = formProfile.querySelector('.form__item_el_about'); // Находим поле "О себе" формы в DOM

const formProfileValidator = new FormValidator(validationParams, formProfile);
formProfileValidator.enableValidation();
const formCardValidator = new FormValidator(validationParams, formCard);
formCardValidator.enableValidation();


// Функция копирования текущих значений полей профиля со страницы сайта в поля формы
function getFormCurrentParams() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

// Функция отключения popup окна по ESC
const handleRemovePopupByEsc = function (evt) {
  if(evt.key === 'Escape'){
    const selectPopup = document.querySelector('.popup_opened');
    closePopup(selectPopup);
  }
}

// Функция открытия popup окон
export function openPopup(selectPopup) {
  selectPopup.classList.add('popup_opened');
  document.addEventListener('keydown', handleRemovePopupByEsc);
}

// Функция закрытия popup окон
function closePopup(selectPopup) {
  selectPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleRemovePopupByEsc);
}

// Функция popup окна с редактированием профиля
function openEditFormPopup(selectPopup) {
  openPopup(selectPopup);
  formProfile.reset();
  formProfileValidator.clearFormInputs();
  // Подставляем в форму текущие значения "имени" и "о себе" - запускаем только при открытии popup profile
  if (profilePopup.classList.contains('popup_opened')) {
    getFormCurrentParams();
  }
}

// Функция popup окна с добавлением карточки
function openAddCardPopup(selectPopup) {
  formCard.reset();
  openPopup(selectPopup);
  formCardValidator.clearFormInputs();
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
  const newCard = new Card({name: cardTitle.value, link: cardLink.value}, templateElement);
  const resultElement = newCard.generateCard();
  elementsContainer.prepend(resultElement);
  closePopup(cardPopup);
}

profileEditButton.addEventListener('click', function() {openEditFormPopup(profilePopup)}); // Обработчик клика на кнопку "Изменить окно профиля"
profileCloseButton.addEventListener('click', function() {closePopup(profilePopup)}); // Обработчик клика на кнопку "Закрыть окно профиля"

cardAddButton.addEventListener('click', function() {openAddCardPopup(cardPopup)}); // Обработчик клика на кнопку "Изменить окно карточки"
cardCloseButton.addEventListener('click', function() {closePopup(cardPopup)}); // Обработчик клика на кнопку "Закрыть окно карточки"

imageCloseButton.addEventListener('click', function() {closePopup(imagePopup)}); // Обработчик клика на кнопку "Закрыть окно изображения"

formProfile.addEventListener('submit', handleEditProfileFormSubmit); // Обработчик отправки формы
formCard.addEventListener('submit', handleAddCardFormSubmit); // Обработчик формы добавления новой карточки


