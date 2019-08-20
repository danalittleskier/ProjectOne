
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