const popupPhoto = document.querySelector('.popup_type_photo')
const closePhotoPopupBtn = document.querySelector('#close-photo')
const popupImg = document.querySelector('.popup__img')
const popupText = document.querySelector('.popup__photo-text')

export default class Card{
  constructor(templateSelector, object, openPopup, closePopup){
    this._templateSelector = templateSelector;
    this._object = object;
    this._openPopup = openPopup;
    this._closePopup = closePopup;
  }
  _createCard() {
    const cardElement = this._templateSelector
      .querySelector('.cards__item')
      .cloneNode(true);
    const cardImg = cardElement.querySelector('.cards__img')
    cardImg.src = this._object.link;
    cardImg.alt = this._object.name;
    cardElement.querySelector('.cards__text').textContent = this._object.name;
    return cardElement
  }
  _setListeners(){
    const like = this._element.querySelector('.cards__like');
    like.addEventListener('click', () => {
      like.classList.toggle('cards__like_status_active');
    });
    const deletePicture = this._element.querySelector('.cards__delete');
    deletePicture.addEventListener('click', ()=>{
      deletePicture.parentNode.remove();
    });
    const card = this._element.querySelector('.cards__img')
    card.addEventListener('click', () => {
      popupImg.src = card.src;
      popupImg.alt = card.alt;
      popupText.textContent = card.parentNode.querySelector('.cards__text').textContent;
      this._openPopup(popupPhoto);
    })
    closePhotoPopupBtn.addEventListener('click', () => {
      this._closePopup(popupPhoto)
    });
  }
    getCard(){
      this._element = this._createCard();
      this._setListeners();
      return this._element
    }
}

