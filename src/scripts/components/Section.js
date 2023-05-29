export default class Section {
  constructor ({items, renderer},userId, selector) {
    this._items = items;
    this._renderer = renderer;
    this._userId = userId
    this._container = document.querySelector(selector);
  }
  // функции добавления карточек
  renderItems(data, userId, method) {
    if(method === "append") {
      this._items.forEach((item) => {this._container.append(this._renderer(item, userId))})}
    else {
      this._container.prepend(this._renderer(data, userId))}
  }

}