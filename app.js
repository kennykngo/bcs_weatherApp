$(document).ready(function () {
  var api_key_kenny = "6dbe43cb883ce8ea55cc9545b5f2cea3";
  var date = moment().format("(L)");

  $("#btnSubmit").on("click", function (e) {
    var cityName = $("#textInput").val();
    $("#textInput").val("");
    e.preventDefault();
    console.log(textInput);
    currentWeather(cityName);
    futureWeather(cityName);
  });

  function currentWeather(cityName) {
    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key_kenny}`,
      dataType: "json",
      success: function (res) {
        var previousSearch = JSON.parse(localStorage.getItem("city")) || [];
        console.log(res);
        // pushes res.name (name of city) into the array;
        previousSearch.push(res.name);
        while (previousSearch.length > 8) {
          previousSearch.shift();
        }

        //clears searchHistory
        $("#searchHistory").html("");
        // prepend li elements
        for (var i = 0; i < previousSearch.length; i++) {
          $("#searchHistory").prepend(
            `<li class="card w-100 p-2">${previousSearch[i]}</li>`
          );
        }
        localStorage.setItem("city", JSON.stringify(previousSearch));

        var kelvinTemp = parseFloat(res.main.temp);
        var farenTemp = parseInt((kelvinTemp - 273.15) * 1.8 + 32);
        var weatherIcon = res.weather[0].icon;
        var currentHumidity = res.main.humidity;
        var cityName = res.name;
        var wind = parseFloat(res.wind.speed * 2.237).toFixed(2);

        var iconUrl =
          "https://openweathermap.org/img/wn/" + weatherIcon + ".png";

        $("#cityName").text(`${cityName} ${date}`);
        $("#currentHumidity").text(`Humidity: ${currentHumidity}%`);
        $("#weather-icon").attr("src", `${iconUrl}`);

        $("#currentTemp").text(`${farenTemp}ºF`);
        $("#windSpeed").text(`Wind Speed: ${wind} mph`);

        var lat = res.coord.lat;
        var lon = res.coord.lon;

        $.ajax({
          type: "GET",
          url: `https://api.openweathermap.org/data/2.5/uvi/forecast?appid=${api_key_kenny}&lat=${lat}&lon=${lon}`,
          dataType: "json",
          success: function (response) {
            console.log(response);
            var uvIndexNum = response[0].value.toFixed(2);
            console.log(uvIndexNum);
            if (uvIndexNum <= 2) {
              $("#uvIndex").html(
                `<div class="d-flex mr-2 align-items-baseline">UV Index:<p class="ml-2 p-1 bg-success rounded"> ${uvIndexNum}</p> </div>`
              );
            } else if (uvIndexNum >= 3 && uvIndexNum <= 5) {
              $("#uvIndex").html(
                `<div class="d-flex mr-2 align-items-baseline">UV Index:<p class="ml-2 p-1 bg-yellow rounded"> ${uvIndexNum}</p> </div>`
              );
            } else if (uvIndexNum >= 6 && uvIndexNum <= 7) {
              $("#uvIndex").html(
                `<div class="d-flex mr-2 align-items-baseline">UV Index:<p class="ml-2 p-1 bg-orange rounded"> ${uvIndexNum}</p> </div>`
              );
            } else {
              $("#uvIndex").html(
                `<div class="d-flex mr-2 align-items-baseline">UV Index:<p class="ml-2 p-1 bg-danger rounded"> ${uvIndexNum}</p> </div>`
              );
            }
            $("#mainContainer").removeClass("d-none");
          },
        });
      },
    });
  }

  function futureWeather(cityName) {
    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${api_key_kenny}`,
      dataType: "json",
      success: function (res) {
        $("#futureWeather").html("");
        for (var i = 0; i < 5; i++) {
          var futureDates = moment()
            .add(i + 1, "days")
            .format("L");
          var farenTemp = parseInt((res.list[i].main.temp - 273.15) * 1.8 + 32);
          var futureHumid = res.list[i].main.humidity;
          var weatherIcon = res.list[i].weather[0].icon;
          var iconUrl =
            "https://openweathermap.org/img/wn/" + weatherIcon + ".png";

          $("#futureWeather").append(`
          <div class="card futureCard"> 
            <div class="p-2 bg-primary text-white">
              <h3 class="p-2"> ${futureDates} </h3>
              <img src="${iconUrl}" style="width:50px; height: 50px"/>
              <p> Temp: ${farenTemp} ºF </p>
              <p> Humidity: ${futureHumid}% </p>
            </div>
          </div>
        `);
        }

        $("#futureWeatherContainer").removeClass("d-none");
      },
    });
  }
});

// $("#searchHistory").prepend(`<li class="card w-100">${res.name}</li>`);
// var previousSearch = JSON.parse(localStorage.getItem("city")) || [];
// // for (var i = 0; i < previousSearch.length; i++) {
// previousSearch.push(res.name);
// // }
// localStorage.setItem("city", JSON.stringify(previousSearch));
