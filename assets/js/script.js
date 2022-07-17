//grabs from searchbar class assuming we will use one
var search = function (event) {
  var targetEl = event.target;
  if (event.target.matches(".btn")) {
    var genre = document.getElementById("genre").value;
    console.log(genre);
    //getMovies now called in getGames to validate genre
    getGames(genre);
    getBooks(genre);
  }
};
// //grabs from button class when user inputs genre of choice
document.querySelector(".input-field").addEventListener("click", search);

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
  genre = genre.toLowerCase();
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
      if (data.count == 0) {
        var apiUrl =
          "https://api.rawg.io/api/games?genres=" +
          genre +
          "&dates=" +
          lastMonth +
          "," +
          today +
          "&ordering=-added&key=d1ca06a37be445e396ab6a2c11ae8516";
        fetch(apiUrl).then(function (response) {
          response.json().then(function (data) {
            if (data.count == 0) {
              //error message
              genreValidationModal();
              return false;
            } else {
              //getMovies now called here to validate genre
              getMovies(genre);
              var results = data.results;
              displayGames(results);
              storeItem(genre, "games", results);
            }
          });
        });
      } else {
        //getMovies now called here to validate genre
        getMovies(genre);
        var results = data.results;
        displayGames(results);
        storeItem(genre, "games", results);
      }
    });
  });
};

// var storeItem = function (genre, media, data) {
//   localStorage.setItem(genre + media, JSON.stringify(data));
// };

var searchHistory = [];

var storeItem = function (genre) {
  if (searchHistory.indexOf(genre) !== -1) {
    return;
  }
  var genreArr = JSON.parse(localStorage.getItem("genreArr")) || [];
  genreArr.push(genre);
  localStorage.setItem("genreArr", JSON.stringify(genreArr));
};

var displayGames = function (results) {
  var orderedListEl = document.querySelector("#gameList > ul:first-of-type");
  orderedListEl.innerHTML = "";
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
    }
    var listEl = document.createElement("li");
    listEl.classList = "row";
    listEl.innerHTML =
      "<img src='" +
      results[i].background_image +
      "' class = 'col s4 circle responsive-img'><span class='col s8'>" +
      name +
      "</span><span class='col s8'>" +
      platformList +
      "</span>";
    orderedListEl.appendChild(listEl);
  }
};
var getBooks = function (genre) {
  const options = {
    method: "GET",
    headers: {
      "x-rapidAPI-Key": "e1a7805621msh007883c822e3da0p1e2f44jsn5f89d4d71451",
      "X-RapidAPI-Host": "hapi-books.p.rapidapi.com",
    },
  };

  fetch("https://hapi-books.p.rapidapi.com/week/" + genre, options).then(
    function (response) {
      response.json().then(function (data) {
        // storeItem(genre, "books", data);
        displayBooks(data);
      });
    }
  );
};

function displayBooks(data) {
  var orderedListEl = document.querySelector("#bookList > ul:first-of-type");
  orderedListEl.innerHTML = "";
  for (i = 0; i < 10; i++) {
    var title = data[i].name;
    var img = data[i].cover
    var listEl = document.createElement("li");
    
    listEl.innerHTML =
      title +
      "  " +
      img +
      "<a href='" +
      data[i].url +
      "' target='_blank'git>Goodreads</a>";
    orderedListEl.appendChild(listEl);
  }
}

//format for IMDb
//basic function to grab genre information from imdb api
//only 100 requests a day so be careful of that
function getMovies(genres) {
  fetch(
    "https://imdb-api.com/API/AdvancedSearch/k_8usbkevm/?genres=" +
      genres +
      "&title_type=feature"
  ).then(function (response) {
    response.json().then(function (data) {
      if (data.count == 0) {
        //error message

        return false;
      } else {
        displayMovies(data);
        // storeItem(genres, "movies", data);
      }
    });
  });
}

function displayMovies(data) {
  var orderedListEl = document.querySelector("#movieList > ul:first-of-type");
  orderedListEl.innerHTML = "";
  for (i = 0; i < 10; i++) {
    var title = data.results[i].title;
    var genres = data.results[i].genres;
    var img = data.results[i].image
    var listEl = document.createElement("li");
    listEl.textContent = title + ", Genre:" + genres + img;
    orderedListEl.appendChild(listEl);
  }
}

function genreValidationModal() {
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  // var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  // function displyModal() {
  modal.style.display = "block";
  // }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

var genreButtonEl = document.querySelector("#history-button");

var loadHistory = function () {
  var savedGenre = localStorage.getItem("genreArr");
  if (savedGenre) {
    searchHistory = JSON.parse(savedGenre);
  }
  console.log(searchHistory);
  createButtonEl();
};

var createButtonEl = function () {
  for (var i = 0; i <= searchHistory.length - 1; i++) {
    var genreButton = document.createElement("button");
    genreButton.textContent = searchHistory[i];
    genreButton.setAttribute("data-genre", searchHistory[i]);
    console.log(i);
    genreButtonEl.appendChild(genreButton);
  }
};

var buttonGenre = function (event) {
  console.log("clicked history");
  var button = event.target;
  var buttonclick = button.getAttribute("data-genre");
  console.log(buttonclick);
  getMovies(buttonclick);
  getGames(buttonclick);
  getBooks(buttonclick);
};

genreButtonEl.addEventListener("click", buttonGenre);
loadHistory();
var backgroundTransition = function () {
  var urls = ["Action-img-2.jpg", "Horror-img-1.jpg", "Mystery-img-1.jpg", "Scifi-img-1.jpg", "Action-img-3.jpg", "fantasy-img-2.jpg", "Horror-img-2.jpg", "Mystery-img-2.jpg", "Scifi-img-2.jpg", "fantasy-img-4.jpg", "Horror-img-3.jpg", "Scifi-img-3.jpg", "Action-img-4.jpg", "Horror-img-4.jpg", "Scifi-img-4.jpg"]
  var index = 0;
  setInterval(function () {
    if (index == urls.length) {
      index = 0;
    }
    console.log("loop")
    document.body.style.backgroundImage = "url('./assets/images/" + urls[index] + "')"

    index++
  }, 3000)
}
backgroundTransition();
