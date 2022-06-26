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

//Search Engine
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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["mon", "tues", "wed", "thurs", "fri"];
  let forecastHTML = `<div class="row">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class = "col-2 forecast-day">
            <img class="forecastIcon" src="http://openweathermap.org/img/wn/02n@2x.png" alt="" width=45/><br />
            <strong class="forecastTempHigh">10℃</strong> <br />
            <small class="forecastTempLow">3℃</small> <br />
            <p><span class="forecast-weekday">${day}</span></p>
        </div>
        `;

    forecastHTML = forecastHTML + ``;
    forecastElement.innerHTML = forecastHTML;
  });
}

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

displayForecast();
