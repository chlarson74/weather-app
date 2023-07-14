// SET OF GLOBAL VARIABLES — 
var city

// var citySearched - searchHistory citylist


// eventListener on button gets the value and store it to a variable
document.getElementById("submitButton").addEventListener("click", function(event){
    event.preventDefault()
    city = document.getElementById("cityName").value
    getweather(city)
    localStorage.setItem("cityName", city)

})  

var ul = document.querySelector("ul");
let itemsArray = localStorage.getItem("cityName") ?
JSON.parse(localStorage.getItem("cityName")) : [];

itemsArray.forEach(addCity);
function addCity(text){
  var li = document.createElement('li')
  li.textContent = text;
  ul.appendChild(li);
}

  function add(){
    itemsArray.push(input.value);
    localStorage.setItem('cityName', JSON.stringify(itemsArray));
    addTask(input.value);
    input.value = '';
  }
//localStorage.getItem("cityName");


function getweather(city) {
    var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=3e85ced668f2df90136271de3aede161&units=imperial"  
    fetch(url)
    .then(function(res){
        return res.json()
    }) 
    .then(function(data) {
        var currentDay = data.list[0]
        //console.log(currentDay)
        displayCurrentWeather(currentDay, data.list)
    })
}
function displayCurrentWeather(currentDay, forecast){
    var currentWeatherEl = document.getElementById("currentWeather")
    currentWeatherEl.innerHTML = ""
    var cityNameEl = document.createElement("span")
    cityNameEl.innerText = city + " "
    currentWeatherEl.appendChild(cityNameEl)
    var dateEl = document.createElement("span")
    dateEl.innerText = dayjs.unix(currentDay.dt).format("MM/DD/YYYY")
    currentWeatherEl.appendChild(dateEl)
    var imageEl = document.createElement("img")
    imageEl.src = "https://openweathermap.org/img/wn/" + currentDay.weather[0].icon + ".png"
    currentWeatherEl.appendChild(imageEl)
    var temperatureEl = document.createElement("p")
    temperatureEl.innerText = "temperature " + currentDay.main.temp + "°"
    currentWeatherEl.appendChild(temperatureEl)
    var humidityEl = document.createElement("p")
    humidityEl.innerText = "humidity " + currentDay.main.humidity + "%"
    currentWeatherEl.appendChild(humidityEl)
    var windEl = document.createElement("p")
    windEl.innerText = "wind speed " + currentDay.wind.speed + "mph"
    currentWeatherEl.appendChild(windEl)
    displayFiveDayWeather(forecast)
}

function displayFiveDayWeather(forecast){
    for (var i = 7; i < forecast.length; i+=8){
        var day=forecast[i]
        //console.log(forecast)
        //below will loop through the i and append to the ids seperated by 8 integers to account for the 3 hour spans
        var forecastEl=document.getElementById(`forecast${i}`)
        forecastEl.innerHTML = ""
        var cityNameEl = document.createElement("span")
        cityNameEl.innerText = city + " "
        forecastEl.appendChild(cityNameEl)
        var dateEl = document.createElement("span")
        dateEl.innerText = dayjs.unix(day.dt).format("MM/DD/YYYY")
        forecastEl.appendChild(dateEl)
        var imageEl = document.createElement("img")
        imageEl.src = "https://openweathermap.org/img/wn/" + day.weather[0].icon + ".png"
        forecastEl.appendChild(imageEl)
        var temperatureEl = document.createElement("p")
        temperatureEl.innerText = "temperature " + day.main.temp + "°"
        forecastEl.appendChild(temperatureEl)
        var humidityEl = document.createElement("p")
        humidityEl.innerText = "humidity " + day.main.humidity + "%"
        forecastEl.appendChild(humidityEl)
        var windEl = document.createElement("p")
        windEl.innerText = "wind speed " + day.wind.speed + "mph"
        forecastEl.appendChild(windEl)
    }
}

// this will store the recent searched cities


// ——————— (in a function called searchWeather ————————————
// STEP THREE:
// create a variable for the URL for the city name and API key

// STEP FOUR:
// send a fetch request to get the data at the URL

// STEP FIVE:
// elements with ID to update the data that is returned
// note: for the current day weather select the 0 item

// STEP SIX:
// five day forecast
// need a for loop to loop over the data that is returned
// each loop needs to create an element and adjust the element’s text and append it to an existing empty HTML element
// our loop will need to start on seven and increase by 8 each time (i = 7; i < variable.length; i+=8)

// STEP SEVEN:
// take the city searched and add it to a localStorage array
// what if this is the first time? If no localStorage - create it as an empty array - push the new city into it - save the updated array.

// STEP EIGHTa:
// each time they search - update the display with the search - for loop - create an li for each item and append to the screen
// ————— ends searchWeather function) ———————————


// STEP EIGHT:
// display the localStorage when the page loads

// STEP NINE:
// add an eventListener - part of the display part - when clicked - call the searched weather 

//INTERNAL NOTES:
// get familiar with the API —  
// https://openweathermap.org/forecast5#builtin, 
// https://openweathermap.org/forecast5#JSON -
// https://home.openweathermap.org/api_keys — evcc email
// openweather API key = 3e85ced668f2df90136271de3aede161


//ACCEPTANCE CRITERIA
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
