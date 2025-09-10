// Selección de elementos del DOM
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
const imagePopupContent = document.querySelector(".image-popup__content");
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

// Función para crear una card
function createCard(card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("photo-grid__card");

  const imageElement = document.createElement("img");
  imageElement.src = card.link;
  imageElement.alt = card.name;
  imageElement.classList.add("photo-grid__image");

  const textElement = document.createElement("p");
  textElement.classList.add("photo-grid__text");
  textElement.textContent = card.name;

  // Ícono de eliminar (trash)
  const trashIcon = document.createElement("img");
  trashIcon.src = "images/Trash.png";
  trashIcon.alt = "Eliminar";
  trashIcon.classList.add("photo-grid__trash");
  trashIcon.style.cursor = "pointer";
  trashIcon.addEventListener("click", () => {
    cardElement.remove();
  });

  const heartElement = document.createElement("span");
  heartElement.classList.add("photo-grid__heart");
  heartElement.textContent = "♡";
  heartElement.addEventListener("click", () => {
    heartElement.classList.toggle("liked");
    heartElement.textContent = heartElement.classList.contains("liked")
      ? "♥"
      : "♡";
  });

  cardElement.appendChild(imageElement);
  cardElement.appendChild(textElement);
  cardElement.appendChild(trashIcon); // Agrega el ícono de eliminar aquí
  cardElement.appendChild(heartElement);

  return cardElement;
}
// Renderizar las cards iniciales
initialCards.forEach((card) => {
  photoGrid.appendChild(createCard(card));
});

// Función para abrir el popup de imagen
function openImagePopup(src, alt) {
  imagePopupImage.src = src;
  imagePopupImage.alt = alt;
  imagePopupCaption.textContent = alt;
  imagePopup.classList.add("active");
}

// Evento para cerrar el popup de imagen
imagePopupClose.addEventListener("click", () => {
  imagePopup.classList.remove("active");
  imagePopupImage.src = "";
  imagePopupImage.alt = "";
  imagePopupCaption.textContent = "";
});

// Cerrar popup al hacer click fuera del contenido
imagePopup.addEventListener("click", (e) => {
  if (e.target === imagePopup) {
    imagePopup.classList.remove("active");
    imagePopupImage.src = "";
    imagePopupImage.alt = "";
    imagePopupCaption.textContent = "";
  }
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
  popupEdit.classList.remove("active");
});

// Abrir y cerrar el popup
editButton.addEventListener("click", () => {
  popupEdit.classList.add("active");
});
closeButton.addEventListener("click", () => {
  popupEdit.classList.remove("active");
});

//Card//
openCardPopupButton.addEventListener("click", () => {
  cardPopup.classList.add("active");
});

closeCardPopupButton.addEventListener("click", () => {
  cardPopup.classList.remove("active");
});

// Evento para enviar el formulario de nueva card
cardForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Crear la nueva card con los valores del formulario
  const newCard = {
    name: cardInputTitle.value,
    link: cardInputUrl.value,
  };
  photoGrid.prepend(createCard(newCard)); // Agrega la nueva card al inicio

  // Limpiar el formulario y cerrar el popup
  cardForm.reset();
  cardPopup.classList.remove("active");
});
