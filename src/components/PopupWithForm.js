import Popup from "./Popup.js";
export default class PopupWithForm extends Popup{
  constructor(popupElement, callbackSubmitForm) {
    super(popupElement);
    this._callbackSubmitForm = callbackSubmitForm
    this._form = this._popupElement.querySelector('.popup__container');
  }
  _getInputValues(){
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }
  _submitHandler = evt => {
    evt.preventDefault()
    this._callbackSubmitForm(this._getInputValues())
  }
  setEventListeners(){
    super.setEventListeners()
    this._form.addEventListener('submit', this._submitHandler)
  }
  close() {
    super.close()
    this._form.removeEventListener('submit', this._submitHandler)
    this._form.reset()
  }
}

