//form CONST//
const form = document.querySelector(".pop-up__edit-form");
const inputName = document.querySelector(".pop-up__edit-input-name");
const inputAbout = document.querySelector(".pop-up__edit-input-about");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__roll");
const popupEdit = document.querySelector(".pop-up__edit");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".pop-up__edit-button-close");
//form events//
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Evita que el formulario recargue la página
  profileName.textContent = inputName.value;
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  profileAbout.textContent = inputAbout.value;
});
form.addEventListener("submit", function (event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  popupEdit.classList.remove("active"); // Cierra el popup
});

editButton.addEventListener("click", () => {
  popupEdit.classList.add("active");
});

closeButton.addEventListener("click", () => {
  popupEdit.classList.remove("active");
});

//like//
const hearts = document.querySelectorAll(".photo-grid__heart");

hearts.forEach((heart) => {
  heart.addEventListener("click", () => {
    heart.classList.toggle("liked");
    heart.textContent = heart.classList.contains("liked") ? "♥" : "♡";
  });
});
