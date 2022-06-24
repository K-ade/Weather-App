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

//Search Engine (form bug)
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
}

function searchCity(city) {
  let apiKey = "86b69b17b94322697d2570908ee20bff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function runSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input").value;
  searchCity(city);
}

let searchFormSubmit = document.querySelector("#location-submit");
searchFormSubmit.addEventListener("submit", runSubmit);

// Default Location (on load)
searchCity("Vancouver");

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
