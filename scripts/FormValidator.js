class FormValidator {
  constructor (validationParams, formElement) {
    this._formSelector = validationParams.formSelector;
    this._inputSelector = validationParams.inputSelector;
    this._submitButtonSelector = validationParams.submitButtonSelector;
    this._inactiveButtonClass = validationParams.inactiveButtonClass;
    this._inputErrorClass = validationParams.inputErrorClass;
    this._errorClass = validationParams.errorClass;
    this._formElement = formElement;
  }

  _getInputsEmpty = (inputList) => {
    return !inputList.some(inputElement => { return inputElement.value.length > 0});
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    });
  }

  _toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (this._hasInvalidInput(inputList) || this._getInputsEmpty(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    }else{
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };

  getToggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    return this._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  }

  _showInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
  };

  _hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    // Найдем span для вывода ошибки
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    // Удаляем инпуту класс с ошибкой
    inputElement.classList.remove(inputErrorClass);

     // Уберем текст об ошибке с инпута
     errorElement.textContent = '';

    // Удаляем спану с ошибкой класс, чтобы он не отображался
    errorElement.classList.remove(errorClass);

  };

  getHideInputError(formElement, inputElement, inputErrorClass, errorClass) {
    return this._hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }

  _checkInput = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (inputElement.validity.valid) {
        // Убрать подкрашивание красным и убрать ошибку
        this._hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    } else {
        // Подкрасить поле красным и вывести ошибку
        this._showInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
  };

  _setInputListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {

    // Получим список полей формы
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    // Найдем кнопку отправки данных в форме
    const buttonElement = formElement.querySelector(submitButtonSelector);

    // Для каждого поля из списка полей формы мы будем выполнять действия
    inputList.forEach(
      inputElement => {
        // Вешаем слушатель на инпут
        inputElement.addEventListener('input', () => {
            // Проверить состояние поля (валидно ли оно?)
            this._checkInput(formElement, inputElement, inputErrorClass, errorClass);

            // Переключить состояние кнопки
            this._toggleButtonState(inputList, buttonElement, inactiveButtonClass);

        });
      }
    );

  };


  enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}, formElement) => {
    formElement.addEventListener ('submit', (evt) => {
      evt.preventDefault();
    });
    this._setInputListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  }

}

export default FormValidator;
