import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(
    popUpSelector,
    {
      imageSelector = ".image-popup__image",
      captionSelector = ".image-popup__caption",
    } = {}
  ) {
    super(popUpSelector);

    // Busca los elementos dentro del propio dialog
    this._imageEl = this._popup
      ? this._popup.querySelector(imageSelector)
      : null;
    this._captionEl = this._popup
      ? this._popup.querySelector(captionSelector)
      : null;
  }

  // Sobrescribe open para inyectar contenido antes de abrir
  open({ src, alt } = {}) {
    if (!this._popup) return;

    if (this._imageEl) {
      this._imageEl.src = src || "";
      this._imageEl.alt = alt || "";
    }
    if (this._captionEl) {
      this._captionEl.textContent = alt || "";
    }

    super.open();
  }

  close() {
    super.close();
    if (this._imageEl) {
      this._imageEl.src = "";
      this._imageEl.alt = "";
    }
    if (this._captionEl) this._captionEl.textContent = "";
  }
}
