let now = new Date();
function changeDate() {
  let days = document.querySelector("p.days");
  let dayTime = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = dayTime[now.getDay()];
  let hour = now.getHours();
  let minute = now.getMinutes();
  if (hour < 10) {
    hour = `0 ${minute}`;
  }
  if (minute < 10) {
    minute = `0 ${minute}`;
  }
  days.innerHTML = ` ${day} ${hour}: ${minute}`;
}
changeDate();
function displayForecast(response) {
  console.log(repsonse);
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.list[0];
  forecastElement.innerHTML = `<div class="col-2">
      <h2>
        12:00
      </h2>
      <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
     <div class="forecast-temp">
       <strong> ${forecast.main.temp_max}</strong>|65
     </div>
    </div>`;
}

function searchCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search");
  let city = document.querySelector("#city");
  city.innerHTML = `${citySearch.value}`;
  let apiKey = "c8f755d5ee590b2c42d00344493b2994";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(showTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}
let citySearchForm = document.querySelector("#search-form");
citySearchForm.addEventListener("submit", searchCity);

function tempFarenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  let temperature = temp.innerHTML;
  let newTemp = (temperature * 9) / 5 + 32;
  temp.innerHTML = Math.round(newTemp);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", tempFarenheit);

function tempCelius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  let temperature = temp.innerHTML;
  let newTemp = ((temperature - 32) * 5) / 9;
  temp.innerHTML = Math.round(newTemp);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", tempCelius);

function getCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c8f755d5ee590b2c42d00344493b2994";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(showTemp);
}
function showTemp(response) {
  console.log(response);
  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = `${temp}`;
  let location = response.data.name;
  let h1 = document.querySelector("#city");
  h1.innerHTML = `${location}`;
  let forcast = response.data.weather[0].description;
  let forcastElement = document.querySelector(".weatherCondition");
  forcastElement.innerHTML = `${forcast}`;
  let wind = Math.round(response.data.wind.speed * 3);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `wind: ${wind} mph`;
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `humidity: ${humidity}%`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

let button = document.querySelector("button");
button.addEventListener("click", getLocation);
