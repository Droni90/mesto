import './index.css';
import 'regenerator-runtime/runtime'
import {formEditProfile, formEditAvatar, popupImg, popupPhotoText, buttonEditAvatar, popupSubmitEdit, popupEditAvatar, formAddProfile, popupTypeConfirm, elementsUserInfo, editName,editAbout, popupPhoto, popupAddCard, popupEditProfile, cardsItem, cardsTemplate, popupContainers, selectorsObject, editProfile, buttonAddPicture, popupSubmitAddButton} from '../utils/constants.js';
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import Card from '../components/Card.js'
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";
import PopupConfirm from "../components/PopupConfirm";
const popupConfirm = new PopupConfirm(popupTypeConfirm)
popupConfirm.setEventListeners()
const clearErrorsEditForm = new FormValidator(selectorsObject, formEditProfile)
const clearErrorsAddForm = new FormValidator(selectorsObject, formAddProfile)
const clearErrorsEditAvatarForm = new FormValidator(selectorsObject, formEditAvatar)
const userInfo = new UserInfo(elementsUserInfo)
const popupPhotoClass = new PopupWithImage(popupPhoto, popupImg, popupPhotoText)
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
  userInfo.setUserInfo({name, about})
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
        items: data.reverse(),
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
    popupTypeAdd.setEventListeners()
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
    popupTypeEdit.setEventListeners()
    // Обнорвляем аватар
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
    popupTypeRefresh.setEventListeners()
    //Валидация форм
    clearErrorsEditForm.enableValidation()
    clearErrorsAddForm.enableValidation()
    clearErrorsEditAvatarForm.enableValidation()
    //слушатели
    // Открыть попап добавления карточки
    buttonAddPicture.addEventListener('click', () =>{
      popupTypeAdd.open()
      clearErrorsAddForm.disablePopupSubmit(popupSubmitAddButton)
      clearErrorsAddForm.clearErrors()
    });
    // Открыть  попап редактор профиля
    editProfile.addEventListener('click', () =>{
      popupTypeEdit.open()
      const {name, about} = userInfo.getUserInfo()
      editName.value = name
      editAbout.value = about
      clearErrorsEditForm.clearErrors()
    });
    // Кнопка редактирования аватарки
    buttonEditAvatar.addEventListener('click', () => {
      popupTypeRefresh.open()
      clearErrorsEditAvatarForm.disablePopupSubmit(popupSubmitEdit)
      clearErrorsEditAvatarForm.clearErrors()
    })
  })
})
// P.S. Я не проигнорировал пару замечаний Можно Лучше. просто Пока не совсем их понял) обязательно с этим разбирусь, спасибо )
