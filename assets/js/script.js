//format dates for RAWG url
//only takes YYYY-MM-DD
//arg checks for argument "last-week"  in getGames to set last weeks date
var formatDates = function (arg) {
  var initial = new Date();
  if (arg == "last-week") {
    var date = new Date(
      initial.getFullYear(),
      initial.getMonth(),
      initial.getDate() - 7
    );
  } else {
    var date = initial;
  }
  //converts possible D to DD
  var day = date.getDate();
  if (day < 10) {
    day = "" + 0 + day;
  }
  //converts possible M to MM
  var month = date.getMonth();
  if (month < 10) {
    month = "" + 0 + month;
  }
  //i miss moment.js
  var year = date.getFullYear();
  var formated = year + "-" + month + "-" + day;
  return formated;
};
var getGames = function (genre) {
  var lastWeek = formatDates("last-week");
  var today = formatDates();
  //gets top rated games from the past week
  var apiUrl =
    "https://api.rawg.io/api/games?page_size=10&tags=" +
    genre +
    "&dates=" +
    lastWeek +
    "," +
    today +
    "&ordering=-rating&key=d1ca06a37be445e396ab6a2c11ae8516";
  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
    });
  });
};
getGames("horror");
