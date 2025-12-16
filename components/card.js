export class Card {
  constructor(
    { name = "", link = "", _id = "", isLiked = false } = {},
    template = "#card-template",
    handleCardClick,
    handleLikeClick,
    handleDeleteClick
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._template = template;
    this._handleCardClick = handleCardClick; // Guardar la función para abrir el popup
    this._handleLikeClick = handleLikeClick; // Guardar la función para manejar like
    this._handleDeleteClick = handleDeleteClick; // Guardar la función para eliminar

    this._element = this._cloneTemplate();

    this._onTrashClick = () => this._handleTrashClick();
    this._onLikeClick = (evt) => this._handleLike(evt);
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

    // Actualizar el icono del corazón según isLiked
    const heart = this._element.querySelector(".photo-grid__heart");
    if (heart) {
      if (this._isLiked) {
        heart.classList.add("liked");
        heart.textContent = "♥";
      } else {
        heart.classList.remove("liked");
        heart.textContent = "♡";
      }
    }
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
    // Llamar a la función handleDeleteClick pasada desde fuera (que abrirá el popup de confirmación)
    if (this._handleDeleteClick) {
      this._handleDeleteClick(this._id, this._element);
    }
  }

  _handleLike(evt) {
    const el = evt.currentTarget;
    // Llamar a la función handleLikeClick pasada desde fuera (que llamará a la API)
    this._handleLikeClick(this._id, this._isLiked);
  }

  // Método que llama a la función handleCardClick pasada desde fuera
  _handleImageClick() {
    this._handleCardClick({ name: this._name, link: this._link });
  }

  // Método público para actualizar el estado de like
  updateLikeState(isLiked) {
    this._isLiked = isLiked;
    this._setContent(); // Actualizar el icono del corazón
  }

  // método público: devuelve el nodo listo
  getCard() {
    return this._element;
  }
}
