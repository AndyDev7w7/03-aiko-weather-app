(function () {
  const WEATHER_CODES = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Rime fog",
    51: "Light drizzle",
    61: "Rain",
    63: "Moderate rain",
    65: "Heavy rain",
    80: "Rain showers",
    95: "Thunderstorm",
  };

  const MOCK_WEATHER = {
    city: "Fallback City",
    country: "Demo",
    temperature: 21,
    feelsLike: 20,
    humidity: 62,
    wind: 8,
    condition: "Mock clouds",
    isMock: true,
  };

  async function getAikoWeather(city) {
    const query = encodeURIComponent(city.trim());
    if (!query) {
      const error = new Error("Write a city first.");
      error.code = "EMPTY_CITY";
      throw error;
    }
    const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1&language=en&format=json`);
    if (!geoResponse.ok) throw new Error("The geocoding API did not answer politely.");
    const geoData = await geoResponse.json();
    const place = geoData.results && geoData.results[0];
    if (!place) {
      const error = new Error("I could not find that city, but I will not enter dramatic mode yet.");
      error.code = "NOT_FOUND";
      throw error;
    }
    const weatherUrl = new URL("https://api.open-meteo.com/v1/forecast");
    weatherUrl.search = new URLSearchParams({
      latitude: place.latitude,
      longitude: place.longitude,
      current: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
      timezone: "auto",
    }).toString();
    const weatherResponse = await fetch(weatherUrl);
    if (!weatherResponse.ok) throw new Error("The weather API dropped the umbrella.");
    const weatherData = await weatherResponse.json();
    const current = weatherData.current;
    return {
      city: place.name,
      country: place.country,
      temperature: current.temperature_2m,
      feelsLike: current.apparent_temperature,
      humidity: current.relative_humidity_2m,
      wind: current.wind_speed_10m,
      condition: WEATHER_CODES[current.weather_code] || "Unknown sky mood",
      isMock: false,
    };
  }

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
})();
