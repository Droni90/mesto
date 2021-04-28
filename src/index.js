import './pages/index.css';
import 'regenerator-runtime/runtime'
import {formEditProfile,formEditAvatar, buttonEditAvatar, popupSubmitEdit, popupEditAvatar, formAddProfile, popupTypeConfirm, elementsUserInfo, editName,editAbout, popupPhoto, popupAddCard, popupEditProfile, cardsItem, cardsTemplate, popupContainers, selectorsObject, editProfile, buttonAddPicture, popupSubmitAddButton} from './utils/constants.js';
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";
import Card from './components/Card.js'
import FormValidator from "./components/FormValidator.js";
import UserInfo from "./components/UserInfo.js";
import Api from "./components/Api";
import PopupConfirm from "./components/PopupConfirm";
import Popup from "./components/Popup";
import {data} from "autoprefixer";
const popupConfirm = new PopupConfirm(popupTypeConfirm)
const clearErrorsEditForm = new FormValidator(selectorsObject, formEditProfile)
const clearErrorsAddForm = new FormValidator(selectorsObject, formAddProfile)
const clearErrorsEditAvatarForm = new FormValidator(selectorsObject, formEditAvatar)
const userInfo = new UserInfo(elementsUserInfo)
const popupPhotoClass = new PopupWithImage(popupPhoto)
const renderCards = new Section(cardsItem)
const api = new Api({
  baseUrl: `https://mesto.nomoreparties.co/v1/cohort-23`,
  headers: {
    authorization: '86ef1a8f-339e-4d95-95ed-898b94db20dd',
    'Content-Type': 'application/json'
  }
});
// Берем инфу о юзере с Сервера и рендерим на страницу
api.getUserInfo().then(({name, about, avatar, _id}) => {
  const myId = _id
  elementsUserInfo.name.textContent = name
  elementsUserInfo.about.textContent = about
  elementsUserInfo.avatar.setAttribute('style', `background-image: url("${avatar}")`)
  //Функция создания карточка
  const createNewCard = (element) => {
    const newCard = new Card(
      cardsTemplate,
      {myId, ...element},
      popupPhotoClass,
      //Callback удаления карточки
      function removeCard(cardId){
        popupConfirm.open()
        popupConfirm.setSubmitAction(() => {
          api.removeCard(cardId)
            .then(() => popupConfirm.close())
            .then(() => newCard.remove())
            .catch(err => console.log(err))
        })
        popupConfirm.setEventListeners()
      },
      function putLike(cardId){
        api.putLike(cardId)
          .then((res) =>{
            newCard.querySelector('.cards__likes-counter').textContent = res.likes.length
            newCard.querySelector('.cards__like').classList.toggle('cards__like_status_active')
          })
          .catch(err => console.log(err))
      },
      function removeLike(cardId){
        api.removeLike(cardId)
          .then((res) => {
            newCard.querySelector('.cards__likes-counter').textContent = res.likes.length
            newCard.querySelector('.cards__like').classList.toggle('cards__like_status_active')
          })
          .catch(err => console.log(err))
      }
    ).getCard()
    return newCard
  }
  // Берем с сервера Карточки и рендерим на страницу
  api.getInitialCards().then((data) => {
    renderCards.renderItems({
        items: data,
        renderer: (element) => {
          const newCard = createNewCard(element)
          renderCards.addItem(newCard)
        }
    })
    //экземпляр попапа добавления
    const popupTypeAdd = new PopupWithForm(popupAddCard, inputsValue => {
      const submitText = popupAddCard.querySelector('.popup__submit')
      submitText.textContent = 'Создание...'
      // отправляем на сервер и рендерим
      api.patchAddCard(inputsValue)
        .then((data) => {
          submitText.textContent = 'Создать...'
          renderCards.addItem(createNewCard(data))
          popupTypeAdd.close()
        })
        .catch(e => console.log(e))
    })
    // создаем экземпляр редактор профиля
    const popupTypeEdit = new PopupWithForm(popupEditProfile, inputsValue => {
      const submitText = popupEditProfile.querySelector('.popup__submit')
      submitText.textContent = 'Сохранение...'
      // отправляем на сервер и рендерим
      api.patchProfileInfo(inputsValue)
        .then(data => {
          submitText.textContent = 'Сохранить'
          userInfo.setUserInfo(data)
          popupTypeEdit.close()
        })
        .catch(err => console.log(err))
    })

    const popupTypeRefresh = new PopupWithForm(popupEditAvatar, inputsValue => {
      const submitText = popupEditAvatar.querySelector('.popup__submit')
      submitText.textContent = 'Сохранение...'
      api.refreshAvatar(inputsValue)
        .then((data) => {
          submitText.textContent = 'Сохранить'
          elementsUserInfo.avatar.setAttribute('style', `background-image: url("${data.avatar}")`)
          popupTypeRefresh.close()
        })
        .catch(e => console.log(e))
    })
    const formList = Array.from(popupContainers);
    formList.forEach((formElement) => {
      new FormValidator(selectorsObject, formElement).enableValidation()
    });
    //слушатели
    // Открыть попап добавления карточки
    buttonAddPicture.addEventListener('click', () =>{
      popupTypeAdd.open()
      popupTypeAdd.setEventListeners()
      popupSubmitAddButton.classList.add(selectorsObject.inactiveButtonClass)
      popupSubmitAddButton.setAttribute('disabled', 'disabled')
      clearErrorsAddForm.clearErrors()
    });
    // Открыть  попап редактор профиля
    editProfile.addEventListener('click', () =>{
      popupTypeEdit.open()
      popupTypeEdit.setEventListeners()
      const {name, about} = userInfo.getUserInfo()
      editName.value = name
      editAbout.value = about
      clearErrorsEditForm.clearErrors()
    });

    buttonEditAvatar.addEventListener('click', () => {
      popupTypeRefresh.open()
      popupTypeRefresh.setEventListeners()
      popupSubmitEdit.classList.add(selectorsObject.inactiveButtonClass)
      popupSubmitEdit.setAttribute('disabled', 'disabled')
      clearErrorsEditAvatarForm.clearErrors()
    })
  })
})
