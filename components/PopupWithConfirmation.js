import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector(
      ".delete-popup__button_type_confirm"
    );
    this._cancelButton = this._popup.querySelector(
      ".delete-popup__button_type_cancel"
    );
    this._onConfirm = null;
  }

  setConfirmAction(callback) {
    this._onConfirm = callback;
  }

  open() {
    super.open();
    if (this._confirmButton) {
      this._confirmButton.addEventListener("click", () => {
        if (this._onConfirm) {
          this._onConfirm();
        }
        this.close();
      });
    }
  }

  close() {
    super.close();
    // Remover listeners para evitar duplicados
    if (this._confirmButton) {
      this._confirmButton.removeEventListener("click", null);
    }
  }
}
