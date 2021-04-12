export default class FormValidator {
  constructor(object, formElement) {
    this._object = object;
    this._formElement = formElement
  }
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._object.inputErrorClass)
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._object.errorClass);
  }
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._object.inputErrorClass);
    errorElement.classList.remove(this._object.errorClass);
    errorElement.textContent = '';
  }
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  _hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    })
  }
  _enablePopupSubmit(button) {
    button.classList.remove(this._object.inactiveButtonClass);
    button.removeAttribute('disabled', 'disabled');
  }
  _disablePopupSubmit(button) {
    button.classList.add(this._object.inactiveButtonClass);
    button.setAttribute('disabled', 'disabled');
  }
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disablePopupSubmit(buttonElement)
    } else {
      this._enablePopupSubmit(buttonElement)
    }
  }
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._object.inputSelector));
    const buttonElement = this._formElement.querySelector(this._object.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }
  enableValidation() {
    this._setEventListeners();
  }
}



