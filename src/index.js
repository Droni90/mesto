const openPopup = document.querySelector('.popup_type_edit');
const popup = document.querySelectorAll('.popup')
const editProfile = document.querySelector('.profile__edit-button');
const closePopup = document.querySelector('#close-edit');
const editName = document.querySelector('#popup__name');
const editAbout = document.querySelector('#popup__about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__status');
const saveEditProfile = document.querySelector('#form-edit');

// Попап добавления картинок
const cardsItem = document.querySelector('.cards');
const cardsTemplate = document.querySelector('#cards-template').content;
const openPopupAdd = document.querySelector('.popup_type_add');
const buttonAddPicture = document.querySelector('.profile__add-button');
const closePopupAdd = document.querySelector('#close-add');
const pictureName = document.querySelector('#name-add');
const pictureLink = document.querySelector('#link-add');
const savePicture = document.querySelector('#form-add');
const like = document.querySelector('.cards__link');
const cardItem = document.querySelector('.cards__item')
// попап открытия фото
const openPhoto = document.querySelector('.popup_type_photo')
const closePopupPhoto = document.querySelector('#close-photo')

// функция открытия/закрытия попапа
const popupToggle = (el) => {
  el.classList.toggle('popup_status_opened');
}

// Открыть / закрыть попап редактор профиля
editProfile.addEventListener('click', function (){
  popupToggle(openPopup);
  editName.value = profileName.textContent;
  editAbout.value = profileAbout.textContent;
});

closePopup.addEventListener('click', function (){
  popupToggle(openPopup);
});

// Редактировать профиль
function submitEditProfile(evt){
  evt.preventDefault();
  profileName.textContent = (editName.value);
  profileAbout.textContent = (editAbout.value);
  popupToggle(openPopup);
}

saveEditProfile.addEventListener('submit', submitEditProfile);

let initialCards = [
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
  popupToggle(openPopupAdd)
  pictureName.value = ''
  pictureLink.value = ''
});

closePopupAdd.addEventListener('click', function (){
  popupToggle(openPopupAdd)
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
        let popupImg = document.querySelector('.popup__img')
        let popupText = document.querySelector('.popup__photo-text')
        popupImg.src = card.src;
        popupText.textContent = card.parentNode.querySelector('.cards__text').textContent;
        popupToggle(openPhoto);
      })
}

// Закрыть картинку
closePopupPhoto.addEventListener('click', function (){
  popupToggle(openPhoto)
});

// функция создания карты
const createCard = (element) => {
  const cardsElement = cardsTemplate.cloneNode(true);
  cardsElement.querySelector('.cards__img').src = element.link;
  cardsElement.querySelector('.cards__img').alt = element.name;
  cardsElement.querySelector('.cards__text').textContent = element.name;
  return cardsElement;
}

// Функция добавления  карты в DOM
const addСard = (element) => {
  cardsItem.prepend(element);
  const readyCard = cardsItem.querySelector('.cards__item');
  return readyCard;
}

// Добавление слушателей
const addListeners = () => {
initialCards.forEach((element) => {
  const createdCard = createCard(element)
  const card = addСard(createdCard)
  getlike(card)
  delPicture(card)
  openPicture(card)
});
}
addListeners()

// Добавить картинку
function submitAddPicture(evt){
  evt.preventDefault();
  initialCards = [];
  let newCard = {};
  newCard.name = pictureName.value;
  newCard.link = pictureLink.value;
  initialCards.push(newCard)
  addListeners()
  console.log(initialCards)
  popupToggle(openPopupAdd);
}

savePicture.addEventListener('submit', submitAddPicture);
