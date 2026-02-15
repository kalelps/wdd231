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

// ===========================
// ASYNC FUNCTION (Asynchronous Data Fetch)
// ===========================
async function getProducts() {
  const response = await fetch("data/products.json"); // Await pauses execution until data loads
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return await response.json(); // Returns parsed JSON data
}

function renderGallery(products) {
  if (!gallery) return;

  gallery.innerHTML = "";

  // ===========================
  // ARRAY METHOD: sort()
  // ===========================
  const sorted = products.sort((a, b) => b.size - a.size); 
  // Sorts products by size (largest to smallest)

  sorted.forEach(product => {

    // ===========================
    // DOM MANIPULATION
    // ===========================
    const figure = document.createElement("figure"); // Create new HTML element
    figure.classList.add("gallery-item");

    const availability = product.available ? "Available" : "Coming Soon";

    // ===========================
    // TEMPLATE LITERALS
    // ===========================
    figure.innerHTML = `
      <img src="${product.imageUrl}" alt="${product.name}" loading="lazy">
      <figcaption>${product.name}</figcaption>
    `;
    // Uses ${} to dynamically insert data into HTML

    figure.addEventListener("mouseenter", () => {
      tooltip.style.display = "block";

      // TEMPLATE LITERALS again
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

    // ===========================
    // DOM MANIPULATION
    // ===========================
    gallery.appendChild(figure); 
    // Adds dynamically created element to the page
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

// ===========================
// TRY / CATCH BLOCK
// ===========================
async function initialize() {
  try {
    // ARRAY METHOD: filter()
    const products = await getProducts();
    const filtered = products.filter(p => p.name && p.imageUrl);
    // Filters out invalid products

    renderGallery(filtered);

  } catch (error) {
    // Catches errors if fetch fails
    console.error("Error loading products:", error);
  }

  showLastVisit();
  saveVisitTime();
}

document.addEventListener("DOMContentLoaded", initialize);
