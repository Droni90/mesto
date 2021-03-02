const openPopup = document.querySelector('#popup-edit');
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
const openPopupAdd = document.querySelector('#popup-add');
const addPicture = document.querySelector('.profile__add-button');
const closePopupAdd = document.querySelector('#close-add');
const pictureName = document.querySelector('#name-add');
const pictureLink = document.querySelector('#link-add');
const savePicture = document.querySelector('#form-add');

// попап открытия фото
const openPhoto = document.querySelector('#popup-photo')
const closePopupPhoto = document.querySelector('#close-photo')


// Открыть / закрыть попап редактор профиля
editProfile.addEventListener('click', function (){
  openPopup.classList.add('popup_status_opened');
  editName.value = profileName.textContent;
  editAbout.value = profileAbout.textContent;
});

closePopup.addEventListener('click', function (){
  openPopup.classList.remove('popup_status_opened');
});


// Редактировать профиль
function submitEditProfile(evt){
  evt.preventDefault();
  profileName.textContent = (editName.value);
  profileAbout.textContent = (editAbout.value);
  openPopup.classList.remove('popup_status_opened');
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
addPicture.addEventListener('click', function (){
  openPopupAdd.classList.add('popup_status_opened');
});

closePopupAdd.addEventListener('click', function (){
  openPopupAdd.classList.remove('popup_status_opened');
});

// Ставим лайки <3
  const getlike = () => {
  let like = document.querySelector('.cards__link');
  like.addEventListener('click', () => {
    like.classList.toggle('cards__link_status_active');
  });
}

// Удалить картинку
  const delPicture = () => {
  let deletePicture = document.querySelector('.cards__delete');
  deletePicture.addEventListener('click', ()=>{
    deletePicture.parentNode.remove();
  });
}


// открыть картинку
const opPhoto = () => {
  let card = document.querySelector('.cards__img')
    card.addEventListener('click', () => {
        let popupImg = document.querySelector('.popup__img')
        popupImg.src = card.src;
        openPhoto.classList.add('popup_status_opened');
      })
}

// Закрыть картинку
closePopupPhoto.addEventListener('click', function (){
  openPhoto.classList.remove('popup_status_opened');
});



// функция добавление нового элемента в DOM
const addObject = (element) => {
  const cardsElement = cardsTemplate.cloneNode(true);
  cardsElement.querySelector('.cards__img').src = element.link;
  cardsElement.querySelector('.cards__text').textContent = element.name;
  cardsItem.prepend(cardsElement);
  getlike()
  delPicture()
  opPhoto();
}

initialCards.forEach(addObject);




// Добавить картинку
function submitAddPicture(evt){
  evt.preventDefault();
  let newCard = {};
  newCard.name = pictureName.value;
  newCard.link = pictureLink.value;
  addObject(newCard);
  openPopupAdd.classList.remove('popup_status_opened');
}

savePicture.addEventListener('submit', submitAddPicture);

