$(document).ready(function () {
  var api_key_kenny = "6dbe43cb883ce8ea55cc9545b5f2cea3";
  var date = moment().format("(L)");

  $("#btnSubmit").on("click", function (e) {
    // $("#mainContainer").removeClass("d-none");
    var cityName = $("#textInput").val();
    $("#textInput").val("");
    e.preventDefault();
    console.log(textInput);
    currentWeather(cityName);
    // searchHistory();
  });

  function currentWeather(cityName) {
    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key_kenny}`,
      dataType: "json",
      success: function (res) {
        console.log(cityName);
        // $("#searchHistory").prepend(`<li class="card w-100">${res.name}</li>`);
        // var previousSearch = JSON.parse(localStorage.getItem("city")) || [];
        // // for (var i = 0; i < previousSearch.length; i++) {
        // previousSearch.push(res.name);
        // // }
        // localStorage.setItem("city", JSON.stringify(previousSearch));
        // function searchHistory() {
        var previousSearch = JSON.parse(localStorage.getItem("city")) || [];
        for (var i = 0; i < previousSearch.length; i++) {
          $("#searchHistory").prepend(
            `<li class="card w-100 list-style-none">${previousSearch[i]}</li>`
          );
        }
        // }

        previousSearch.push(res.name);
        localStorage.setItem("city", JSON.stringify(previousSearch));

        console.log(res);

        var kelvinTemp = parseFloat(res.main.temp);
        // console.log(kelvinTemp);
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
            if (uvIndexNum <= 2) {
              $("#uvIndex").html(
                `<div class="d-flex mr-2 align-items-baseline">UV Index:<p class="ml-2 p-1 bg-danger rounded"> ${uvIndexNum}</p> </div>`
              );
            } else {
              $("#uvIndex").html(
                `<div class="d-flex mr-2 align-items-baseline">UV Index:<p class="ml-2 p-1 bg-danger rounded"> ${uvIndexNum}</p> </div>`
              );
            }

            // function searchHistory() {
            //   var searchHistory =
            //     JSON.parse(localStorage.getItem("city")) || [];
            //   $("#searchHistory").empty();
            //   for (i = 0; i < searchHistory.length; i++) {
            //     $("#searchHistory").prepend(
            //       `<li class="card">${searchHistory[i]}</li>`
            //     );
            //   }
            // }

            console.log(uvIndexNum);
            $("#mainContainer").removeClass("d-none");
          },
        });
      },
    });
  }
});
