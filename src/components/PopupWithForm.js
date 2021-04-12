import Popup from "./Popup.js";
export default class PopupWithForm extends Popup{
  constructor(popupSelector, callbackSubmitForm) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm
    this._form = this._popupSelector.querySelector('.popup__container');
  }
  _getInputValues(){
    const inputs = Array.from(this._form.querySelectorAll('.popup__input'));
    return inputs.map( input => input.value )
  }
  setEventListeners(){
    super.setEventListeners()
    this._form.addEventListener('submit', (this._callbackSubmitForm))
  }
  close = () => {
    super.close()
    this._form.reset()
  }
  open() {
    super.open();
  }
}

