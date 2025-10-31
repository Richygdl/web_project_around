export function openDialog(dialogEl, { src, alt, imageEl, captionEl } = {}) {
  if (!dialogEl) return;

  // Si hay imagen y caption, actualiza antes de abrir
  if (imageEl && typeof src === "string") imageEl.src = src;
  if (imageEl && typeof alt === "string") imageEl.alt = alt;
  if (captionEl && typeof alt === "string") captionEl.textContent = alt;

  // showModal existe en la mayoría de navegadores modernos
  if (typeof dialogEl.showModal === "function") {
    // Forzar cierre por si está abierto
    if (dialogEl.hasAttribute("open")) {
      dialogEl.close();
    }
    dialogEl.showModal();
  } else {
    // Fallback para navegadores sin soporte
    dialogEl.setAttribute("open", "");
    dialogEl.classList.add("active");
  }
}

export function closeDialog(dialogEl, { imageEl, captionEl } = {}) {
  if (!dialogEl) return;
  if (typeof dialogEl.close === "function") {
    dialogEl.close();
  } else {
    dialogEl.classList.remove("active");
  }

  if (imageEl) imageEl.src = "";
  if (imageEl) imageEl.alt = "";
  if (captionEl) captionEl.textContent = "";
}

export function attachDialogHandlers(
  dialogEl,
  { closeButton, imageWrapperSelector } = {}
) {
  if (!dialogEl) return;

  // Cerrar con click fuera del contenido (en el backdrop o en áreas intermedias)
  dialogEl.addEventListener("click", (e) => {
    // Si hay un selector de wrapper, usar closest para detectar si el click fue dentro
    if (imageWrapperSelector) {
      const clickedInside = e.target.closest(imageWrapperSelector);
      if (!clickedInside) {
        if (typeof dialogEl.close === "function") dialogEl.close();
        else dialogEl.classList.remove("active");
      }
    } else {
      // Para otros dialogs sin wrapper específico, verificar si es el currentTarget
      if (e.target === e.currentTarget) {
        if (typeof dialogEl.close === "function") dialogEl.close();
        else dialogEl.classList.remove("active");
      }
    }
  });

  // Cerrar con el botón de close
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      if (typeof dialogEl.close === "function") dialogEl.close();
      else dialogEl.classList.remove("active");
    });
  }
}
