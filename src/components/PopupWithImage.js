import Popup from "./Popup.js";
export default class PopupWithImage extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(card){
    super.open()
    const popupCard = this._popupSelector.querySelector('.popup__img')
    const popupText = this._popupSelector.querySelector('.popup__photo-text')
    popupCard.src = card.src;
    popupCard.alt = card.alt;
    popupText.textContent = card.parentNode.querySelector('.cards__text').textContent;
  }
  setEventListeners(){
    super.setEventListeners();
  }
  close = () => {
    super.close()
  }
}
