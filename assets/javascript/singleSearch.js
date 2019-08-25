var accessCode;
var clientID = "ab78c9bfe2104f2e9e01b86f908541a9";

var ourProjectURL = (typeof localURL !== "undefined") ? localURL : "https://danalittleskier.github.io/ProjectOne/";

var encodedProjectURL = encodeURIComponent(ourProjectURL);
var spotifyURL = "https://accounts.spotify.com/authorize?client_id=" + clientID + "&response_type=token&redirect_uri=" + encodedProjectURL + "&scope=user-read-private%20user-read-email"; // &state=34fFs29kd09"
console.log("begin again")
$("#music-list").on("click", function (event) {

    window.location.href = spotifyURL;
    //This will insert timestamp into localStorage which will tell us if application
    //  was redirected to spotify is returning.
    localStorage.setItem("traTunSpotRedir",getTime())
  });
   