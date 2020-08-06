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
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let date = now.getDate();
  let month = months[now.getMonth()];
  let day = dayTime[now.getDay()];
  let hour = now.getHours();
  let minute = now.getMinutes();
  if (hour < 10) {
    hour = `0 ${minute}`;
  }
  if (minute < 10) {
    minute = `0 ${minute}`;
  }
  days.innerHTML = ` Last update: ${month} ${date}, ${day} ${hour}: ${minute}`;
}
changeDate();
function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  let minute = date.getMinutes();
  if (hour < 10) {
    hour = `0 ${minute}`;
  }
  if (minute < 10) {
    minute = `0 ${minute}`;
  }
  return `${hour}: ${minute}`;
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}

function searchCity(city) {
  let apiKey = "c8f755d5ee590b2c42d00344493b2994";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(showTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}
function submitCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-search");
  searchCity(cityElement.value);
  let city = document.querySelector("#city");
  city.innerHTML = `${cityElement.value}`;
}
let citySearchForm = document.querySelector("#search-form");
citySearchForm.addEventListener("submit", submitCity);

function tempFarenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  let temperature = temp.innerHTML;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let newTemp = (temperature * 9) / 5 + 32;
  temp.innerHTML = Math.round(newTemp);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", tempFarenheit);

function tempCelius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  let temperature = temp.innerHTML;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  celsiusLink.removeEventListener("click", tempCelsius);
  fahrenheitLink.addEventListener("click", tempFahrenheit);
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
  let forecast = response.data.weather[0].description;
  let forecastElement = document.querySelector(".weatherCondition");
  forecastElement.innerHTML = `${forecast}`;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `wind: ${wind} mph`;
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `humidity: ${humidity}%`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

let button = document.querySelector("button");
button.addEventListener("click", getLocation);
searchCity("Philadelphia");
