$(document).ready(function(){

var cities = ["Chicago","New York"]


function displayWeather() {
    
    var city = $(this).attr("data-name").trim()
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=da5a0b2df3ad3a18dae3207cc7ca31bf";

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
        var temperature = response.main.temp.toFixed(2)
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
            //date functions
            var oneDay = (moment().add(1, 'days').format("MM/D/YY"))
            var twoDay = (moment().add(2, 'days').format("MM/D/YY"))
            var threeDay = (moment().add(3, 'days').format("MM/D/YY"))
            var fourDay = (moment().add(4, 'days').format("MM/D/YY"))
            var fiveDay = (moment().add(5, 'days').format("MM/D/YY"))
            
            //retrieves 1 day forecast
            //retrieves icon
            var weatherIcon = response.daily[0].weather[0].icon
            var icon = $("<img>")
            icon.attr("src", "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png")
            $("#day0").append(icon)
            console.log("one call:", response)
            //retrieves temp day 1
            var temperature0 = response.daily[0].temp.day.toFixed(2)
            tempDiv0 = $("<div>")
            tempDiv0.text("Temp: " + temperature0 + " °F")
            $("#day0").append(tempDiv0)
            //retrieves humidity
            var humidity0 = response.daily[0].humidity
            humidityDiv0 = $("<div>")
            humidityDiv0.text("Humidity: " + humidity0 + "%")
            $("#day0").append(humidityDiv0)
             
            //retrieves Day 2
             var weatherIcon1 = response.daily[1].weather[0].icon
             var icon1 = $("<img>")
             icon1.attr("src", "http://openweathermap.org/img/wn/" + weatherIcon1 + "@2x.png")
             $("#day1").append(icon1)
            //retrieves temp day 2
            var temperature1 = response.daily[1].temp.day.toFixed(2)
            tempDiv1 = $("<div>")
            tempDiv1.text("Temp: " + temperature1 + " °F")
            $("#day1").append(tempDiv1)
            //retrieves humidity
            var humidity1 = response.daily[1].humidity
            humidityDiv1 = $("<div>")
            humidityDiv1.text("Humidity: " + humidity1 + "%")
            $("#day1").append(humidityDiv1)

            //retrieves Day 3
            var weatherIcon2 = response.daily[2].weather[0].icon
            var icon2 = $("<img>")
            icon2.attr("src", "http://openweathermap.org/img/wn/" + weatherIcon2 + "@2x.png")
            $("#day2").append(icon2)
            //retrieves temp day 3
            var temperature2 = response.daily[2].temp.day.toFixed(2)
            tempDiv2 = $("<div>")
            tempDiv2.text("Temp: " + temperature2 + " °F")
            $("#day2").append(tempDiv2)
            //retrieves humidity
            var humidity2 = response.daily[2].humidity
            humidityDiv2 = $("<div>")
            humidityDiv2.text("Humidity: " + humidity1 + "%")
            $("#day2").append(humidityDiv2)

            //retrieves Day 4
            var weatherIcon3 = response.daily[3].weather[0].icon
            var icon3 = $("<img>")
            icon3.attr("src", "http://openweathermap.org/img/wn/" + weatherIcon3 + "@2x.png")
            $("#day3").append(icon3)
            //retrieves temp day 2
            var temperature3 = response.daily[3].temp.day.toFixed(2)
            tempDiv3 = $("<div>")
            tempDiv3.text("Temp: " + temperature3 + " °F")
            $("#day3").append(tempDiv3)
            //retrieves humidity
            var humidity3 = response.daily[3].humidity
            humidityDiv3 = $("<div>")
            humidityDiv3.text("Humidity: " + humidity3 + "%")
            $("#day3").append(humidityDiv3)
            
            //retrieves Day 5
            var weatherIcon4 = response.daily[4].weather[0].icon
            var icon4 = $("<img>")
            icon4.attr("src", "http://openweathermap.org/img/wn/" + weatherIcon4 + "@2x.png")
            $("#day4").append(icon4)
            //retrieves temp day 2
            var temperature4 = response.daily[4].temp.day.toFixed(2)
            tempDiv4 = $("<div>")
            tempDiv4.text("Temp: " + temperature4 + " °F")
            $("#day4").append(tempDiv4)
            //retrieves humidity
            var humidity4 = response.daily[4].humidity
            humidityDiv4 = $("<div>")
            humidityDiv4.text("Humidity: " + humidity4 + "%")
            $("#day4").append(humidityDiv4)
        })
    })
      
    }

function renderCityButtons() {
    $(".city-buttons").empty();

    for (var i = 0; i < cities.length; i++) {
        var c = $("<button>")
        c.addClass("cityWeather")
        c.attr("data-name",cities[i]);
        c.text(cities[i])
        $(".city-buttons").append(c)
    }
}

$(".btn").on("click",function(event){
    event.preventDefault();
    var city = $("#city-search").val().trim()
    cities.push(city)
    renderCityButtons()
})

$(document).on("click", ".cityWeather", displayWeather)
renderCityButtons();

})