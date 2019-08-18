// Constructing a URL to search Trails API
var trailsAPIKey = "200562733-d1da5fe78fcd60535046cfa0d06ea12f";
var latitude = "40.588";
var longitude = "-111.6380";
var maxDistance = "10";

var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + latitude + "&lon="
    + longitude + "&maxDistance=" + maxDistance + "&key=" + trailsAPIKey;

function getTrails(queryURL) {

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

        // Printing the entire object to console
        console.log(response);
        var results = response.trails;
        $("#trails-div").empty();

          // Looping over every result item
    for (var i = 0; i < results.length; i++) {

        var trailName = $("<h3>").text(results[i].name);
        var trailDifficulty =$("<h6>").text(results[i].difficulty);
        var trailURL = $("<a target='_blank'>").attr("href", results[i].url).append(trailName);
        var trailImage = $("<img>").attr("src", results[i].imgSmall);
        var trailLength = $("span").text("Length "+results[i].length)
        var trailSummary = $("<h6>").text(results[i].summary);

        $("#trails-div").append(trailURL, trailDifficulty,trailImage, trailLength, trailSummary);
    }
        
    });
}

 // Event handler for user clicking the select-trail button
 $("#select-trail").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    //var inputTrail = $("#longitude-input").val().trim();

    // Running the searchBandsInTown function(passing in the artist as an argument)
    getTrails(queryURL);
  });