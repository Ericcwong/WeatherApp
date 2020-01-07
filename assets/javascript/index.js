
$("#getWeather").on("click",function(event){
    event.preventDefault();
    var city = $("#cityInput").val();
    var currentDayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=af5ff51d8478a9ce01438eae6ef98a99";
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=af5ff51d8478a9ce01438eae6ef98a99";

    /*Current day weather*/
    $.ajax({
        url: currentDayURL,
        method: "GET"
    }).then(function(response){
        console.log(currentDayURL);
        console.log(response);
        var k = response.main.temp
        var fahrenheit = (k -273.15) * 1.80 + 32;
        var newFahrenheit = fahrenheit.toFixed(1);
        $(".currentDay").html("");
        $(".currentDay").append(`
        <h3 id="cityName">${response.name}</h3>
        <p id="temperature">Temperature: ${newFahrenheit}</p>
        <p id="humidity">Humidity: ${response.main.humidity}</p>
        <p id="windSpeed">Wind Speed: ${response.wind.speed}</p>
        <p id="uVIndex"></p>
        `);
        // $("#uVIndex").html() COME BACK TO THIS
    });
    /* Five day weather*/
    $.ajax({
        url: fiveDayURL,
        method: "GET"
    }).then(function(response){
        console.log(fiveDayURL);
        console.log(response);
    });

});


