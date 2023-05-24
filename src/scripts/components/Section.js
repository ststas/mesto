export default class Section {
  constructor ({items, renderer}, selector, method) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
    this._method = method
  }

  // добавляние карточки
  addItem(element, method) {
    if(method === 'prepend') {
      this._container.prepend(this._renderer(element));
    } else {
      this._container.append(this._renderer(element));
    }
}
  // рендер карточки
  renderItem() {
    this._items.forEach((item) => {this.addItem(item, this._method)})
  }
}