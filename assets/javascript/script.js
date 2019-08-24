
// console.log($('.dropdown-trigger').length);
// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.dropdown-trigger');
//     var instances = M.Dropdown.init(elems, {});
//   });

//global variables for color difficulties
var difficultyMap = {
  green: "easy",
  greenBlue: "easy to moderate",
  blue: "moderate",
  blueBlack: "moderate to difficult",
  black: "difficult",
}
//hides the table until the user clicks on it
$("#resultsCollapsible").hide();

// on click listener for the serach button
$("#search").on("click", function (event) {

  // This tells them they need to pick parameters, if they are missing any
  $("#searchError").empty();
  let city = $("#city").val();
  let hasCity = city !== undefined && city !== null && city !== "";
  if (hasCity === false) {
    // $("#searchError").append("You must provide a city to search.<br>");
    M.toast({html: 'You must provide a city to search'});
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
  let valid = hasCity && hasIntensity && hasLength && hasDuration;
  if (valid === false) {
    return;
  }


  //getGeocode();
  var geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
  var geocodeAddress = $("#city").val();
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
      //intensity dropdown
      let trails = response.trails.filter(function (trail) {
        if (trail.difficulty === $("#intensity").val()) {
          return true;
        }
      })
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
      trails = trails.filter(function (trail) {
        if (trail.length >= minLength && trail.length <= maxLength) {
          return true;
        }
      });
      // Show table (and column names) if there are more than zero results
      //hides it if there are none that match
      if (trails.length > 0) {
        $("#resultsCollapsible").show();
        $("#resultsCollapsible").empty();
      } else {
        $("resultsCollapsible").hide();
        // $("#searchError").append("<h5> 'Looks like you're a little off the trail, we couldn't find anything to match your search. Try adjusting the difficulty or increasing the distance' </h5>");
        $("#searchError").append("<div id='spacer'> <img id='empty' src= 'assets/images/trees2-01.svg'> </div>");
      }

      //add column headers to table dynamically
      //originally had this hard coded into the HTML, but need to add it with JS, because I needed to empty the table, and it would emply the table headers too
      // $("#results").append(
      //   $(`
      //   <tr>
      //     <th>Name</th>
      //     <th>Difficulty</th>
      //     <th>Image</th>
      //     <th>Length</th>
      //     <th>Summary</th>
      //   </tr>  
      // `)
      // );

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
        // $("#results").append(
        //   $(`
        //     <tr>
        //       <td>
        //         <a href="${trail.url}">${trail.name}</a>
        //       </td>
        //       <td>
        //         ${difficultyMap[trail.difficulty]}
        //       </td>
        //       <td>
        //         <img src="${trail.imgSmall}">
        //       </td>
        //       <td>
        //         ${trail.length}
        //       </td>
        //       <td>
        //         ${trail.summary}
        //       </td>      
        //     </tr>     
        //   `)
        // );
        $("#resultsCollapsible").append(`
        <li>
          <div class="collapsible-header">
            <span style="font-weight: bold;">
                ${trail.name}
            </span> 
          </div>
          <div class="collapsible-body flex">
            <img src="${trail.imgSmall}">
            <p>${trail.summary}</p>
            ${difficultyMap[trail.difficulty]} | ${trail.length} mi
            <a href="${trail.url}"target="_blank">More Info</a>
          </div>
        </li>
      `);
    })
  });
});
});





