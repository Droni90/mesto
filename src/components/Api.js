export default class Api {
  constructor(options) {
    this._options = options
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-23/cards', this._options)
      .then(res => res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`)
      )
  }

  getUserInfo() {
      return fetch('https://mesto.nomoreparties.co/v1/cohort-23/users/me', this._options)
        .then(res => res.ok
          ? res.json()
          : Promise.reject(`Ошибка: ${res.status}`)
        )
  }
  //
  patchProfileInfo(inputsValue) {
    const newOptions = {
      ...this._options,
      body: JSON.stringify(inputsValue),
      method: 'PATCH',
    }
    return fetch('https://mesto.nomoreparties.co/v1/cohort-23/users/me', newOptions)
      .then(res => res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`)
      )
  }
  // Отправляет информацию о пользователе на сервер
  patchAddCard(inputsValue) {
    const newOptions = {
      ...this._options,
      body: JSON.stringify(inputsValue),
      method:'POST',
    }
    return fetch('https://mesto.nomoreparties.co/v1/cohort-23/cards', newOptions)
      .then(res => res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`)
      )
  }

  removeCard(cardId) {
    const newOptions = {
      ...this._options,
      method:'DELETE',
    }
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-23/cards/${cardId}`, newOptions)
      .then(res => res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`)
      )
  }

  putLike(cardId) {
    const newOptions = {
      ...this._options,
      method:'PUT',
    }
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-23/cards/likes/${cardId}`, newOptions)
      .then(res => res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`)
      )
  }

  removeLike(cardId) {
    const newOptions = {
      ...this._options,
      method:'DELETE',
    }
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-23/cards/likes/${cardId}`, newOptions)
      .then(res => res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`)
      )
  }

  refreshAvatar(inputsValue) {
    const newOptions = {
      ...this._options,
      body: JSON.stringify(inputsValue),
      method: 'PATCH',
    }
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-23/users/me/avatar`, newOptions)
      .then(res => res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`)
      )
  }
}
