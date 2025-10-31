import { FormValidator } from "./FormValidator.js";
import { Card } from "./card.js";
import { openDialog, closeDialog, attachDialogHandlers } from "./utils.js";

// Selección de elementos del DOM Pop Up
const form = document.querySelector(".pop-up__form");
const inputName = document.querySelector(".pop-up__input-name");
const inputAbout = document.querySelector(".pop-up__input-about");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__roll");
const popupEdit = document.querySelector(".pop-up");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".pop-up__button-close");
const photoGrid = document.querySelector("#photo-grid");

// Selección de elementos del DOM para el popup de nueva card
const cardPopup = document.querySelector(".card-popup");
const cardForm = document.querySelector(".card-popup__form");
const cardInputTitle = document.querySelector(".card-popup__place-title");
const cardInputUrl = document.querySelector(".card-popup__img-Url");
const openCardPopupButton = document.querySelector(".profile__add-button");
const closeCardPopupButton = document.querySelector(
  ".card-popup__button-close"
);

// Selección de elementos del DOM para el popup de imagen
const imagePopup = document.querySelector(".image-popup");
const imagePopupImage = document.querySelector(".image-popup__image");
const imagePopupCaption = document.querySelector(".image-popup__caption");
const imagePopupClose = document.querySelector(".image-popup__button-close");

// Datos iniciales de las cards
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

// // Renderizar las cards iniciales
initialCards.forEach((card) => {
  const node = new Card(card, "#card-template").getCard();
  photoGrid.insertAdjacentElement("beforeend", node); // evita appendChild
});

// Función para abrir el popup de imagen
function openImagePopup(src, alt) {
  openDialog(imagePopup, {
    src,
    alt,
    imageEl: imagePopupImage,
    captionEl: imagePopupCaption,
  });
}

// registrar handlers para dialog imagen
attachDialogHandlers(document.querySelector(".image-popup"), {
  closeButton: document.querySelector(".image-popup__button-close"),
  imageWrapperSelector: ".image-popup__image-wrapper",
});

// registrar handlers para dialog de perfil
attachDialogHandlers(popupEdit, {
  closeButton: closeButton,
});

// registrar handlers para dialog de nueva card
attachDialogHandlers(cardPopup, {
  closeButton: closeCardPopupButton,
});

// Delegación de eventos para abrir el popup al hacer click en una imagen de card
photoGrid.addEventListener("click", (e) => {
  if (e.target.classList.contains("photo-grid__image")) {
    const cardElement = e.target.closest(".photo-grid__card");
    const cardTitle =
      cardElement.querySelector(".photo-grid__text").textContent;
    openImagePopup(e.target.src, cardTitle);
  }
});
// Evento para editar perfil
form.addEventListener("submit", function (event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closeDialog(popupEdit);
});
// Abrir y cerrar el popup
editButton.addEventListener("click", () => {
  popupEdit.showModal();
});

//Card//
openCardPopupButton.addEventListener("click", () => {
  cardPopup.showModal();
});

// Evento para enviar el formulario de nueva card
cardForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const newCard = {
    name: cardInputTitle.value,
    link: cardInputUrl.value,
  };

  const newNode = new Card(newCard, "#card-template").getCard();
  photoGrid.insertAdjacentElement("afterbegin", newNode); // evita prepend/appendChild

  cardForm.reset();
  closeDialog(cardPopup);
});

// Configuración de validación
const validationConfig = {
  inputSelector:
    ".pop-up__input-name, .pop-up__input-about, .card-popup__place-title, .card-popup__img-Url",
  submitButtonSelector: ".pop-up__button-save, .card-popup__button-save",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Crear instancia de FormValidator para el formulario de perfil
const profileFormValidator = new FormValidator(validationConfig, form);
profileFormValidator.enableValidation();

// Crear instancia de FormValidator para el formulario de nueva card
const cardFormValidator = new FormValidator(validationConfig, cardForm);
cardFormValidator.enableValidation();
