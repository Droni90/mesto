export default class Popup{
  constructor(popupElement) {
    this._popupElement = popupElement
    this.close = this.close.bind(this)
  }
  _handleEscClose = (evt) => {
    if(evt.key === 'Escape') this.close()
  }
  _listenClosePopupClickAround = (evt) => {
    if (evt.target.classList.contains('popup_status_opened')) {
      this.close()
    }
  }

  setEventListeners(){
    const buttonClose = this._popupElement.querySelector('.popup__close')
    buttonClose.addEventListener('click', this.close)
    this._popupElement.addEventListener('mousedown',this._listenClosePopupClickAround)
  }

  open(){
    this._popupElement.classList.add('popup_status_opened')
    document.addEventListener('keydown', this._handleEscClose)
  }

  close(){
    this._popupElement.classList.remove('popup_status_opened');
    document.removeEventListener('keydown', this._handleEscClose)
  }
}
