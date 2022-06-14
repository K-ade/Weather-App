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

//Feature 3: Celsius or Farenheit unit options

function updateToFarUnit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("h2");
  currentTemp.innerHTML = "77℉";
}

let farUnit = document.querySelector("#temp-unit-far");
farUnit.addEventListener("click", updateToFarUnit);

// Search Engine:

function retrieveWeather(response) {
  let inputCity = document.querySelector("#userLocation");
  inputCity.innerHTML = response.data.name;

  let inputCityTempDisplayMain = document.querySelector("#current-temp-view");
  inputCityTempDisplayMain.innerHTML = Math.round(response.data.main.temp);

  let windSpeedDisplay = document.querySelector("#wind");
  windSpeedDisplay.innerHTML = Math.round(response.data.wind.speed);

  let humidityDisplay = document.querySelector("#humidity");
  humidityDisplay.innerHTML = Math.round(response.data.main.humidity);

  let conditionDisplay = document.querySelector("#condition");
  conditionDisplay.innerHTML = response.data.weather[0].main;
}

function updateCity(event) {
  event.preventDefault();
  let city = document.querySelector("#location-text-input").value;
  let apiKey = "86b69b17b94322697d2570908ee20bff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(retrieveWeather);
}

function findCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "86b69b17b94322697d2570908ee20bff";
  let apiUrlB = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlB).then(retrieveWeather);
}
navigator.geolocation.getCurrentPosition(findCurrentLocation);
