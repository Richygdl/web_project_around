export class Card {
  constructor(
    { name = "", link = "" } = {},
    template = "#card-template",
    handleCardClick
  ) {
    this._name = name;
    this._link = link;
    this._template = template;
    this._handleCardClick = handleCardClick; // Guardar la función para abrir el popup

    this._element = this._cloneTemplate();

    this._onTrashClick = () => this._handleTrashClick();
    this._onLikeClick = (evt) => this._handleLikeClick(evt);
    this._onImageClick = () => this._handleImageClick(); // Nuevo listener para la imagen

    this._setContent();
    this._setEventListeners();
  }

  _cloneTemplate() {
    const tpl = document.querySelector(this._template);
    if (tpl?.content?.firstElementChild) {
      return tpl.content.firstElementChild.cloneNode(true);
    }

    return Card;
  }

  _setContent() {
    const img = this._element.querySelector(".photo-grid__image");
    if (img) {
      img.src = this._link;
      img.alt = this._name;
    }
    const text = this._element.querySelector(".photo-grid__text");
    if (text) text.textContent = this._name;
  }

  _setEventListeners() {
    const trash = this._element.querySelector(".photo-grid__trash");
    const heart = this._element.querySelector(".photo-grid__heart");
    const image = this._element.querySelector(".photo-grid__image");

    if (trash) trash.addEventListener("click", this._onTrashClick);
    if (heart) heart.addEventListener("click", this._onLikeClick);
    if (image) image.addEventListener("click", this._onImageClick); // Listener para la imagen
  }

  _handleTrashClick() {
    const trash = this._element.querySelector(".photo-grid__trash");
    const heart = this._element.querySelector(".photo-grid__heart");
    if (trash) trash.removeEventListener("click", this._onTrashClick);
    if (heart) heart.removeEventListener("click", this._onLikeClick);
    this._element.remove();
  }

  _handleLikeClick(evt) {
    const el = evt.currentTarget;
    el.classList.toggle("liked");
    el.textContent = el.classList.contains("liked") ? "♥" : "♡";
  }

  // Método que llama a la función handleCardClick pasada desde fuera
  _handleImageClick() {
    this._handleCardClick({ name: this._name, link: this._link });
  }

  // método público: devuelve el nodo listo
  getCard() {
    return this._element;
  }
}
