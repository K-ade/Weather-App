// Format Date/Time
function userDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let now = new Date();

  let currentWeekday = days[now.getDay()];
  let currentMonth = months[now.getMonth()];
  let currentDay = now.getDate();
  let currentHour = now.getHours();
  let currentMinute = now.getMinutes();

  // Format hours and minutes
  if (currentHour < 10) {
    let currentHour = `0${currentHour}`;
  } else {
    if (currentHour > 12) {
      currentHour = currentHour - 12;
      currentMinute = `${currentMinute}PM`;
    }
  }

  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  let currentTime = `${currentHour}:${currentMinute} `;

  let formattedDateTime = `📅 ${currentWeekday}, ${currentMonth} ${currentDay} ⏰ ${currentTime}`;

  return formattedDateTime;
}

let dateTime = document.querySelector("p.date");
dateTime.innerHTML = userDate(new Date());

//Search Engine & Forecast

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["sun", "mon", "tues", "wed", "thurs", "fri", "sat"];

  return days[day];
}

function displayForecast(response) {
  let forecastData = response.data.daily;
  console.log(forecastData);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecastData.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` <div class = "col-2 forecast-day">
            <img class="forecastIcon" src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" width=45/><br />
            <strong class="forecastTempHigh">${Math.round(
              forecastDay.temp.max
            )}℃</strong> <br />
            <small class="forecastTempLow">${Math.round(
              forecastDay.temp.min
            )}℃</small> <br />
            <span class="forecast-weekday">${formatForecastDay(
              forecastDay.dt
            )}</span>
        </div>
        `;

      forecastHTML = forecastHTML + ``;
      forecastElement.innerHTML = forecastHTML;
    }
  });
}

function getForecast(coordinates) {
  let apiKey = "86b69b17b94322697d2570908ee20bff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  document.querySelector("#userLocation").innerHTML = response.data.name;
  let celsiusTemp = Math.round(response.data.main.temp);

  document.querySelector("#current-temp-view").innerHTML = celsiusTemp;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  // Convert Celsius to Fahrenheit
  function updateToFahrenheitUnit(event) {
    event.preventDefault();
    let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
    let tempDisplay = document.querySelector("#current-temp-view");
    tempDisplay.innerHTML = Math.round(fahrenheitTemp);
  }

  let fahrenheitSelector = document.querySelector("#temp-unit-far");
  fahrenheitSelector.addEventListener("click", updateToFahrenheitUnit);

  function updateToCelsiusUnit(event) {
    event.preventDefault();
    let tempDisplay = document.querySelector("#current-temp-view");
    tempDisplay.innerHTML = celsiusTemp;
  }

  let celsiusSelector = document.querySelector("#temp-unit-cel");
  celsiusSelector.addEventListener("click", updateToCelsiusUnit);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "86b69b17b94322697d2570908ee20bff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function runSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#location-input");
  let city = cityInput.value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", runSearch);

//Geolocation API
function findCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "86b69b17b94322697d2570908ee20bff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getGeolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findCurrentLocation);
}

let currentLocationButton = document.querySelector("#find-location");
currentLocationButton.addEventListener("click", getGeolocation);

// Default temp (on load)
let celsiusTemp = null;

// Default Location (on load)
searchCity("Tokyo");
