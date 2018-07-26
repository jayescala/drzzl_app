// IP-API Data
const getLocation = () => {
  $.ajax({
    url: "http://localhost:3000/ip",
    method: "get",
    dataType: "json",
    success: function(res) {
      $("#city-name").empty();
      $("#city-name").text(res.city);
      getCurrentWeather();
      rainCheck();
    },
    fail: function(err) {
      console.log(err);
      $("#city-name").empty();
    }
  });
}

// Open Weather Current Data
const getCurrentWeather = () => {
  $.ajax({
    url: "http://localhost:3000/openweather/current/" + $("#city-name").text(),
    method: "get",
    dataType: "json",
    success: function(data) {
      $("#weather-output").empty();
      $("#weather-output").append($("<h2>").text(Math.round(data.main.temp)));
    },
    fail: function(err) {
      console.log(err);
      $("#weather-output").empty();
    }
  });
}

// Open Weather Forecast Data
const rainCheck = () => {
  $.ajax({
    url: "http://localhost:3000/openweather/forecast/" + $("#city-name").text(),
    method: "get",
    dataType: "json",
    success: function(data) {
      let rain = false;
      for(let i = 0; i <= 8; i++){
        if(data.list[i].rain !== {}){
          rain = true;
        }
      }
      $("#rain-output").empty();
      if(rain === true){
        $("#rain-output").append($("<h2/>").text("Yes"));
      } else if(rain === false){
        $("#rain-output").append($("<h2/>").text("No"));
      }
    },
    fail: function(err) {
      console.log(err);
      $("#rain-output").empty();
    }
  });
}

// Run Script
$(document).ready((event) => {
  getLocation();
});
