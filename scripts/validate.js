// Функция проверки, все ли поля в форме пустые
const allInputsEmpty = (inputList) => {
  // Если true - все поля пустые
  return !inputList.some(inputElement => { return inputElement.value.length > 0});
};

// Проверка инпута на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
      return !inputElement.validity.valid;
  });
}

// Функция для отображения / скрытия кнопки
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {

  // Если хотя бы один инпут не валиден, то кнопку отключаем

  if (hasInvalidInput(inputList) || allInputsEmpty(inputList)) {

      buttonElement.classList.add('popup__button_disabled');
      buttonElement.setAttribute('disabled', true);
  }else{
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
  }

};

// 4.f Функция для отображения ошибки инпута
const showInputError = (formElement, inputElement, inputErrorClass, errorClass) => {

  // Найдем span для вывода ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  // Добавляем инпуту класс с ошибкой
  inputElement.classList.add(inputErrorClass);

  // Получим текст об ошибке с инпута
  errorElement.textContent = inputElement.validationMessage;

  // Добавляем спану с ошибкой класс для его отображения
  errorElement.classList.add(errorClass);
};

// 5.f Функция для отключения ошибки инпута
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  // Найдем span для вывода ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  // Удаляем инпуту класс с ошибкой
  inputElement.classList.remove(inputErrorClass);

   // Уберем текст об ошибке с инпута
   errorElement.textContent = '';

  // Удаляем спану с ошибкой класс, чтобы он не отображался
  errorElement.classList.remove(errorClass);

};


// Функция проверки инпута
const checkInput = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (inputElement.validity.valid) {
      // 5.a Убрать подкрашивание красным и убрать ошибку
      hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  } else {
      // 4.a Подкрасить поле красным и вывести ошибку
      showInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

// Установка слушателей для полей формы
const setInputListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {

  // Получим список полей формы
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  // Найдем кнопку отправки данных в форме
  const buttonElement = formElement.querySelector(submitButtonSelector);

  // Отключить активность кнопки при загрузке страницы
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  // Для каждого поля из списка полей формы мы будем выполнять действия
  inputList.forEach(
    inputElement => {
      // Вешаем слушатель на инпут
      inputElement.addEventListener('input', () => {
          // 3.a Проверить состояние поля (валидно ли оно?)
          checkInput(formElement, inputElement, inputErrorClass, errorClass);

          // 6.a Переключить состояние кнопки
          toggleButtonState(inputList, buttonElement, inactiveButtonClass);

      });
    }
  );

};

// Функция валидации всех форм на странице
const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  //  Для каждой формы будем выполнять код
  formList.forEach(
    formElement => {
      // Запретим выполнение дефолтных действий при сабмите формы
      formElement.addEventListener ('submit', (evt) => {
        evt.preventDefault();
      });

      setInputListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
    }
  );
}


// Вызов функции валидации всех форм на странице
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});