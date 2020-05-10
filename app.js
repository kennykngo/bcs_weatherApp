$(document).ready(function () {
  console.log("hello world");
  var api_key = "6dbe43cb883ce8ea55cc9545b5f2cea3";
  // var textInput = $("#textInput").val();

  $.ajax({
    type: "GET",
    // url: `api.openweathermap.org/data/2.5/weather?q=San%20Francisco&appid=${api_key}`,
    url: `https://api.openweathermap.org/data/2.5/weather?q=san%20francisco&appid=${api_key}`,
    // lat=35&lon=139
    dataType: "json",
    success: function (res) {
      console.log(res);
      console.log(res.name);
    },
    // }).then(function (res) {
  });

  // (function (res) {
  //   console.log(res);
  //   console.log(res.name);

  // });
});

/*
f('datahere', '201', ')

*/
