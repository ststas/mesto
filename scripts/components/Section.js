export default class Section {
  constructor ({items, renderer}, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  // добавляем карточку
  addItem(element) {
    this._container.prepend(this._renderer(element));
  }
  // заполенение карточками из массива
  renderItemsfromArray() {
    this._items.forEach((item) => {this.addItem(item)})
  }
}