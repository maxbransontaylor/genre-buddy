var getGames = function (genre) {
  var date = new Date();
  console.log(date);
  var apiUrl =
    "https://api.rawg.io/api/games?page_size=10&tags=" +
    genre +
    "&dates=" +
    lastWeek +
    "," +
    today +
    "&ordering=-rating&key=d1ca06a37be445e396ab6a2c11ae8516";
};
