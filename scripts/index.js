import { FormValidator } from "./FormValidator.js";
import { Card } from "../components/card.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopUpWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";

// Instancias de Popup
const editProfilePopup = new Popup(".pop-up");
const newCardPopup = new Popup(".card-popup");
const imagePopupInstance = new PopupWithImage(".image-popup");

// Selección de elementos del DOM Pop Up
const form = document.querySelector(".pop-up__form");
const inputName = document.querySelector(".pop-up__input-name");
const inputAbout = document.querySelector(".pop-up__input-about");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__roll");
const editButton = document.querySelector(".profile__edit-button");
const photoGrid = document.querySelector("#photo-grid");

// Selección de elementos del DOM para el popup de nueva card
const cardForm = document.querySelector(".card-popup__form");
const cardInputTitle = document.querySelector(".card-popup__place-title");
const cardInputUrl = document.querySelector(".card-popup__img-Url");
const openCardPopupButton = document.querySelector(".profile__add-button");

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

// Función que crea y retorna el elemento de cada card
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", (data) => {
    // Esta función se ejecuta cuando se hace clic en la imagen de la card
    imagePopupInstance.open({ src: data.link, alt: data.name });
  });
  return card.getCard();
}

// Usa la clase Section para renderizar las cards iniciales
const cardSection = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  "#photo-grid"
);

// Renderizar todas las cards iniciales
cardSection.renderItems();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__roll",
});

// Evento para editar perfil
form.addEventListener("submit", function (event) {
  event.preventDefault();
  userInfo.setUserInfo({
    name: inputName.value,
    job: inputAbout.value,
  });
  editProfilePopup.close();
});

// Abrir el popup de perfil
editButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  inputName.value = currentUserInfo.name;
  inputAbout.value = currentUserInfo.job;
  editProfilePopup.open();
});

//Abrir el popup de place//
openCardPopupButton.addEventListener("click", () => {
  newCardPopup.open();
});

// Evento para enviar el formulario de nuevo place
cardForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const newCard = {
    name: cardInputTitle.value,
    link: cardInputUrl.value,
  };

  const newCardElement = createCard(newCard);
  cardSection.addItem(newCardElement); // Usar el método addItem de Section

  cardForm.reset();
  newCardPopup.close();
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
