export default class Section {
  constructor ({items, renderer},userId, selector) {
    this._items = items;
    this._renderer = renderer;
    this._userId = userId
    this._container = document.querySelector(selector);
  }
  // функции добавления карточки
  addItemPrepend(element, userId) {
    this._container.prepend(this._renderer(element, userId));
  }
  addItemAppend(element, userId) {
    this._container.append(this._renderer(element, userId));
  }
  // заполенение карточками из массива c сервера
  renderItems() {
    this._items.forEach((item) => {this.addItemAppend(item, this._userId)})
  }
}