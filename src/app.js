import { getAikoWeather, MOCK_WEATHER } from "./weatherApi.js";

const form = document.querySelector("#weatherForm");
const input = document.querySelector("#cityInput");
const status = document.querySelector("#status");
const result = document.querySelector("#result");

function renderWeather(weather) {
  result.hidden = false;
  result.innerHTML = `
    <div>
      <p class="label">${weather.isMock ? "Fallback demo" : "Live weather"}</p>
      <h2>${weather.city}, ${weather.country}</h2>
      <p class="condition">${weather.condition}</p>
    </div>
    <strong class="temperature">${Math.round(weather.temperature)}°C</strong>
    <dl>
      <div><dt>Feels like</dt><dd>${Math.round(weather.feelsLike)}°C</dd></div>
      <div><dt>Humidity</dt><dd>${weather.humidity}%</dd></div>
      <div><dt>Wind</dt><dd>${weather.wind} km/h</dd></div>
    </dl>
  `;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  status.textContent = "Aiko is checking the sky...";
  result.hidden = true;
  try {
    const weather = await getAikoWeather(input.value);
    renderWeather(weather);
    status.textContent = "Forecast ready.";
  } catch (error) {
    if (error.code === "NOT_FOUND" || error.code === "EMPTY_CITY") {
      status.textContent = error.message;
      return;
    }
    renderWeather({ ...MOCK_WEATHER, city: input.value.trim() || MOCK_WEATHER.city });
    status.textContent = "The API fell over. Breathe, it was not your fault. Showing demo fallback.";
  }
});

renderWeather(MOCK_WEATHER);
status.textContent = "Demo data loaded. Search a city for live weather.";
