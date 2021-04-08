import Card from './card.js'
import FormValidator from "./validate.js";

// открыть попап
const openPopup = (popup) => {
  popup.classList.add('popup_status_opened');
  popup.addEventListener('mousedown',listenClosePopupClickAround)
  document.addEventListener('keydown',closePopupByEsc)
  popupSubmitAddButton.classList.add(selectorsObject.inactiveButtonClass);
  popupSubmitAddButton.setAttribute('disabled', 'disabled');
}

// функция закрытия по клику вокруг попапу
const listenClosePopupClickAround = (evt) => {
  if (evt.target.classList.contains('popup_status_opened')) {
    closePopup(evt.target);
  }
}
// функция закрытия попапа на Еск
const closePopupByEsc = (evt) => {
  const openedPopup = document.querySelector('.popup_status_opened');
  if(evt.key === 'Escape') closePopup(openedPopup)
}

// закрыть попап
const closePopup = (popup) => {
  popup.classList.remove('popup_status_opened');
  popup.removeEventListener('mousedown',listenClosePopupClickAround)
  document.removeEventListener('keydown',closePopupByEsc)
  deleteErrorsAfterClose(popup)
  formPopupAdd.reset()
}

// Сохранить профиль пользователя
function submitEditProfile(evt){
  evt.preventDefault();
  profileName.textContent = editName.value;
  profileAbout.textContent = editAbout.value;
  closePopup(popupEditProfile);
}

// Добавить картинку
function submitAddPicture(evt){
  evt.preventDefault();
  const newObj = {};
  newObj.name = pictureName.value;
  newObj.link = pictureLink.value;
  cardsItem.prepend(new Card(cardsTemplate, newObj, openPopup, closePopup).getCard())
  closePopup(popupAddCard);
  formPopupAdd.reset()
}

//начальные карточки
initialCards.forEach(item => {
  cardsItem.prepend(new Card(cardsTemplate, item, openPopup, closePopup).getCard())
})

// снятие ошибок при закрытии
const deleteErrorsAfterClose = (popup) => {
  const errorsSpan = popup.querySelectorAll('.popup__input-error_active')
  const errorsInput = popup.querySelectorAll('.popup__input_type_error')
  errorsSpan.forEach((el) => el.textContent = '')
  errorsInput.forEach((el) => el.classList.remove('popup__input_type_error'))
}

//валидация по формам
const formList = Array.from(popupContainers);
formList.forEach((formElement) => {
  new FormValidator(selectorsObject, formElement).enableValidation()
});

                            //Слушатели
// Открыть / закрыть попап редактор профиля
editProfile.addEventListener('click', function (){
  openPopup(popupEditProfile);
  editName.value = profileName.textContent;
  editAbout.value = profileAbout.textContent;
});
closeEditProfilePopupBtn.addEventListener('click', function (){
  closePopup(popupEditProfile);
});
// Открыть / закрыть попап добавление картинок
buttonAddPicture.addEventListener('click', function (){
  openPopup(popupAddCard)
});
closeAddCardPopupBtn.addEventListener('click', function (){
  closePopup(popupAddCard)
});

//сабмит редактора профиля
formEditProfile.addEventListener('submit', submitEditProfile);

//сабмит добавить картинку
formPopupAdd.addEventListener('submit', submitAddPicture);


