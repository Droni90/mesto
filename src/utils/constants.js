export const initialCards = [
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

export const selectorsObject = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_status_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

export const elementsUserInfo = {
  name: document.querySelector('.profile__name'),
  about: document.querySelector('.profile__status')
}

export const popupEditProfile = document.querySelector('.popup_type_edit');
export const editProfile = document.querySelector('.profile__edit-button');
export const editName = document.querySelector('#popup__name');
export const editAbout = document.querySelector('#popup__about');
// Попап добавления картинок

export const cardsTemplate = document.querySelector('#cards-template').content;
export const popupAddCard = document.querySelector('.popup_type_add');
export const buttonAddPicture = document.querySelector('.profile__add-button');
export const pictureName = document.querySelector('#popup__name-add');
export const pictureLink = document.querySelector('#popup__link-add');
export const cardsItem = document.querySelector('.cards');
export const popupContainers = document.querySelectorAll('.popup__container')
export const popupSubmitAddButton = document.querySelector('.popup__submit_add')
export const popupPhoto = document.querySelector('.popup_type_photo')
export const formEditProfile = document.querySelector('#form-edit')
export const formAddProfile = document.querySelector('#form-add')

