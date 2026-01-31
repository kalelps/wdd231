// ----- THANK YOU PAGE SCRIPT -----

// Get URL parameters
const params = new URLSearchParams(window.location.search);

// Helper function
function getParam(name) {
  return params.get(name) || "N/A";
}

// Populate fields
document.getElementById("firstName").textContent = getParam("fname");
document.getElementById("lastName").textContent = getParam("lname");
document.getElementById("email").textContent = getParam("email");
document.getElementById("phone").textContent = getParam("phone");
document.getElementById("business").textContent = getParam("business");

// Format timestamp nicely
const rawTimestamp = getParam("timestamp");
if (rawTimestamp !== "N/A") {
  const date = new Date(rawTimestamp);
  document.getElementById("timestamp").textContent =
    date.toLocaleString();
} else {
  document.getElementById("timestamp").textContent = "N/A";
}

// ----- HAMBURGER MENU -----
const menuButton = document.querySelector("#menu");
const nav = document.querySelector("nav");

menuButton.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuButton.classList.toggle("open");
});