$(document).ready(function(){
var cities = []

function clearWeather() {
    $("#weatherPanel").innerHTML=""
}

function displayWeatherInfo() {
    clearWeather()
    console.log(clearWeather)
    // $("#weather-display").innerHTML=""
    var displayWeather=$("<div>")
    $("#weather-display").append(displayWeather)
    var city = $(this).attr("value");
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=da5a0b2df3ad3a18dae3207cc7ca31bf";
    $.ajax({
        url:queryURL,
        method: "GET"
    }).then(function(response) {
        //creates element to display city name, date and icon
        var cityDiv = $("<div>")
        cityDiv.addClass("cityText")
        // creates a div to hold the weather
        var weatherOutput = $("<div>")
        //display the city, date, icon
        var cityGet = response.name
        var date = (moment().format("MM/D/YY"))
        cityDiv.text(cityGet + " " + "(" + date + ")")
        weatherOutput.append(cityDiv)
        // get coordinates
        var lat = response.coord.lat
        var lon = response.coord.lon
        var coordinates = "lat=" + lat + "&lon=" + lon
        var queryURLCoordinates = "https://api.openweathermap.org/data/2.5/onecall?" + coordinates + "&units=imperial&appid=da5a0b2df3ad3a18dae3207cc7ca31bf"

        $.ajax({
            url:queryURLCoordinates,
            method: "GET"
        }).then(function(response) {
            console.log(response)
            //retrieves the city name, date and icon
            var weatherIcon = response.current.weather[0].icon
            var icon = $("<img>")
            icon.attr("src", "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png")
            cityDiv.append(icon)

            //retrieves temperature
            var temperature = response.current.temp.toFixed(2)
            //creates element to display temp
            tempDiv = $("<div>")
            tempDiv.addClass("text-row")
            //displays temp
            tempDiv.text("Temperature: " + temperature + " °F")
            weatherOutput.append(tempDiv)
            //retrieves humidity
            var humidity = response.current.humidity.toFixed()
            //creates elemetnto display humidity
            humidDiv = $("<div>")
            humidDiv.addClass("text-row")
            //displays temp
            humidDiv.text("Humidity: " + humidity + "%")
            weatherOutput.append(humidDiv)
            //retreives wind speed
            var windSpeed = response.current.wind_speed.toFixed()
            //creates elementto display wind speed
            windDiv = $("<div>")
            windDiv.addClass("text-row")
            //displays wind speed
            windDiv.text("Wind Speed: " + windSpeed + " MPH")
            weatherOutput.append(windDiv)
            $("#weather-display").append(weatherOutput)
            
            //5-day forecast for loop
            var nextFiveDays = ["1","2","3","4","5"]
            for (let i = 0; i <= nextFiveDays.length; i++) {
                var dates = (moment().add(i, 'days').format("MM/D/YYYY"))
                var futureDate = $("<div>")
                futureDate.text(dates)
                var weatherIcon = response.daily[i].weather[0].icon
                var icon = $("<img>")
                icon.attr("src", "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png")
                //retrieves temps
                var temperature = response.daily[i].temp.day.toFixed(2)
                tempDiv = $("<div>")
                tempDiv.text("Temp: " + temperature + " °F")
                //retrieves humidity
                var humidity = response.daily[i].humidity
                humidityDiv = $("<div>")
                humidityDiv.text("Humidity: " + humidity + "%")
                
                $("#day" + i).append(futureDate, icon, tempDiv, humidityDiv)
            }

        

        // get latitude and longitude for UV

        var queryURLUV = "http://api.openweathermap.org/data/2.5/uvi?" + coordinates + "&appid=da5a0b2df3ad3a18dae3207cc7ca31bf"
        
        
        $.ajax({
            url:queryURLUV,
            method: "GET"
        }).then(function(response) {
            //retrieves uv
            var uv = response.value
            //creates element to display uv
            uvDiv = $("<span>")
            uvSpan = $("<span>")
            uvSpan.addClass("uvText")
            //displays uv
            uvDiv.text("UV Index: ")
            uvSpan.text(uv)
            weatherOutput.append(uvDiv,uvSpan)            
        })

        
    })
    var panel = $("#weatherPanel")
    panel.removeClass("hide")
    })}
function renderCityButtons() {
    $("#city-buttons").empty();

    for (var i = 0; i < cities.length; i++) {
        var btn = $("<button>")
        btn.text(cities[i])
        btn.attr("value",cities[i]);
        btn.addClass("flex btn btn-primary cityWeather")
        $("#city-buttons").append(btn)
        
    }
}

$(".btn").on("click",function(event){
    event.preventDefault();
    var city = $("#city-search").val().trim()
    cities.push(city)
    renderCityButtons()
    
})


$(document).on("click", ".cityWeather", function(event) {
    // event.preventDefault();
    // $("#weatherPanel").innerHTML=""
    displayWeatherInfo
    
})

$(document).on("click", ".cityWeather", clearWeather)
$(document).on("click", ".cityWeather", displayWeatherInfo)

renderCityButtons();

})