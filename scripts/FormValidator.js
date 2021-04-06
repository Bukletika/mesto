class FormValidator {
  constructor (validationParams, formElement) {
    this._formSelector = validationParams.formSelector;
    this._inputSelector = validationParams.inputSelector;
    this._submitButtonSelector = validationParams.submitButtonSelector;
    this._inactiveButtonClass = validationParams.inactiveButtonClass;
    this._inputErrorClass = validationParams.inputErrorClass;
    this._errorClass = validationParams.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _getInputsEmpty = (inputList) => {
    return !inputList.some(inputElement => { return inputElement.value.length > 0});
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    });
  }

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList) || this._getInputsEmpty(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    }else{
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };

  _showInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {

    // Найдем span для вывода ошибки
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    // Удаляем инпуту класс с ошибкой
    inputElement.classList.remove(this._inputErrorClass);

     // Уберем текст об ошибке с инпута
     errorElement.textContent = '';

    // Удаляем спану с ошибкой класс, чтобы он не отображался
    errorElement.classList.remove(this._errorClass);

  };

  _checkInput = (inputElement) => {

    if (inputElement.validity.valid) {
        // Убрать подкрашивание красным и убрать ошибку
        this._hideInputError(inputElement);
    } else {
        // Подкрасить поле красным и вывести ошибку
        this._showInputError(inputElement);
    }
  };

  _setInputListeners = () => {
    // Для каждого поля из списка полей формы мы будем выполнять действия
    this._inputList.forEach(
      inputElement => {
        // Вешаем слушатель на инпут
        inputElement.addEventListener('input', () => {
            // Проверить состояние поля (валидно ли оно?)
            this._checkInput(inputElement);

            // Переключить состояние кнопки
            this._toggleButtonState(this._inputList, this._buttonElement);

        });
      }
    );

  };

  clearFormInputs = () => {
    this._inputList.forEach(
      inputElement => {
        this._hideInputError(inputElement);
      }
    );
    this._toggleButtonState(this._inputList, this._buttonElement);
  }

  enableValidation = () => {
    this._formElement.addEventListener ('submit', (evt) => {
      evt.preventDefault();
    });
    this._setInputListeners();
  }

}

export default FormValidator;
