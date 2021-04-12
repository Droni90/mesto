export default class Card {
  constructor(templateSelector, object, handleCardClick){
    this._templateSelector = templateSelector;
    this._object = object;
    this._handleCardClick = handleCardClick
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
      this._handleCardClick.open(card);
      this._handleCardClick.setEventListeners()
    })

  }
    getCard(){
      this._element = this._createCard();
      this._setListeners();
      return this._element
    }
}

