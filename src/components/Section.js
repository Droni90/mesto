export default class Section{
  constructor(containerSelector) {
    this._containerSelector = containerSelector;
  }
  renderItems({items, renderer}){
    items.forEach(item => {
        renderer(item)
    })
  }
  addItem(element){
    this._containerSelector.prepend(element)
  }

}
