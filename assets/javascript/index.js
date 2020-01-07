
$("#getWeather").on("click",function(event){
    event.preventDefault();
    var city = $("#cityInput").val();
    var currentDayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=af5ff51d8478a9ce01438eae6ef98a99";
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=af5ff51d8478a9ce01438eae6ef98a99";

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
        <h5 id="temperature">Temperature: ${newFahrenheit} &#8457; </p>
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
    }).then(function(week){
        console.log(fiveDayURL);
        console.log(week);
        console.log(week.list[4].main.temp)
        var dayOneIconPull = (week.list[4].weather[0].icon);
        var dayOneIcon = "http://openweathermap.org/img/wn/"+dayOneIconPull+".png";
        var dayTwoIconPull = (week.list[12].weather[0].icon);
        var dayTwoIcon = "http://openweathermap.org/img/wn/"+dayTwoIconPull+".png";
        var dayThreeIconPull = (week.list[20].weather[0].icon);
        var dayThreeIcon = "http://openweathermap.org/img/wn/"+dayThreeIconPull+".png";
        var dayFourIconPull = (week.list[28].weather[0].icon);
        var dayFourIcon = "http://openweathermap.org/img/wn/"+dayFourIconPull+".png";
        var dayFiveIconPull = (week.list[36].weather[0].icon);
        var dayFiveIcon = "http://openweathermap.org/img/wn/"+dayFiveIconPull+".png";
        // var k = week.main.temp
        // var fahrenheit = (k -273.15) * 1.80 + 32;
        // var newFahrenheit = fahrenheit.toFixed(1);
        $(".fiveDay").html("");
        $(".fiveDay").append(`
            <h3> 5-Day Forecast: </h3>
                <div class ="dayOne">
                    <p>${week.list[4].dt_txt}</p>
                    <img src="${dayOneIcon}">
                    <p>Temp: ${week.list[4].main.temp} 	&#8457; </p>
                    <p></p>
                </div>

                <div class ="dayTwo">
                    <p>${week.list[12].dt_txt}</p>
                    <img src="${dayTwoIcon}">
                    <p>Temp: ${week.list[4].main.temp} 	&#8457; </p>
                    <p></p>
                </div>

                <div class ="dayThree">
                    <p>${week.list[20].dt_txt}</p>
                    <img src="${dayThreeIcon}">
                    <p>Temp: ${week.list[4].main.temp} 	&#8457; </p>
                    <p></p>
                </div>

                <div class ="dayFour">
                    <p>${week.list[28].dt_txt}</p>
                    <img src="${dayFourIcon}">
                    <p>Temp: ${week.list[4].main.temp} 	&#8457; </p>
                    <p></p>
                </div>

                <div class ="dayFive">
                    <p>${week.list[36].dt_txt}</p>
                    <img src="${dayFiveIcon}">
                    <p>Temp: ${week.list[4].main.temp} 	&#8457; </p>
                    <p></p>
                </div>

        `);
    });

});


