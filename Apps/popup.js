let openPopup = document.querySelector('.popup');
let editProfile = document.querySelector('.profile__edit-button');
let closePopup = document.querySelector('.popup__close');

// Открыть / закрыть попап
editProfile.addEventListener('click', function (){
  openPopup.classList.add('popup_status_opened');
});

closePopup.addEventListener('click', function (){
  openPopup.classList.remove('popup_status_opened');
});

// Редактировать профиль
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__status');
let saveEditProfile = document.querySelector('.popup__submit');


function submitEditProfile(evt){
  evt.preventDefault();
  let editName = document.querySelector('#popup__name');
  let editAbout = document.querySelector('#popup__about');
  profileName.textContent = (editName.value);
  profileAbout.textContent = (editAbout.value);
  openPopup.classList.remove('popup_status_opened');
}

saveEditProfile.addEventListener('click', submitEditProfile);
