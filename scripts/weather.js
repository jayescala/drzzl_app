// IP-API Data
const getLocation = () => {
  $.ajax({
    url: "https://drzzl.herokuapp.com/ip",
    method: "get",
    dataType: "json",
    success: function(res) {
      $("#city-name").empty();
      $("#city-name").append($("<h1>").text(res.city));
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
  console.log();
  $.ajax({
    url: "https://drzzl.herokuapp.com/openweather/current/" + $("#city-name").text(),
    method: "get",
    dataType: "json",
    success: function(data) {
      $("#temperature").empty();
      $("#temperature").append($("<h1>").text(Math.round(data.main.temp) + " F"));
    },
    fail: function(err) {
      console.log(err);
      $("#temperature").empty();
    }
  });
}

// Open Weather Forecast Data
const rainCheck = () => {
  $.ajax({
    url: "https://drzzl.herokuapp.com/openweather/forecast/" + $("#city-name").text(),
    method: "get",
    dataType: "json",
    success: function(data) {
      let rainCount = 0;
      for(let i = 0; i <= 8; i++){
        if(data.list[i].rain !== {}){
          rain = true;
        }
      }
      $("#weather").empty();
      if(rain === true){
        $("#weather").append($("<h1/>").text("It's going to rain!"));
      } else if(rain === false){
        $("#weather").append($("<h1/>").text("Not raining today!"));
      }
    },
    fail: function(err) {
      console.log(err);
      $("#weather").empty();
    }
  });
}

// Reddit Data
const displayRedditFeed = () => {
  $.ajax({
    url: "https://drzzl.herokuapp.com/reddit/",
    method: "get",
    dataType: "json",
    success: function(data) {
      console.log("hit the success function")
      console.log("hit the success function")
      console.log("hit the success function")
      console.log("hit the success function")
      console.log("hit the success function")
      console.log("hit the success function")
      console.log("hit the success function")
      for(i = 0; i < 4; i++){
        let $img = $("<img>").attr("src", data.list[i].thumbnail).addClass("gallery-image");
        let $a = $("<a>").attr("href", data.list[i].url);
        $a.append($img);
        $("#gallery-row-1").append($a);
      }
      for(j = 4; j < 8; j++){
        let $img = $("<img>").attr("src", data.list[j].thumbnail).addClass("gallery-image");
        let $a = $("<a>").attr("href", data.list[j].url);
        $a.append($img);
        $("#gallery-row-2").append($a);
      }
    },
    fail: function(err) {
      console.log("hit the fail function")
      console.log("hit the fail function")
      console.log("hit the fail function")
      console.log("hit the fail function")
      console.log("hit the fail function")
      console.log(err);
      $(".weatherCondition").empty();
    }
  });
}

// Run Script
$(document).ready((event) => {
  getLocation();
  displayRedditFeed();
});
