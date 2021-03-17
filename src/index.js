const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const popupEditProfile = document.querySelector('.popup_type_edit');
const popup = document.querySelectorAll('.popup')
const editProfile = document.querySelector('.profile__edit-button');
const closeEditProfilePopupBtn = document.querySelector('#close-edit');
const editName = document.querySelector('#popup__name');
const editAbout = document.querySelector('#popup__about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__status');
const formEditProfile = document.querySelector('#form-edit');
const editProfileSubmitButton = document.querySelector('.popup__submit_edit')
const popupCloseButtons = document.querySelectorAll('.popup__close')
// Попап добавления картинок
const cardsItem = document.querySelector('.cards');
const cardsTemplate = document.querySelector('#cards-template').content;
const popupAddCard = document.querySelector('.popup_type_add');
const buttonAddPicture = document.querySelector('.profile__add-button');
const closeAddCardPopupBtn = document.querySelector('#close-add');
const pictureName = document.querySelector('#popup__name-add');
const pictureLink = document.querySelector('#popup__link-add');
const savePicture = document.querySelector('#form-add');
const like = document.querySelector('.cards__like');
const cardItem = document.querySelector('.cards__item')
const popupSubmitAdd = savePicture.querySelector('.popup__submit_add')
// попап открытия фото
const popupPhoto = document.querySelector('.popup_type_photo')
const closePhotoPopupBtn = document.querySelector('#close-photo')
const popupImg = document.querySelector('.popup__img')
const popupText = document.querySelector('.popup__photo-text')
const formInputError = document.querySelector('.form__input-error')

// функция закрытия по клику вокруг попапу
const listenClosePopupClickAround = (evt) => {
  eventTarget = evt.target
  closePopup(eventTarget)
  evt.stopPropagation()
}
// функция закрытия попапа на Еск
const closePopopupByEsc = (evt, popup) => {
  if(evt.key === 'Escape') closePopup(popup)
}
// открыть попап
const openPopup = (popup) => {
  popup.classList.add('popup_status_opened');
  document.addEventListener('keydown', (evt) => {
    closePopopupByEsc(evt, popup)
  })
  popup.addEventListener('mousedown', (evt) => {
    listenClosePopupClickAround(evt)
  })
}
// закрыть попап
const closePopup = (popup) => {
  popup.classList.remove('popup_status_opened');
  document.removeEventListener('keydown', (evt) => {
    closePopopupByEsc(evt, popup)
  })
  popup.removeEventListener('mousedown', (evt) => {
    listenClosePopupClickAround(evt)
  })
}

// Открыть / закрыть попап редактор профиля
editProfile.addEventListener('click', function (){
  openPopup(popupEditProfile);
  editName.value = profileName.textContent;
  editAbout.value = profileAbout.textContent;
});

closeEditProfilePopupBtn.addEventListener('click', function (){
  closePopup(popupEditProfile);
});

// Редактировать профиль
function submitEditProfile(evt){
  evt.preventDefault();
  profileName.textContent = editName.value;
  profileAbout.textContent = editAbout.value;
  closePopup(popupEditProfile);
}

formEditProfile.addEventListener('submit', submitEditProfile);

// Открыть / закрыть попап
buttonAddPicture.addEventListener('click', function (){
  openPopup(popupAddCard)
});

closeAddCardPopupBtn.addEventListener('click', function (){
  closePopup(popupAddCard)
});

// Ставим лайки <3
  const getlike = (el) => {
  const like = el.querySelector('.cards__like');
  like.addEventListener('click', () => {
    like.classList.toggle('cards__like_status_active');
  });
}

// Удалить картинку
  const delPicture = (el) => {
  const deletePicture = el.querySelector('.cards__delete');
  deletePicture.addEventListener('click', ()=>{
    deletePicture.parentNode.remove();
  });
}

// открыть картинку
const openPicture = (el) => {
  const card = el.querySelector('.cards__img')
    card.addEventListener('click', () => {
        popupImg.src = card.src;
        popupImg.alt = card.alt;
        popupText.textContent = card.parentNode.querySelector('.cards__text').textContent;
        openPopup(popupPhoto);
      })
}

// Закрыть картинку
closePhotoPopupBtn.addEventListener('click', function (){
  closePopup(popupPhoto)
});

// функция создания карты
const createCard = (element) => {
  const cardsElement = cardsTemplate.querySelector('.cards__item').cloneNode(true);
  const cardsImg = cardsElement.querySelector('.cards__img')
  cardsImg.src = element.link;
  cardsImg.alt = element.name;
  cardsElement.querySelector('.cards__text').textContent = element.name;
  getlike(cardsElement)
  delPicture(cardsElement)
  openPicture(cardsElement)
  return cardsElement;
}

// Функция добавления  карты в DOM
const addСard = (element) => {
  cardsItem.prepend(element);
}

initialCards.forEach((card) => {
  addСard(createCard(card))
});

// Добавить картинку
function submitAddPicture(evt){
  evt.preventDefault();
  const newCard = {};
  newCard.name = pictureName.value;
  newCard.link = pictureLink.value;
  addСard(createCard(newCard))
  closePopup(popupAddCard);
  savePicture.reset()
  disablePopupSubmit(popupSubmitAdd, selectorsObject)
}
savePicture.addEventListener('submit', submitAddPicture);
