import Card from './card.js'
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
const editProfile = document.querySelector('.profile__edit-button');
const closeEditProfilePopupBtn = document.querySelector('#close-edit');
const editName = document.querySelector('#popup__name');
const editAbout = document.querySelector('#popup__about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__status');
const formEditProfile = document.querySelector('#form-edit');
// Попап добавления картинок

const cardsTemplate = document.querySelector('#cards-template').content;
const popupAddCard = document.querySelector('.popup_type_add');
const buttonAddPicture = document.querySelector('.profile__add-button');
const closeAddCardPopupBtn = document.querySelector('#close-add');
const pictureName = document.querySelector('#popup__name-add');
const pictureLink = document.querySelector('#popup__link-add');
const savePicture = document.querySelector('#form-add');
const popupSubmitAdd = savePicture.querySelector('.popup__submit_add')


// снятие ошибок при закрытии
const deleteErrorsAfterClose = (popup) => {
  const errorsSpan = popup.querySelectorAll('.popup__input-error_active')
  const errorsInput = popup.querySelectorAll('.popup__input_type_error')
  errorsSpan.forEach((evt) => evt.textContent = '')
  errorsInput.forEach((evt) => evt.classList.remove('popup__input_type_error'))
}
// функция закрытия по клику вокруг попапу
const listenClosePopupClickAround = (evt) => {
  if (evt.target.classList.contains('popup_status_opened')) {
    closePopup(evt.target);
  }
}
// функция закрытия попапа на Еск
const closePopupByEsc = (evt) => {
  const openedPopup = document.querySelector('.popup_status_opened');
  if(evt.key === 'Escape') closePopup(openedPopup)
}
// открыть попап
export const openPopup = (popup) => {
  popup.classList.add('popup_status_opened');
  popup.addEventListener('mousedown',listenClosePopupClickAround)
  document.addEventListener('keydown',closePopupByEsc)
}
// закрыть попап
export const closePopup = (popup) => {
  popup.classList.remove('popup_status_opened');
  popup.removeEventListener('mousedown',listenClosePopupClickAround)
  document.removeEventListener('keydown',closePopupByEsc)
  deleteErrorsAfterClose(popup)
  savePicture.reset()
}
// Редактировать профиль
function submitEditProfile(evt){
  evt.preventDefault();
  profileName.textContent = editName.value;
  profileAbout.textContent = editAbout.value;
  closePopup(popupEditProfile);
}



initialCards.forEach(item => {
  new Card(cardsTemplate, item).renderCard()
})

// Добавить картинку
function submitAddPicture(evt){
  evt.preventDefault();
  const newObj = {};
  newObj.name = pictureName.value;
  newObj.link = pictureLink.value;
  new Card(cardsTemplate, newObj).renderCard()
  closePopup(popupAddCard);
  savePicture.reset()
  disablePopupSubmit(popupSubmitAdd, selectorsObject)
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
// Открыть / закрыть попап добавление картинок
buttonAddPicture.addEventListener('click', function (){
  openPopup(popupAddCard)
});
closeAddCardPopupBtn.addEventListener('click', function (){
  closePopup(popupAddCard)
});
//сабмит редактора профиля
formEditProfile.addEventListener('submit', submitEditProfile);
//сабмит добавить картинку
savePicture.addEventListener('submit', submitAddPicture);
