import Popup from "./Popup.js";
export default class PopupWithImage extends Popup{
  constructor(popupElement, popupCard, popupText) {
    super(popupElement);
    this._popupCard = popupCard;
    this._popupText = popupText
  }
  open(card){
    super.open()
    this._popupCard.src = card.src;
    this._popupCard.alt = card.alt;
    this._popupText.textContent = card.parentNode.querySelector('.cards__text').textContent;
  }
}
