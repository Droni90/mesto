const popupEditProfile = document.querySelector('.popup_type_edit');
const popup = document.querySelectorAll('.popup')
const editProfile = document.querySelector('.profile__edit-button');
const closeEditProfilePopupBtn = document.querySelector('#close-edit');
const editName = document.querySelector('#popup__name');
const editAbout = document.querySelector('#popup__about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__status');
const saveEditProfile = document.querySelector('#form-edit');

// Попап добавления картинок
const cardsItem = document.querySelector('.cards');
const cardsTemplate = document.querySelector('#cards-template').content;
const popupAddCard = document.querySelector('.popup_type_add');
const buttonAddPicture = document.querySelector('.profile__add-button');
const closeAddCardPopupBtn = document.querySelector('#close-add');
const pictureName = document.querySelector('#name-add');
const pictureLink = document.querySelector('#link-add');
const savePicture = document.querySelector('#form-add');
const like = document.querySelector('.cards__link');
const cardItem = document.querySelector('.cards__item')
// попап открытия фото
const popupPhoto = document.querySelector('.popup_type_photo')
const closePhotoPopupBtn = document.querySelector('#close-photo')
const popupImg = document.querySelector('.popup__img')
const popupText = document.querySelector('.popup__photo-text')

// функция открытия/закрытия попапа
const popupToggle = (el) => {
  el.classList.toggle('popup_status_opened');
}

// Открыть / закрыть попап редактор профиля
editProfile.addEventListener('click', function (){
  popupToggle(popupEditProfile);
  editName.value = profileName.textContent;
  editAbout.value = profileAbout.textContent;
});

closeEditProfilePopupBtn.addEventListener('click', function (){
  popupToggle(popupEditProfile);
});

// Редактировать профиль
function submitEditProfile(evt){
  evt.preventDefault();
  profileName.textContent = (editName.value);
  profileAbout.textContent = (editAbout.value);
  popupToggle(popupEditProfile);
}

saveEditProfile.addEventListener('submit', submitEditProfile);

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

// Открыть / закрыть попап
buttonAddPicture.addEventListener('click', function (){
  popupToggle(popupAddCard)
  pictureName.value = ''
  pictureLink.value = ''
});

closeAddCardPopupBtn.addEventListener('click', function (){
  popupToggle(popupAddCard)
});

// Ставим лайки <3
  const getlike = (el) => {
  const like = el.querySelector('.cards__link');
  like.addEventListener('click', () => {
    like.classList.toggle('cards__link_status_active');
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
        popupText.textContent = card.parentNode.querySelector('.cards__text').textContent;
        popupToggle(popupPhoto);
      })
}

// Закрыть картинку
closePhotoPopupBtn.addEventListener('click', function (){
  popupToggle(popupPhoto)
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

initialCards.forEach((e) => {
  addСard(createCard(e))
});

// Добавить картинку
function submitAddPicture(evt){
  evt.preventDefault();
  const newCard = {};
  newCard.name = pictureName.value;
  newCard.link = pictureLink.value;
  addСard(createCard(newCard))
  popupToggle(popupAddCard);
}

savePicture.addEventListener('submit', submitAddPicture);
