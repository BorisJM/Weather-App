"use strict";
const form = document.querySelector("form");
const inputCity = document.querySelector(".city-input");
const containerData = document.querySelector(".weather-data");
const locationBtn = document.querySelector(".get-location");
const errorWindow = document.querySelector(".error-window");
////////////////////

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const city = inputCity.value;
  gettingWeather(city);
  inputCity.value = "";
  inputCity.blur();
});

async function gettingWeather(city) {
  try {
    const callAPI = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=1964348bd3d340b3a79153045230701&q=${city}`
    );
    const data = await callAPI.json();
    const currentWeather = data.current;
    const location = data.location;
    console.log(callAPI);
    if (!callAPI.ok) {
      popupError();
      setTimeout(() => {
        inputCity.classList.toggle("wrong-input");
        errorWindow.style.transform = "translate(50%, -100%)";
      }, 3000);
      return;
    }
    containerData.innerHTML = "";
    containerData.insertAdjacentHTML(
      "afterbegin",
      `    <div class="current-weather">
    <img src="${currentWeather.condition.icon}" alt="weather icon" />
    <h2 class="heading-secondary">${currentWeather.temp_c}&#176;C</h2>
    <p class="weather-description">${currentWeather.condition.text}</p>
    <p class="location">
      <ion-icon name="pin-outline" class="icon"></ion-icon>
      <span class="country-city">${location.name}, ${location.country}</span>
    </p>
  </div>
  <div class="other-information">
    <div class="first-col">
      <ion-icon name="thermometer-outline" class="col-icon"></ion-icon>
      <p><span class="feels-like">${currentWeather.feelslike_c}&#176;C</span> Feels like</p>
    </div>
    <div class="second-col">
      <ion-icon name="water-outline" class="col-icon"></ion-icon>
      <p>
        <span class="percentage"
          >${currentWeather.humidity} <span class="percentage-symbol">%</span>
        </span>
        Humidlity
      </p>
    </div>
  </div>`
    );
  } catch (err) {
    console.error(err);
  }
}

function popupError() {
  inputCity.classList.toggle("wrong-input");
  errorWindow.style.transform = "translate(50%, 0%)";
}

function successCallback(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  const coords = `${lat},${long}`;
  gettingWeather(coords);
}

function errorCallback(error) {
  console.log(error);
}

locationBtn.addEventListener("click", function (e) {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
});
