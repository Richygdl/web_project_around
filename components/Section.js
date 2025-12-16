export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      const element = this._renderer(item);
      this._container.append(element);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }

  // Método para establecer nuevos items y renderizar
  setItems(items) {
    this._items = items;
    this._container.innerHTML = ""; // Limpiar el contenedor
    this.renderItems(); // Renderizar los nuevos items
  }
}
