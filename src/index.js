import './pages/index.css';
import {formEditProfile, formAddProfile, elementsUserInfo, editName,editAbout, initialCards, popupPhoto, popupAddCard, popupEditProfile, cardsItem, cardsTemplate, popupContainers, selectorsObject, editProfile, buttonAddPicture, popupSubmitAddButton} from './utils/constants.js';
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";
import Ard from './components/Card.js'
import FormValidator from "./components/FormValidator.js";
import UserInfo from "./components/UserInfo.js";

const clearErrorsEditForm = new FormValidator(selectorsObject, formEditProfile)
const clearErrorsAddForm = new FormValidator(selectorsObject, formAddProfile)
const userInfo = new UserInfo(elementsUserInfo)
const popupPhotoClass = new PopupWithImage(popupPhoto)

const popupTypeAdd = new PopupWithForm(popupAddCard, inputsValue => {
  const newCard = new Ard(cardsTemplate, inputsValue, popupPhotoClass).getCard()
  renderCards.addItem(newCard)
  popupTypeAdd.close()
})

const popupTypeEdit = new PopupWithForm(popupEditProfile, inputsValue => {
  userInfo.setUserInfo(inputsValue)
  popupTypeEdit.close()
})

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
editProfile.addEventListener('click', () =>{
  popupTypeEdit.open()
  popupTypeEdit.setEventListeners()
  const {name, about} = userInfo.getUserInfo()
  editName.value = name
  editAbout.value = about
  clearErrorsEditForm.clearErrors()
});

// Открыть  попап добавление картинок
buttonAddPicture.addEventListener('click', () =>{
  popupTypeAdd.open()
  popupTypeAdd.setEventListeners()
  popupSubmitAddButton.classList.add(selectorsObject.inactiveButtonClass)
  popupSubmitAddButton.setAttribute('disabled', 'disabled')
  clearErrorsAddForm.clearErrors()
});
