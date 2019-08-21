
// console.log($('.dropdown-trigger').length);
// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.dropdown-trigger');
//     var instances = M.Dropdown.init(elems, {});
//   });

//hides the table until the user clicks on it
$("#results").hide();

// Validates user options when search is clicked.
function validate() {
  // Returns true if all fields have values. Otherwise false.
  return valid;
}

// on click listener for the serach button
$("#search").on("click", function (event) {

  // Validate if user has provided options.
  $("#searchError").empty();
  let location = $("#location").val();
  let hasLocation = location !== undefined && location !== null && location !== "";
  if (hasLocation === false) {
    $("#searchError").append("You must provide a location to search.<br>");
  }
  let intensity = $("#intensity").val();
  let hasIntensity = intensity !== undefined && intensity !== null && intensity !== "";
  if (hasIntensity === false) {
    $("#searchError").append("You must select a trail intensity.<br>");
  }
  let length = $("#length").val();
  let hasLength = length !== undefined && length !== null && length !== "";
  if (hasLength === false) {
    $("#searchError").append("You must select a trail length.<br>");
  }
  let duration = $("#duration").val();
  let hasDuration = duration !== undefined && duration !== null && duration !== "";
  if (hasDuration === false) {
    $("#searchError").append("You must select a trail duration.<br>");
  }
  let valid = hasLocation && hasIntensity && hasLength && hasDuration;
  if (valid === false) {
    return;
  }

  //getGeocode();
  var geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
  var geocodeAddress = $("#location").val();
  var geocodeKey = "&key=AIzaSyBA9Yt7UsjtvyCblUWBK0z6qb42GT8M8ok";
  var geocodeRequest = geocodeURL + geocodeAddress + geocodeKey;
  $.ajax({
    url: geocodeRequest,
    method: "GET"
  }).then(function (response) {
    let geoReturn = response.results[0];
    let geoLat = geoReturn.geometry.location.lat;
    let geoLng = geoReturn.geometry.location.lng;
    //not sure where to use this yet
    //let geoAddr = geoReturn.formatted_address;


    let queryURL = "https://www.hikingproject.com/data/get-trails";
    $.ajax({
      url: queryURL,
      data: {
        key: "200562733-d1da5fe78fcd60535046cfa0d06ea12f",
        lat: geoLat,
        lon: geoLng,
        maxDistance: "25",
      },
      method: "GET"
    }).then(function (response) {
      //length dropdown. This calls to the API, and gets the trails that fit into the parameters I created(the different miles).
      //Instead of a if/else statment, I did a switch statement with the minimum and maximum miles
      let minLength, maxLength;
      switch ($("#length").val()) {
        case "1":
          minLength = 0;
          maxLength = 5;
          break;
        case "2":
          minLength = 5;
          maxLength = 10;
          break;
        case "3":
          minLength = 15;
          break;
      }
      let trails = response.trails.filter(function (trail) {
        if (trail.length >= minLength && trail.length <= maxLength) {
          return true;
        }
      });
      // Show table (and column names) if there are more than zero results
      //hides it if there are none that match
      if (trails.length > 0) {
        $("#results").show();
        $("#results").empty();
      } else {
        $("#results").hide();
      }

      //add column headers to table dynamically
      //originally had this hard coded into the HTML, but need to add it with JS, because I needed to empty the table, and it would emply the table headers too
      $("#results").append(
        $(`
        <tr>
          <th>Name</th>
          <th>Difficulty</th>
          <th>Image</th>
          <th>Length</th>
          <th>Summary</th>
        </tr>
      `)
      );

      // Add a row to table for each trail
      trails.forEach(function (trail) {
        // Creates link tag
        // var trailLink = $("<a>").attr("href", trail.url).text(trail.name);
        // // Creates name column
        // var nameColumn = $("<td>").append(trailLink);
        // // Creates difficulty column
        // var difficultyColumn = $("<td>").text(trail.difficulty);
        // // Creates trail image
        // var trailImage = $("<img>").attr("src", trail.imgSmall);
        // // Creates image column
        // var imageColumn = $("<td>").append(trailImage);
        // // Creates length column
        // var lengthColumn = $("<td>").text(trail.length);
        // // Creates summary column
        // var summaryColumn = $("<td>").text(trail.summary);
        // // Creates row element and append columns to row
        // var row = $("<tr>").append(nameColumn, difficultyColumn, imageColumn, lengthColumn, summaryColumn);
        // // Append row to table
        // $("#results").append(row);

        //changed above code from JQuery tag building to JS template string
        $("#results").append(
          $(`
            <tr>
              <td>
                <a href="${trail.url}">${trail.name}</a>
              </td>
              <td>
                ${trail.difficulty}
              </td>
              <td>
                <img src="${trail.imgSmall}">
              </td>
              <td>
                ${trail.length}
              </td>
              <td>
                ${trail.summary}
              </td>
            </tr>
          `)
        );

      })
    });
  });
});



//spotify api example
$("#music-list").on("click", function (event) {

  var clientID = "ab78c9bfe2104f2e9e01b86f908541a9";
  var ourProjectURL = encodeURIComponent("https://danalittleskier.github.io/ProjectOne/");
  var queryURL = "https://accounts.spotify.com/authorize?client_id=" + clientID + "&response_type=code&redirect_uri=" + ourProjectURL + "&scope=user-read-private%20user-read-email"; // &state=34fFs29kd09"

  window.location.href = queryURL;

  // console.log(queryURL);
  // $.ajax({
  //   url: queryURL,
  //   method: "GET"
  // }).then(function (response) {
  //   console.log(response);
  //   })
});
