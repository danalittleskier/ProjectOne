
// console.log($('.dropdown-trigger').length);
// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.dropdown-trigger');
//     var instances = M.Dropdown.init(elems, {});
//   });


// on click listener for the serach button
$("#search").on("click", function (event) {
  var queryURL = "https://www.hikingproject.com/data/get-trails"
  $.ajax({
    url: queryURL,
    data: {
      key: "200562733-d1da5fe78fcd60535046cfa0d06ea12f",
      lat: "40.5888",
      lon: "-111.6380",
      maxDistance: "10",
    },
    method: "GET"
  }).then(function (response) {
    response.trails.forEach(function(trail) {
      var trailName = $("<h3>").text(trail.name);
        var trailDifficulty =$("<h6>").text(trail.difficulty);
        var trailURL = $("<a target='_blank'>").attr("href", trail.url).append(trailName);
        var trailImage = $("<img>").attr("src", trail.imgSmall);
        var trailLength = $("<span>").text("Length "+ trail.length)
        var trailSummary = $("<h6>").text(trail.summary);

        $("#results").append(trailURL, trailDifficulty,trailImage, trailLength, trailSummary);

    })
  });
});

//spotify api example
$("#music-list").on("click", function (event) {
  
  var ourProjectURL = "https://danalittleskier.github.io/ProjectOne/";
  var queryURL = "https://accounts.spotify.com/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri="+ ourProjectURL +"&scope=user-read-private%20user-read-email&state=34fFs29kd09"
  window.location.href = queryURL;

  // console.log(queryURL);
  // $.ajax({
  //   url: queryURL,
  //   method: "GET"
  // }).then(function (response) {
  //   console.log(response);
  //   })
});