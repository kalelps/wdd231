document.getElementById("lastModified").textContent =
  "Last Modified: " + document.lastModified;

const members = document.getElementById("members");
const gridBtn = document.getElementById("grid");
const listBtn = document.getElementById("list");

gridBtn.addEventListener("click", () => {
  members.classList.add("grid");
  members.classList.remove("list");
});

listBtn.addEventListener("click", () => {
  members.classList.add("list");
  members.classList.remove("grid");
});
