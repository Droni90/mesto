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

const selectorsObject = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_status_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

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
const formPopupAdd = document.querySelector('#form-add');
const cardsItem = document.querySelector('.cards');
const popupContainers = document.querySelectorAll('.popup__container')
const popupSubmitAddButton = document.querySelector('.popup__submit_add')
