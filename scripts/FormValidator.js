export class FormValidator {
  constructor(config, formElement) {
    // Guardar la configuración y el formulario
    this._config = config;
    this._formElement = formElement;

    // Obtener la lista de inputs y el botón submit
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  // Método privado: mostrar error en un input
  _showInputError(input, errorMessage) {
    const errorElement = document.querySelector(`#error-${input.name}`);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = errorMessage;
    input.classList.add(this._config.inputErrorClass);
  }

  // Método privado: ocultar error en un input
  _hideInputError(input) {
    const errorElement = document.querySelector(`#error-${input.name}`);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
    input.classList.remove(this._config.inputErrorClass);
  }

  // Método privado: verificar validez de un input
  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input, input.validationMessage);
    }
  }

  // Método privado: alternar estado del botón submit
  _toggleButtonState() {
    const hasInvalidInput = this._inputList.some(
      (input) => !input.validity.valid
    );

    if (hasInvalidInput) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  }

  // Método privado: configurar event listeners
  _setEventListeners() {
    // Establecer estado inicial del botón
    this._toggleButtonState();

    // Agregar listener a cada input
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });

    // Prevenir envío por defecto del formulario
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  }

  // Método público: activar la validación
  enableValidation() {
    this._setEventListeners();
  }
}
