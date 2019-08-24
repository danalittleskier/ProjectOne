var accessCode;
var clientID = "ab78c9bfe2104f2e9e01b86f908541a9";

var ourProjectURL = (typeof localURL !== "undefined") ? localURL : "https://danalittleskier.github.io/ProjectOne/";

var encodedProjectURL = encodeURIComponent(ourProjectURL);
var spotifyURL = "https://accounts.spotify.com/authorize?client_id=" + clientID + "&response_type=token&redirect_uri=" + encodedProjectURL + "&scope=user-read-private%20user-read-email"; // &state=34fFs29kd09"

$("#music-list").on("click", function (event) {

    window.location.href = spotifyURL;
  
  });
  
  $(document).ready(function () {
    //Changed to grabing hash
    var urlParams = new URLSearchParams(window.location.hash.substr(1));
    accessCode = urlParams.get('access_token');
  
    if (accessCode) {

      $.ajax({
          url: "https://api.spotify.com/v1/search",
          headers: {
            'Authorization': 'Bearer ' + accessCode
          },
          data : {
            q: "Hiking",
            type: "playlist",
            limit: 10
          },
          success: function(response){
              console.log(response);
              let artists = response.playlists.items;
              let trackDiv = $("<div align='right'><ul>");

              artists.forEach(function (artist) {
                
                $.ajax({
                    url: "https://api.spotify.com/v1/playlists/"+artist.id+"/tracks",
                    headers: {
                      'Authorization': 'Bearer ' + accessCode
                    },
                    data : {
                      limit: 10
                    },
                    success: function(response){ 
                        console.log(response);
                        let tracks = response.items;
                        trackDiv.empty();
                        tracks.forEach(function (element) {
                            trackDiv.append(`<li> ${element.track.name} </li>`);
                            console.log(element.track.name);
                            console.log(trackDiv.text());
                        });
                    }
                });

                $("#resultsMusic").append(`
                <li>
                  <div class="collapsible-header">
                    <span style="font-weight: bold;">
                        ${artist.name}
                    </span> 
                  </div>
                  <div class="collapsible-body flex">
                    <img src="${artist.images[artist.images.length-1].url}">
                    <p>${artist.id}</p>
                    ${trackDiv.text()}
                    <a href="${artist.external_urls.spotify}"target="_blank">More Info</a>
                  </div>
                  ${trackDiv.text()}
                </li>
              `);
            })
        }
    });

     
 }
});
   