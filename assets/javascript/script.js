
// console.log($('.dropdown-trigger').length);
// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.dropdown-trigger');
//     var instances = M.Dropdown.init(elems, {});
//   });

//hides the table until the user clicks on it
$("#results").hide();

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
    // Show table (and column names) if there are more than zero results
    if (response.trails.length > 0) {
      $("#results").show();
    }
    // Add a row to table for each trail
    response.trails.forEach(function(trail) {
        // Creates link tag
        var trailLink = $("<a>").attr("href", trail.url).text(trail.name);
        // Creates name column
        var nameColumn = $("<td>").append(trailLink);
        // Creates difficulty column
        var difficultyColumn = $("<td>").text(trail.difficulty);
        // Creates trail image
        var trailImage = $("<img>").attr("src", trail.imgSmall);
        // Creates image column
        var imageColumn = $("<td>").append(trailImage);
        // Creates length column
        var lengthColumn = $("<td>").text(trail.length);
        // Creates summary column
        var summaryColumn = $("<td>").text(trail.summary); 
        // Creates row element and append columns to row
        var row = $("<tr>").append(nameColumn, difficultyColumn, imageColumn, lengthColumn, summaryColumn);
        // Append row to table
        $("#results").append(row);

    })
  });
});


