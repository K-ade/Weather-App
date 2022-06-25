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
  if (currentHour < 10) {
    let currentHour = `0${currentHour}`;
  }
  let currentMinute = now.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  let currentTime = `${currentHour}:${currentMinute} `;

  let formattedDateTime = `📅 ${currentWeekday}, ${currentMonth} ${currentDay} ⏰ ${currentTime}`;

  return formattedDateTime;
}

let dateTime = document.querySelector("p.date");
dateTime.innerHTML = userDate(new Date());

//Feature 3: Celsius or Farenheit unit options (dummy info)

function updateToFarUnit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("h2");
  currentTemp.innerHTML = "77℉";
}

let farUnit = document.querySelector("#temp-unit-far");
farUnit.addEventListener("click", updateToFarUnit);

//Search Engine
function displayWeather(response) {
  document.querySelector("#userLocation").innerHTML = response.data.name;
  document.querySelector("#current-temp-view").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].description;

  console.log(response.data.weather[0].icon);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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

// Default Location (on load)
searchCity("Cairo");

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
