export class Popup {
  constructor(popUpSelector) {
    this._popup = document.querySelector(popUpSelector);

    // Cierre por overlay/backdrop
    if (this._popup) {
      this._onOverlayClick = (e) => {
        if (
          e.target === this._popup &&
          typeof this._popup.close === "function"
        ) {
          this._popup.close();
        }
      };
      this._popup.addEventListener("click", this._onOverlayClick);
    }
  }

  open() {
    if (!this._popup) return;
    if (typeof this._popup.showModal === "function") {
      this._popup.showModal();
    }
  }

  close() {
    if (!this._popup) return;
    if (typeof this._popup.close === "function") {
      this._popup.close();
    }
  }
}
