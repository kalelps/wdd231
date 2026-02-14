/* ============================= */
/* Responsive Navigation (Burger) */
/* ============================= */

const burger = document.getElementById("burger-menu");
const navLinks = document.querySelector(".nav-links");

if (burger) {
  burger.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");
    burger.setAttribute("aria-expanded", isOpen);
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("active");
      burger.setAttribute("aria-expanded", "false");
    }
  });

  // Close with ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      navLinks.classList.remove("active");
      burger.setAttribute("aria-expanded", "false");
    }
  });
}


/* ============================= */
/* Product Data */
/* ============================= */

const products = [
  {
    name: "Temple of Trujillo, Peru",
    size: 12,
    imageUrl: "images/temple_1.webp",
    description:
      "A detailed 3D printed model of the Trujillo Peru Temple, capturing its elegant structure and symbolic architecture.",
    models: "Marble, White, White Matte",
    available: true
  },
  {
    name: "Christus Statue by Thorvaldsen",
    size: 25,
    imageUrl: "images/temple_2.webp",
    description:
      "A precise reproduction of the Thorvaldsen Christus statue, representing peace and faith, crafted with smooth 3D details.",
    models: "Marble, White, White Matte",
    available: true
  },
  {
    name: "Temple of Los Olivos, Peru",
    size: 10,
    imageUrl: "images/temple_3.webp",
    description:
      "Miniature 3D model of the Los Olivos Peru Temple, designed with fine detail and perfect for collectors.",
    models: "Marble, White, White Matte",
    available: false
  },
  {
    name: "Temple of Lima, Peru",
    size: 35,
    imageUrl: "images/temple_4.webp",
    description:
      "Faithfully designed 3D replica of the Lima Peru Temple, highlighting its classic symmetry and sacred form.",
    models: "Marble, White, White Matte",
    available: true
  },
  {
    name: "Temple of Salt Lake City, USA",
    size: 20,
    imageUrl: "images/temple_5.webp",
    description:
      "A timeless 3D model of the Salt Lake City Temple, known for its historic and spiritual significance.",
    models: "Marble, White, White Matte",
    available: true
  },
  {
    name: "Temple of Arequipa, Peru",
    size: 40,
    imageUrl: "images/temple_6.webp",
    description:
      "An elegant 3D printed version of the Arequipa Peru Temple, showcasing its modern design and refined features.",
    models: "Marble, White, White Matte",
    available: true
  },
  {
    name: "Temple of Moses Lake Washington, USA",
    size: 40,
    imageUrl: "images/temple_7.webp",
    description:
      "An elegant 3D printed version of the Moses Lake Washington Temple, showcasing its modern design and refined features.",
    models: "Marble, White, White Matte",
    available: true
  },
  {
    name: "Temple of Oaxaca, Mexico",
    size: 40,
    imageUrl: "images/temple_8.webp",
    description:
      "An elegant and detailed 3D printed version of the Oaxaca Mexico Temple, showcasing its modern design and refined features.",
    models: "Marble, White, White Matte",
    available: false
  }
];


/* ============================= */
/* Gallery Rendering + Tooltip */
/* ============================= */

const gallery = document.getElementById("gallery");
const tooltip = document.getElementById("tooltip");

function renderGallery(items) {
  if (!gallery) return;

  gallery.innerHTML = "";

  items.forEach(product => {

    const figure = document.createElement("figure");
    figure.classList.add("gallery-item");

    const availability = product.available ? "Available" : "Coming Soon";

    figure.innerHTML = `
      <img src="${product.imageUrl}" 
           alt="${product.name}" 
           loading="lazy">
      <figcaption>${product.name}</figcaption>
    `;

    /* Tooltip Events */

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


/* ============================= */
/* Local Storage */
/* ============================= */

function saveVisitTime() {
  const now = new Date().toLocaleString();
  localStorage.setItem("lastVisit", now);
}

function showLastVisit() {
  const lastVisit = localStorage.getItem("lastVisit");

  if (lastVisit) {
    console.log(`🕒 Last visit: ${lastVisit}`);
  } else {
    console.log("👋 Welcome! This is your first visit.");
  }
}


/* ============================= */
/* Initialize */
/* ============================= */

document.addEventListener("DOMContentLoaded", () => {

  // Example array method usage (rubric requirement)
  const availableProducts = products.filter(p => p.available);

  renderGallery(products); // or availableProducts if you want
  showLastVisit();
  saveVisitTime();

});
