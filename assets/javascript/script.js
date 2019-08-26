
// console.log($('.dropdown-trigger').length);
// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.dropdown-trigger');
//     var instances = M.Dropdown.init(elems, {});
//   });
$(function () {
  var shrinkHeader = 300;
  $(window).scroll(function () {
    var scroll = getCurrentScroll();
    if (scroll >= shrinkHeader) {
      $('.title').addClass('shrink');
    }
    else {
      $('.title').removeClass('shrink');
    }
  });
  function getCurrentScroll() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }
});

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

//hides the carousel until the user clicks on it
$(".carousel").hide();

//remembers the user's selection
let city = localStorage.getItem("city");
let intensity = localStorage.getItem("intensity");
let length = localStorage.getItem("length");
let duration = localStorage.getItem("duration");

if (city) {
  $("#city").val(city);
}
if (intensity) {
  $("#intensity").val(intensity);
}
if (length) {
  $("#length").val(length);
}
if (duration) {
  $("#playlist-type").val(duration);
}

// on click listener for the serach button
$("#search").on("click", function (event) {

  let city = $("#city").val();
  let intensity = $("#intensity").val();
  let length = $("#length").val();
  let duration = $("#playlist-type").val();

  // Store all content into localStorage
  localStorage.setItem("city", city);
  localStorage.setItem("intensity", intensity);
  localStorage.setItem("length", length);
  localStorage.setItem("duration", duration);


  // This tells them they need to pick parameters, if they are missing any
  $("#searchError").empty();
  //let city = $("#city").val();
  let hasCity = city !== undefined && city !== null && city !== "";
  if (hasCity === false) {
    // $("#searchError").append("You must provide a city to search.<br>");
    M.toast({ html: 'You must provide a city to search' });
  }
  //let intensity = $("#intensity").val();
  let hasIntensity = intensity !== undefined && intensity !== null && intensity !== "";
  if (hasIntensity === false) {
    $("#searchError").append("You must select a trail intensity.<br>");
  }
  //let length = $("#length").val();
  let hasLength = length !== undefined && length !== null && length !== "";
  if (hasLength === false) {
    $("#searchError").append("You must select a trail length.<br>");
  }
  //let duration = $("#playlist-type").val();
  let hasDuration = duration !== undefined && duration !== null && duration !== "";
  if (hasDuration === false) {
    $("#searchError").append("You must select a trail duration.<br>");
  }
  let valid = hasCity && hasIntensity && hasLength && hasDuration;
  if (valid === false) {
    return;
  }
  rerouteToSpotify();
});

function rerouteToSpotify() {
  window.location.href = spotifyURL;
}
//only call the geocode and trails API when ready
function callAPIs() {

  var dropdownCity = localStorage.getItem('city');
  var dropdownIntensity = localStorage.getItem('intensity');
  var dropdownLength = localStorage.getItem('length');

  //getGeocode();
  var geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
  var geocodeAddress = dropdownCity;
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
        maxDistance: "50",
      },
      method: "GET"
    }).then(function (response) {
      console.log(response);
      //intensity dropdown
      let trails = response.trails.filter(function (trail) {
        if (trail.difficulty === dropdownIntensity) {
          console.log("Trail difficulty " + trail.difficulty + " dropdown intensity " + dropdownIntensity);
          return true;
        }
      })
      //length dropdown. This calls to the API, and gets the trails that fit into the parameters I created(the different miles). 
      //Instead of a if/else statment, I did a switch statement with the minimum and maximum miles
      let minLength, maxLength;
      switch (dropdownLength) {
        case "1":
          minLength = 0;
          maxLength = 5;
          break;
        case "2":
          minLength = 5;
          maxLength = 10;
          break;
        case "3":
          minLength = 10;
          maxLength = 15;
          break;
        case "4":
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

      // Add a row to table for each trail
      trails.forEach(function (trail) {
        $("#resultsCollapsible").append(`
        <li>
          <div class="collapsible-header grey lighten-3">
            <span style="font-weight: bold;">
                ${trail.name}
            </span> 
          </div>
          <div class="collapsible-body grey lighten-3 flex">
            <img src="${trail.imgSmall}">
            <p>${trail.summary}</p>
            ${difficultyMap[trail.difficulty]} | ${trail.length} mi
            <a class="btn waves-effect waves-light grey darken-1 spotify-link" href="${trail.url}"target="_blank">More Info</a>
          </div>
        </li>
      `);




      })
      // $('.carousel.carousel-slider').carousel({
      //   fullWidth: true,
      //   indicators: true
      // });
    });
  });
} //function callAPIs





