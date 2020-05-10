$(document).ready(function () {
  var api_key = "6dbe43cb883ce8ea55cc9545b5f2cea3";
  var textInput = "";

  $("#btnSubmit").on("click", function (e) {
    e.preventDefault();
    textInput = $("#textInput").val();

    $.ajax({
      type: "GET",
      // url: `api.openweathermap.org/data/2.5/weather?q=San%20Francisco&appid=${api_key}`,
      url: `https://api.openweathermap.org/data/2.5/weather?q=${textInput}&appid=${api_key}`,
      // lat=35&lon=139
      dataType: "json",
      success: function (res) {
        console.log(res);
        console.log(res.name);
        console.log(res.main.temp);

        var kelvinTemp = parseFloat(res.main.temp);
        // console.log(kelvinTemp);
        console.log((kelvinTemp - 273.15) * 1.8 + 32);

        console.log(res.main.humidity);
        var weatherIcon = res.weather[0].icon;
        var iconUrl =
          "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
        $("body").prepend(
          // `<img src="https://openweathermap.org/"+'${weatherIcon}'/>`
          `<img id="weatherIcon" src="${iconUrl}"/>`
        );
      },
      // }).then(function (res) {
    });
  });

  // (function (res) {
  //   console.log(res);
  //   console.log(res.name);

  // });
});
