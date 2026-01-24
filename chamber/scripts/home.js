const apiKey = "9b2d345fe5cf9312312b18486a8685e1";
const city = "Lima";
const country = "Peru";
const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=imperial&appid=${apiKey}`;

async function getWeather() {
  try {
    const response = await fetch(weatherURL);
    const data = await response.json();

    document.getElementById("current-temp").textContent =
      `Temperature: ${Math.round(data.list[0].main.temp)}°F`;

    document.getElementById("weather-desc").textContent =
      data.list[0].weather[0].description;

    const forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = "";

    const forecastDays = data.list.filter(item =>
      item.dt_txt.includes("12:00:00")
    ).slice(0, 3);

    forecastDays.forEach(day => {
      const p = document.createElement("p");
      const date = new Date(day.dt_txt);
      p.textContent = `${date.toLocaleDateString(undefined, {
        weekday: "short"
      })}: ${Math.round(day.main.temp)}°F`;
      forecastDiv.appendChild(p);
    });

  } catch (error) {
    console.error("Weather error:", error);
  }
}

getWeather();

const spotlightContainer = document.getElementById("spotlight-container");

async function loadSpotlights() {
  const response = await fetch("data/members.json");
  const data = await response.json();

  const qualified = data.members.filter(
    member => member.membership === 2 || member.membership === 3
  );

  qualified.sort(() => 0.5 - Math.random());
  const selected = qualified.slice(0, 3);
  spotlightContainer.innerHTML = "";

  selected.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("member");

    card.innerHTML = `
      <h3>${member.name}</h3>
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p>Membership: ${member.membership === 3 ? "Gold" : "Silver"}</p>
    `;

    spotlightContainer.appendChild(card);
  });
}

loadSpotlights();
