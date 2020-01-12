
$("#getWeather").on("click",function loadWeather(event){
    event.preventDefault();
    $(".homeDisplay").hide();
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
        var currentDayIconPull = (response.weather[0].icon);
        var currentDayIcon = "http://openweathermap.org/img/wn/"+currentDayIconPull+".png";
        $(".currentDay").html("");
        $(".currentDay").append(`
        <div class="currentDayCard">
            <h3 id="cityName">${response.name}<img src="${currentDayIcon}"/></h3>
            
            <p id="temperature">Temperature: ${newFahrenheit} &#8457; </p>
            <p id="humidity">Humidity: ${response.main.humidity}%</p>
            <p id="windSpeed">Wind Speed: ${response.wind.speed}MPH</p>
            <p id="uVIndex"></p>
        </div>
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
        var dayOneTempPull = (week.list[4].main.temp);
        var fahrenheitOne = (dayOneTempPull -273.15) * 1.80 + 32;
        var dayOneTemp = fahrenheitOne.toFixed(1);

        var dayTwoTempPull = (week.list[12].main.temp);
        var fahrenheitTwo = (dayTwoTempPull -273.15) * 1.80 + 32;
        var dayTwoTemp = fahrenheitTwo.toFixed(1);

        var dayThreeTempPull = (week.list[20].main.temp);
        var fahrenheitThree = (dayThreeTempPull -273.15) * 1.80 + 32;
        var dayThreeTemp = fahrenheitThree.toFixed(1);

        var dayFourTempPull = (week.list[28].main.temp);
        var fahrenheitFour = (dayFourTempPull -273.15) * 1.80 + 32;
        var dayFourTemp = fahrenheitFour.toFixed(1);

        var dayFiveTempPull = (week.list[36].main.temp);
        var fahrenheitFive = (dayFiveTempPull -273.15) * 1.80 + 32;
        var dayFiveTemp = fahrenheitFive.toFixed(1);
        $(".fiveDay").html("");
        $(".fiveDay").append(`
            <h3> 5-Day Forecast: </h3>
                <div class ="dayOne">
                    <p>${week.list[4].dt_txt}</p>
                    <img src="${dayOneIcon}">
                    <p>Temp: ${dayOneTemp} 	&#8457; </p>
                    <p>Humidity: ${week.list[4].main.humidity}%</p>
                </div>

                <div class ="dayTwo">
                    <p>${week.list[12].dt_txt}</p>
                    <img src="${dayTwoIcon}">
                    <p>Temp: ${dayTwoTemp} 	&#8457; </p>
                    <p>Humidity: ${week.list[12].main.humidity}%</p>
                </div>

                <div class ="dayThree">
                    <p>${week.list[20].dt_txt}</p>
                    <img src="${dayThreeIcon}">
                    <p>Temp: ${dayThreeTemp} 	&#8457; </p>
                    <p>Humidity: ${week.list[20].main.humidity}%</p>
                </div>

                <div class ="dayFour">
                    <p>${week.list[28].dt_txt}</p>
                    <img src="${dayFourIcon}">
                    <p>Temp: ${dayFourTemp} 	&#8457; </p>
                    <p>Humidity: ${week.list[28].main.humidity}%</p>
                </div>

                <div class ="dayFive">
                    <p>${week.list[36].dt_txt}</p>
                    <img src="${dayFiveIcon}">
                    <p>Temp: ${dayFiveTemp} 	&#8457; </p>
                    <p>Humidity: ${week.list[36].main.humidity}%</p>
                </div>

        `);
    });

});
var cityArray = [];
console.log(cityArray)
$("#getWeather").on("click",function saveCity(){
    var cityInput = $("#cityInput").val();
    console.log("cityInput:", cityInput);
    cityArray.push(cityInput);
    console.log("cityArray:",cityArray);
    localStorage.setItem("City",JSON.stringify(cityArray));
    $(".citySave").append(`<button class="historyButton" data-cityName="${cityInput}" value="${cityInput}">${cityInput}</button>`);
    

});
$(document).ready(function(){
    var getCity = JSON.parse(localStorage.getItem("City"));
    console.log("getCity: ", getCity);
    for(var i=0; i<getCity.length; i++){
  console.log("getCity: ", getCity);
  $(".citySave").append(`<button class="historyButton" data-cityName="${getCity[i]}" value="${getCity[i]}">${getCity[i]}</button>`);
    }

});

$(document).on("click",".historyButton",function reloadButtons(event){
    event.preventDefault();
    $(".homeDisplay").hide();
    var city = $(this).val();
    var currentDayURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=af5ff51d8478a9ce01438eae6ef98a99";
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
        var currentDayIconPull = (response.weather[0].icon);
        var currentDayIcon = "http://openweathermap.org/img/wn/"+currentDayIconPull+".png";
        $(".currentDay").html("");
        $(".currentDay").append(`
        <div class="currentDayCard">
            <h3 id="cityName">${response.name}<img src="${currentDayIcon}"/></h3>
            
            <p id="temperature">Temperature: ${newFahrenheit} &#8457; </p>
            <p id="humidity">Humidity: ${response.main.humidity}%</p>
            <p id="windSpeed">Wind Speed: ${response.wind.speed}MPH</p>
            <p id="uVIndex"></p>
        </div>
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
        var dayOneTempPull = (week.list[4].main.temp);
        var fahrenheitOne = (dayOneTempPull -273.15) * 1.80 + 32;
        var dayOneTemp = fahrenheitOne.toFixed(1);

        var dayTwoTempPull = (week.list[12].main.temp);
        var fahrenheitTwo = (dayTwoTempPull -273.15) * 1.80 + 32;
        var dayTwoTemp = fahrenheitTwo.toFixed(1);

        var dayThreeTempPull = (week.list[20].main.temp);
        var fahrenheitThree = (dayThreeTempPull -273.15) * 1.80 + 32;
        var dayThreeTemp = fahrenheitThree.toFixed(1);

        var dayFourTempPull = (week.list[28].main.temp);
        var fahrenheitFour = (dayFourTempPull -273.15) * 1.80 + 32;
        var dayFourTemp = fahrenheitFour.toFixed(1);

        var dayFiveTempPull = (week.list[36].main.temp);
        var fahrenheitFive = (dayFiveTempPull -273.15) * 1.80 + 32;
        var dayFiveTemp = fahrenheitFive.toFixed(1);
        $(".fiveDay").html("");
        $(".fiveDay").append(`
            <h3> 5-Day Forecast: </h3>
                <div class ="dayOne">
                    <p>${week.list[4].dt_txt}</p>
                    <img src="${dayOneIcon}">
                    <p>Temp: ${dayOneTemp} 	&#8457; </p>
                    <p>Humidity: ${week.list[4].main.humidity}%</p>
                </div>

                <div class ="dayTwo">
                    <p>${week.list[12].dt_txt}</p>
                    <img src="${dayTwoIcon}">
                    <p>Temp: ${dayTwoTemp} 	&#8457; </p>
                    <p>Humidity: ${week.list[12].main.humidity}%</p>
                </div>

                <div class ="dayThree">
                    <p>${week.list[20].dt_txt}</p>
                    <img src="${dayThreeIcon}">
                    <p>Temp: ${dayThreeTemp} 	&#8457; </p>
                    <p>Humidity: ${week.list[20].main.humidity}%</p>
                </div>

                <div class ="dayFour">
                    <p>${week.list[28].dt_txt}</p>
                    <img src="${dayFourIcon}">
                    <p>Temp: ${dayFourTemp} 	&#8457; </p>
                    <p>Humidity: ${week.list[28].main.humidity}%</p>
                </div>

                <div class ="dayFive">
                    <p>${week.list[36].dt_txt}</p>
                    <img src="${dayFiveIcon}">
                    <p>Temp: ${dayFiveTemp} 	&#8457; </p>
                    <p>Humidity: ${week.list[36].main.humidity}%</p>
                </div>

        `);
    });
});

