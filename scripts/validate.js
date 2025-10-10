// function that show an error

function showInputError(input, errorMessage, config) {
  const errorElement = document.querySelector(`#error-${input.name}`);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = errorMessage;
  input.classList.add(config.inputErrorClass);
}

//TODO: function that hide an error

function hideInputError(input, config) {
  const errorElement = document.querySelector(`#error-${input.name}`);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
  input.classList.remove(config.inputErrorClass);
}

//TODO: function that validate if we have an error ---> shor or hide an error

function checkInputValidity(input, config) {
  if (input.validity.valid) {
    hideInputError(input, config);
  } else {
    showInputError(input, input.validationMessage, config);
  }
}

//function that validate the whole form

function isFormValid(inputList) {
  return inputList.some((input) => !input.validity.valid);
}

//TODO: function that handle button state (enable or disabled)

function toggleButtonState(inputList, form, config) {
  const buttonElement = form.querySelector(config.submitButtonSelector);
  if (inputList.some((input) => !input.validity.valid)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}
//TODO: function that set event listeners

function setEventListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  toggleButtonState(inputList, form, config);

  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(input, config);
      toggleButtonState(inputList, form, config);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    // Solo envía si todos los campos son válidos (opcional, según tu lógica)
  });
}

export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    setEventListeners(form, config);
  });
}
