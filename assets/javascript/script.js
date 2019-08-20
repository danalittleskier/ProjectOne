
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
    //length dropdown
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
    if (trails.length > 0) {
      $("#results").show();
      $("#results").empty();
    } else {
      $("#results").hide();
    }

    //add column headers to table dynamically
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



