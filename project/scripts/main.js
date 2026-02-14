const burger = document.getElementById("burger-menu");
const navLinks = document.querySelector(".nav-links");

if (burger) {
  burger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const isOpen = navLinks.classList.contains("active");
    burger.setAttribute("aria-expanded", isOpen);
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (e) => {
    if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("active");
      burger.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      navLinks.classList.remove("active");
      burger.setAttribute("aria-expanded", "false");
    }
  });
}

const gallery = document.getElementById("gallery");
const tooltip = document.getElementById("tooltip");

async function getProducts() {
  const response = await fetch("../data/members.json");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return await response.json();
}

function renderGallery(products) {
  if (!gallery) return;

  gallery.innerHTML = "";

  const sorted = products.sort((a, b) => b.size - a.size);

  sorted.forEach(product => {
    const figure = document.createElement("figure");
    figure.classList.add("gallery-item");

    const availability = product.available ? "Available" : "Coming Soon";

    figure.innerHTML = `
      <img src="${product.imageUrl}" alt="${product.name}" loading="lazy">
      <figcaption>${product.name}</figcaption>
    `;

    figure.addEventListener("mouseenter", () => {
      tooltip.style.display = "block";
      tooltip.innerHTML = `
        <strong>${product.name}</strong><br>
        ${product.description}<br>
        <em>Size:</em> ${product.size} cm<br>
        <em>Models:</em> ${product.models}<br>
        <span style="color:${product.available ? "lightgreen" : "tomato"};">
          ${availability}
        </span>
      `;
    });

    figure.addEventListener("mousemove", (e) => {
      tooltip.style.top = `${e.pageY + 15}px`;
      tooltip.style.left = `${e.pageX + 15}px`;
    });

    figure.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });

    gallery.appendChild(figure);
  });
}

function saveVisitTime() {
  const now = new Date().toLocaleString();
  localStorage.setItem("lastVisit", now);
}

function showLastVisit() {
  const lastVisit = localStorage.getItem("lastVisit");
  if (lastVisit) {
    console.log(`Last visit: ${lastVisit}`);
  } else {
    console.log("Welcome! First visit.");
  }
}

async function initialize() {
  try {
    const products = await getProducts();
    const filtered = products.filter(p => p.name && p.imageUrl);
    renderGallery(filtered);
  } catch (error) {
    console.error("Error loading products:", error);
  }

  showLastVisit();
  saveVisitTime();
}

document.addEventListener("DOMContentLoaded", initialize);
