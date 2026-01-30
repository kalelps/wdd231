// ---------- TIMESTAMP ----------
const timestampField = document.querySelector("#timestamp");

if (timestampField) {
  const now = new Date();
  timestampField.value = now.toISOString();
}

// ---------- MODALS ----------
const modalLinks = document.querySelectorAll("[data-modal]");
const closeButtons = document.querySelectorAll(".close-modal");

modalLinks.forEach(link => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const modalId = link.getAttribute("data-modal");
    const modal = document.getElementById(modalId);

    if (modal) {
      modal.showModal();
    }
  });
});

closeButtons.forEach(button => {
  button.addEventListener("click", () => {
    button.closest("dialog").close();
  });
});

// ---------- ESC KEY CLOSE ----------
document.querySelectorAll("dialog").forEach(dialog => {
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      dialog.close();
    }
  });
});

// ----- HAMBURGER MENU -----
const menuButton = document.querySelector("#menu");
const nav = document.querySelector("nav");

menuButton.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuButton.classList.toggle("open");
});