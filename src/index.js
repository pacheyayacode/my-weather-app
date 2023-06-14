function liveDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let realDate = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[realDate];
  return `${day} ${hours}:${minutes}`;
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = liveDate(currentTime);

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city");
  document.querySelector("#searching").innerHTML = cityInput.value;
}
let cityForm = document.querySelector("form");
cityForm.addEventListener("submit", changeCity);
console.log(cityForm);

function showCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city");
  let city = document.querySelector("#searching");
  city.innerHTML = `${citySearch.value}`;
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", showCity);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `${temperature}°C`;
}

function searchTemp(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  let apiKey = "6119b408fe5bfe266067cb062719e645";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", searchTemp);

function showLocationTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let locationTemp = document.querySelector("#current-temp");
  locationTemp.innerHTML = `${temperature}°C`;
  let city = document.querySelector("#searching");
  city.innerHTML = `${response.data.name}`;
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "6119b408fe5bfe266067cb062719e645";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showLocationTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#search-current");
locationButton.addEventListener("click", getCurrentPosition);
