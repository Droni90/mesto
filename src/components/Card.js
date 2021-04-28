export default class Card {
  constructor(templateSelector, {myId, link, name, likes, owner, _id}, handleCardClick, removeCard, putLike, removeLike){
    this._templateSelector = templateSelector;
    this._myId = myId;
    this._link = link;
    this._name = name;
    this._likes = likes;
    this._ownCardId = owner._id;
    this._cardId = _id
    this._handleCardClick = handleCardClick
    this._removeCard = removeCard
    this._putLike = putLike
    this._removeLike = removeLike;
  }
  _createCard() {
    const cardElement = this._templateSelector
      .querySelector('.cards__item')
      .cloneNode(true);
    const cardImg = cardElement.querySelector('.cards__img')
    cardImg.src = this._link;
    cardImg.alt = this._name;
    cardElement.querySelector('.cards__text').textContent = this._name;
    //Счетчик Лайков
    cardElement.querySelector('.cards__likes-counter').textContent = this._likes.length
    // рисуем мои активные лайки
    this._likes.forEach(like => {
      if(like._id === this._myId){
        cardElement.querySelector('.cards__like').classList.add('cards__like_status_active')
      }
    })
    //Показываем корзины только у своих карточек
    if(this._myId === this._ownCardId){
      cardElement.querySelector('.cards__delete').classList.add('cards__delete_on')
    }
    return cardElement
  }
  _setListeners(){
    // слущатель лайков
    const like = this._element.querySelector('.cards__like');
    like.addEventListener('click', () => !like.classList.contains('cards__like_status_active')
      ? this._putLike(this._cardId)
      : this._removeLike(this._cardId)
    );
    // слушатель удаления картинки
    const deletePicture = this._element.querySelector('.cards__delete');
    deletePicture.addEventListener('click', () => this._removeCard(this._cardId));
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

