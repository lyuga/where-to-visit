const createVenueHTML = (name, location, iconSource) => {
  return `<h2>${name}</h2>
  <img class="venueimage" src="${iconSource}"/>
  <h3>Address:</h3>
  <p>${location.address}</p>
  <p>${location.city}</p>
  <p>${location.country}</p>
  <p>(${location.cc})</p>`;
}

// Temperature conversion
let celsius;
let fahrenheit;

const kelvinToCelsius = k => (k - 273.15).toFixed(0);
const kelvinToFahrenheit = k => ((k - 273.15) * 9 / 5 + 32).toFixed(0);

const createWeatherHTML = (currentDay) => {
  celsius = kelvinToCelsius(currentDay.main.temp);
  fahrenheit = kelvinToFahrenheit(currentDay.main.temp);
  return `<div class="toggle" id="convToggle">
      <input type="checkbox" class="checkbox">
      <div class="knobs">
          <span>°C</span>
      </div>
      <div class="layer"></div>
    </div>
    <h2>${weekDays[(new Date()).getDay()]}</h2>
		<h2>Temperature: <span id="temp" data-units="c">${celsius}°C</span></h2>
    <h2>Humidity: ${currentDay.main.humidity}%</h2>
		<h2>Condition: ${currentDay.weather[0].description}</h2>
  	<img src="https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png">`;
}

const getRandom = (arr, n) => {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}