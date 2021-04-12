import {editName, editAbout} from '../utils/constants.js'
export default class UserInfo{
  constructor(data) {
    this._data = data
  }
  getUserInfo(){
    return {
      name: this._data.name.textContent,
      about: this._data.about.textContent
    }
  }
  setUserInfo(){
    this._data.name.textContent = editName.value
    this._data.about.textContent = editAbout.value
  }
}
