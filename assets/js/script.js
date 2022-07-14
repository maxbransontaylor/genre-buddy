
//format for IMDb 
//basic function to grab genre information from imdb api
function getMovies (genres) {
  fetch("https://imdb-api.com/API/AdvancedSearch/k_8usbkevm/?genres=" + genres + "&title_type=feature"
  )
  .then((response) => response.json())
  .then((data) => displayMovies(data))
}
//should work once classes are in place, I tested on a separate build
function displayMovies(data){
  for(i=0;i<10;i++){
var title = data.results[i].title
 document.querySelector(".titles").innerHTML = data.results[0].title + ", Genre: " + genres
 document.querySelector(".titles1").innerHTML = data.results[1].title + ", Genre: " + genres
 document.querySelector(".titles2").innerHTML = data.results[2].title + ", Genre: " + genres
 document.querySelector(".titles3").innerHTML = data.results[3].title + ", Genre: " + genres
 document.querySelector(".titles4").innerHTML = data.results[4].title + ", Genre:" + genres
var genres = data.results[i].genres
 
  
 console.log(genres)
  console.log(title)
  }
}
//

//grabs from searchbar class assuming we will use one 
function search(){
getMovies(document.querySelector(".search-bar").value)
}
//grabs from button class when user inputs genre of choice 
document.querySelector(".btn").addEventListener("click", function(){
search()
})
getMovies("Action")