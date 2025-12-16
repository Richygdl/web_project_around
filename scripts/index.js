import { FormValidator } from "./FormValidator.js";
import { Card } from "../components/card.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopUpWithImage.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { api } from "../components/Api.js";

// Instancias de Popup
const editProfilePopup = new Popup(".pop-up");
const newCardPopup = new Popup(".card-popup");
const avatarPopup = new Popup(".avatar-popup");
const imagePopupInstance = new PopupWithImage(".image-popup");
const deleteConfirmPopup = new PopupWithConfirmation(".delete-popup");

// Selección de elementos del DOM Pop Up
const form = document.querySelector(".pop-up__form");
const inputName = document.querySelector(".pop-up__input-name");
const inputAbout = document.querySelector(".pop-up__input-about");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__roll");
const editButton = document.querySelector(".profile__edit-button");
const photoGrid = document.querySelector("#photo-grid");
const profileImageWrapper = document.querySelector(".profile__image-wrapper");
const profileImage = document.querySelector(".profile__image");
const avatarForm = document.querySelector(".avatar-popup__form");
const avatarInput = document.querySelector(".avatar-popup__input-avatar");

// Selección de elementos del DOM para el popup de nueva card
const cardForm = document.querySelector(".card-popup__form");
const cardInputTitle = document.querySelector(".card-popup__place-title");
const cardInputUrl = document.querySelector(".card-popup__img-Url");
const openCardPopupButton = document.querySelector(".profile__add-button");

// Selección de botones submit
const profileSubmitButton = form.querySelector(".pop-up__button-save");
const avatarSubmitButton = avatarForm.querySelector(
  ".avatar-popup__button-save"
);
const cardSubmitButton = cardForm.querySelector(".card-popup__button-save");

// Funciones helper para manejar estado de carga
function setButtonLoading(button, isLoading) {
  if (isLoading) {
    button.textContent = "Guardando...";
    button.disabled = true;
  } else {
    button.textContent = "Guardar";
    button.disabled = false;
  }
}

// Función que crea y retorna el elemento de cada card
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    (data) => {
      // Esta función se ejecuta cuando se hace clic en la imagen de la card
      imagePopupInstance.open({ src: data.link, alt: data.name });
    },
    (cardId, isLiked) => {
      // Esta función se ejecuta cuando se hace clic en el corazón
      if (isLiked) {
        // Si ya está likeado, deslikear
        api
          .unlikeCard(cardId)
          .then((updatedCard) => {
            card.updateLikeState(updatedCard.isLiked);
          })
          .catch((error) => {
            console.error("Error al deslikear tarjeta:", error);
          });
      } else {
        // Si no está likeado, likear
        api
          .likeCard(cardId)
          .then((updatedCard) => {
            card.updateLikeState(updatedCard.isLiked);
          })
          .catch((error) => {
            console.error("Error al likear tarjeta:", error);
          });
      }
    },
    (cardId, cardElement) => {
      // Esta función se ejecuta cuando se hace clic en la papelera
      deleteConfirmPopup.setConfirmAction(() => {
        api
          .deleteCard(cardId)
          .then(() => {
            cardElement.remove(); // Eliminar el elemento del DOM
          })
          .catch((error) => {
            console.error("Error al eliminar tarjeta:", error);
          });
      });
      deleteConfirmPopup.open();
    }
  );
  return card.getCard();
}

// Usa la clase Section para renderizar las cards
const cardSection = new Section(
  {
    items: [],
    renderer: createCard,
  },
  "#photo-grid"
);

// Instancia de UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__roll",
});

// Llamada a la API usando Promise.all() para cargar usuario y tarjetas simultáneamente
api
  .getInitialData()
  .then(([userData, cardsData]) => {
    // Renderizar información del usuario
    profileName.textContent = userData.name;
    profileAbout.textContent = userData.about;
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
    });

    // Renderizar tarjetas después de obtener información del usuario
    cardSection.setItems(cardsData);
  })
  .catch((error) => {
    console.error("Error al cargar datos iniciales:", error);
  });

// Evento para editar perfil
form.addEventListener("submit", function (event) {
  event.preventDefault();
  setButtonLoading(profileSubmitButton, true);

  api
    .editUserInfo({
      name: inputName.value,
      about: inputAbout.value,
    })
    .then((data) => {
      userInfo.setUserInfo({
        name: data.name,
        job: data.about,
      });
      editProfilePopup.close();
    })
    .catch((error) => {
      console.error("Error al editar perfil:", error);
    })
    .finally(() => {
      setButtonLoading(profileSubmitButton, false);
    });
});

// Abrir el popup de perfil
editButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  inputName.value = currentUserInfo.name;
  inputAbout.value = currentUserInfo.job;
  editProfilePopup.open();
});

//Imagen de perfil
profileImageWrapper.addEventListener("click", () => {
  avatarPopup.open();
});

avatarForm.addEventListener("submit", function (event) {
  event.preventDefault();
  setButtonLoading(avatarSubmitButton, true);

  const newAvatarUrl = avatarInput.value;

  api
    .updateAvatar(newAvatarUrl)
    .then((data) => {
      profileImage.src = data.avatar; // Actualizar la foto
      avatarForm.reset();
      avatarPopup.close();
    })
    .catch((error) => {
      console.error("Error al actualizar avatar:", error);
    })
    .finally(() => {
      setButtonLoading(avatarSubmitButton, false);
    });
});

//Abrir el popup de place//
openCardPopupButton.addEventListener("click", () => {
  newCardPopup.open();
});

// Evento para enviar el formulario de nuevo place
cardForm.addEventListener("submit", function (event) {
  event.preventDefault();
  setButtonLoading(cardSubmitButton, true);

  const newCard = {
    name: cardInputTitle.value,
    link: cardInputUrl.value,
  };

  // Enviar la nueva tarjeta a la API
  api
    .addNewCard(newCard)
    .then((cardData) => {
      // Crear el elemento con los datos devueltos por la API
      const newCardElement = createCard(cardData);
      cardSection.addItem(newCardElement);

      cardForm.reset();
      newCardPopup.close();
    })
    .catch((error) => {
      console.error("Error al agregar la tarjeta:", error);
    })
    .finally(() => {
      setButtonLoading(cardSubmitButton, false);
    });
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
