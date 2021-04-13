import './pages/index.css';
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
