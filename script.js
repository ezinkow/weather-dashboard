$(document).ready(function(){

var cities = [""]


function displayWeather() {
    
    var city = $(this).attr("data-name")
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=Chicago&units=imperial&appid=da5a0b2df3ad3a18dae3207cc7ca31bf";

    $.ajax({
        url:queryURL,
        method: "GET"
    }).then(function(response) {
        console.log("response:", response)
        // creates a div to hold the weather
        weatherOutput = $("<div>")

        //retrieves the city name, date and icon
        var cityGet = response.name
        var date = (moment().format("MM/D/YY"))
        var weatherIcon = response.weather[0].icon
        var icon = $("<img>")
        icon.attr("src", "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png")

        //creates element to display city name, date and icon
        var cityDiv = $("<div>")
        //display the city, date, icon
        cityDiv.text(cityGet + " " + date)
        cityDiv.append(icon)
        weatherOutput.append(cityDiv)
        //retrieves temperature
        var temperature = response.main.temp.toFixed(1)
        //creates element to display temp
        tempDiv = $("<div>")
        //displays temp
        tempDiv.text("Temperature: " + temperature + " °F")
        weatherOutput.append(tempDiv)
        //retrieves humidity
        var humidity = response.main.humidity.toFixed()
        //creates elemetnto display humidity
        humidDiv = $("<div>")
        //displays temp
        humidDiv.text("Humidity: " + humidity + "%")
        weatherOutput.append(humidDiv)
        //retreives wind speed
        var windSpeed = response.wind.speed.toFixed()
        //creates elementto display wind speed
        windDiv = $("<div>")
        //displays wind speed
        windDiv.text("Wind Speed: " + windSpeed + " MPH")
        weatherOutput.append(windDiv)
        $("#weather-display").append(weatherOutput)

        // get latitude and longitude for UV
        var lat = response.coord.lat
        var lon = response.coord.lon
        var coordinates = "lat=" + lat + "&lon=" + lon
        var queryURLUV = "http://api.openweathermap.org/data/2.5/uvi?" + coordinates + "&appid=da5a0b2df3ad3a18dae3207cc7ca31bf"
        var queryURLForecast = "https://api.openweathermap.org/data/2.5/onecall?" + coordinates + "&units=imperial&appid=da5a0b2df3ad3a18dae3207cc7ca31bf"
        
        $.ajax({
            url:queryURLUV,
            method: "GET"
        }).then(function(response) {
            //retrieves uv
            var uv = response.value
            //creates element to display uv
            uvDiv = $("<div>")
            //displays uv
            uvDiv.text("UV Index: " + uv)
            weatherOutput.append(uvDiv)            
        })

        $.ajax({
            url:queryURLForecast,
            method: "GET"
        }).then(function(response) {
            //retrieves 1 day forecast
            console.log("one call:", response)
            
        })
    })
      
    }



displayWeather()



})