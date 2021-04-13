import './pages/index.css';
// import AddButtonImage from './images/AddButton.svg'
// import avatarImage from './images/avatar.jpg'
// import CloseImage from './images/Close.svg'
// import deleteImage from './images/delete.svg'
// import EditButtonImage from './images/EditButton.svg'
// import img1Image from './images/img1.jpg'
// import img2Image from './images/img2.jpg'
// import img3Image from './images/img3.jpg'
// import img4Image from './images/img4.jpg'
// import img5Image from './images/img5.jpg'
// import img6Image from './images/img6.jpg'
// import likeImage from './images/like.svg'
// import likeBlackImage from './images/like-black.svg'
// import logoImage from './images/logo.svg'
// import plusImage from './images/plus.svg'
//
// const whoIsTheGoat = [
//   // меняем исходные пути на переменные
//   { name: 'AddButtonImage', image: AddButtonImage },
//   { name: 'avatarImage', link: avatarImage },
//   { name: 'CloseImage', link: CloseImage },
//   { name: 'deleteImage', image: deleteImage },
//   { name: 'EditButtonImage', link: EditButtonImage },
//   { name: 'img1Image', link: img1Image },
//   { name: 'img2Image', image: img2Image },
//   { name: 'img3Image', link: img3Image },
//   { name: 'img4Image', link: img4Image },
//   { name: 'img5Image', image: img5Image },
//   { name: 'img6Image', link: img6Image },
//   { name: 'likeImage', link: likeImage },
//   { name: 'likeBlackImage', link: likeBlackImage },
//   { name: 'logoImage', link: logoImage },
//   { name: 'plusImage', link: plusImage },
// ];



import {selectorsUserInfo, editName,editAbout, initialCards, popupPhoto, popupAddCard, popupEditProfile, cardsItem, cardsTemplate, popupContainers, selectorsObject, editProfile, buttonAddPicture, popupSubmitAddButton, pictureName, pictureLink} from './utils/constants.js';
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";
import Ard from './components/Card.js'
import FormValidator from "./components/FormValidator.js";
import UserInfo from "./components/UserInfo.js";

const userInfo = new UserInfo(selectorsUserInfo)
const popupPhotoClass = new PopupWithImage(popupPhoto)

const popupTypeAdd = new PopupWithForm(popupAddCard, evt => {
  evt.preventDefault();
  const newObj = {};
  newObj.name = pictureName.value;
  newObj.link = pictureLink.value;
  const newCard = new Ard(cardsTemplate, newObj, popupPhotoClass).getCard()
  renderCards.addItem(newCard)
  popupTypeAdd.close()
})
popupTypeAdd.setEventListeners()

const popupTypeEdit = new PopupWithForm(popupEditProfile, evt => {
  evt.preventDefault();
  userInfo.setUserInfo()
  popupTypeEdit.close()
})
popupTypeEdit.setEventListeners()


const renderCards = new Section({
  items: initialCards,
  renderer: (element) => {
    const newCard = new Ard(cardsTemplate, element, popupPhotoClass).getCard()
    renderCards.addItem(newCard)
  }},
  cardsItem)

renderCards.renderItems()


//валидация по формам
const formList = Array.from(popupContainers);
formList.forEach((formElement) => {
  new FormValidator(selectorsObject, formElement).enableValidation()
});

                            //Слушатели
// Открыть  попап редактор профиля
editProfile.addEventListener('click', function (){
  popupTypeEdit.open();
  const {name, about} = userInfo.getUserInfo()
  editName.value = name;
  editAbout.value = about;
});

// Открыть  попап добавление картинок
buttonAddPicture.addEventListener('click', function (){
  popupTypeAdd.open()
  popupSubmitAddButton.classList.add(selectorsObject.inactiveButtonClass);
  popupSubmitAddButton.setAttribute('disabled', 'disabled');
});
