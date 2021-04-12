export default class Popup{
  constructor(popupSelector) {
    this._popupSelector = popupSelector
  }
  _handleEscClose = (evt) => {
    if(evt.key === 'Escape') this.close()
  }
  _listenClosePopupClickAround = (evt) => {
    if (evt.target.classList.contains('popup_status_opened')) {
      this.close()
    }
  }
  _clearErrors(){
    const errorsSpan = this._popupSelector.querySelectorAll('.popup__input-error_active')
    const errorsInput = this._popupSelector.querySelectorAll('.popup__input_type_error')
    errorsSpan.forEach((el) => el.textContent = '')
    errorsInput.forEach((el) => el.classList.remove('popup__input_type_error'))
  }
  setEventListeners(){
    const buttonClose = this._popupSelector.querySelector('.popup__close')
    buttonClose.addEventListener('click', this.close)
    document.addEventListener('keydown', this._handleEscClose)
    this._popupSelector.addEventListener('mousedown',this._listenClosePopupClickAround)
  }

  open(){
    this._popupSelector.classList.add('popup_status_opened')
    this._clearErrors()
  }

  close(){
    this._popupSelector.classList.remove('popup_status_opened');
  }
}
