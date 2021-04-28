export default class Section{
  // constructor({items, renderer}, containerSelector) {
  //   this._items = items;
  //   this._renderer = renderer;
  //   this._containerSelector = containerSelector;
  // }
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
