//format dates for RAWG url
//only takes YYYY-MM-DD
//arg checks for argument "last-month"  in getGames to set last month date
var formatDates = function (arg) {
  var initial = new Date();
  if (arg == "last-month") {
    var date = new Date(
      initial.getFullYear(),
      initial.getMonth() - 1,
      initial.getDate()
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
  var month = date.getMonth() + 1;
  if (month < 10) {
    month = "" + 0 + month;
  }
  //i miss moment.js
  var year = date.getFullYear();
  var formated = year + "-" + month + "-" + day;
  return formated;
};
var getGames = function (genre) {
  var lastMonth = formatDates("last-month");
  var today = formatDates();
  //gets most popular games from the last month
  var apiUrl =
    "https://api.rawg.io/api/games?tags=" +
    genre +
    "&dates=" +
    lastMonth +
    "," +
    today +
    "&ordering=-added&key=d1ca06a37be445e396ab6a2c11ae8516";
  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      var results = data.results;
      console.log(results);
      displayGames(results);
    });
  });
};
var displayGames = function (results) {
  var orderedListEl = document.querySelector("#game-list > ul:first-of-type");
  for (var i = 0; i < 9; i++) {
    var name = results[i].name;
    var platformList = "";
    for (var n = 0; n < results[i].platforms.length; n++) {
      if (results[i].platforms[n]) {
        var newItem = results[i].platforms[n].platform.name;
        platformList += newItem + " ";
      } else {
        break;
      }

      console.log(newItem);
    }
    var listEl = document.createElement("li");
    listEl.textContent = name + "---" + platformList;
    orderedListEl.appendChild(listEl);
  }
};
getGames("horror");


//format for IMDb 
//basic function to grab genre information from imdb api
function getMovies (genres) {
    fetch("https://imdb-api.com/API/AdvancedSearch/k_8usbkevm/?genres=" + genres + "&title="
    )
    .then((response) => response.json())
    .then((data) => this.displayMovies(data))
}
//should work once classes are in place I tested on separate build
function displayMovies(data){
    for(i=0;i<10;i++){
  var {title} = data.results[i]
   document.querySelector(".movieTitle-placeHolder").innerHTML = title
    const {genres} = data.results[i]
    document.querySelector(".movieGenres-placeHolder").innerHTML = genres
    console.log(genres)
    console.log(title)
    }
}

//grabs from searchbar class assuming we will use one 
function search(){
    this.getMovies(document.querySelector(".search-bar-placeHolder").value)
 }
 //grabs from button class when user inputs genre of choice 
 document.querySelector(".btn-placeHolder").addEventListener("click", function(){
    search()
})
//placeholder call
getMovies("Action")