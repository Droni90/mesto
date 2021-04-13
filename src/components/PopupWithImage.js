import Popup from "./Popup.js";
export default class PopupWithImage extends Popup{
  constructor(popupElement) {
    super(popupElement);
  }
  open(card){
    super.open()
    const popupCard = this._popupElement.querySelector('.popup__img')
    const popupText = this._popupElement.querySelector('.popup__photo-text')
    popupCard.src = card.src;
    popupCard.alt = card.alt;
    popupText.textContent = card.parentNode.querySelector('.cards__text').textContent;
  }
}
