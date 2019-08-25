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
              let playlists = response.playlists.items;
              var trackDiv = $("<div>");

              let emptyArr = [];
              console.log(emptyArr);

              playlists.forEach(function (playlist) {
                
                emptyArr.push($.ajax({
                    url: "https://api.spotify.com/v1/playlists/"+playlist.id+"/tracks",
                    headers: {
                      'Authorization': 'Bearer ' + accessCode
                    },
                    data : {
                      limit: 10
                    },
                    success: function(response){ 
                        //console.log(response);
                        let tracks = response.items;
                        trackDiv.empty();
                        tracks.forEach(function (element) {
                            trackDiv.append("<li> "+element.track.name+"</li>");

                        });
                        // console.log("My 1st track div " +trackDiv.text());

                      //   $(".container").append(`
                      //   <li>
                      //     <div class="collapsible-header">
                      //       <span style="font-weight: bold;">
                      //           ${playlist.name}
                      //       </span> 
                      //     </div>
                      //     <div class="collapsible-body flex">
                      //       <img src="${playlist.images[playlist.images.length-1].url}">
                      //       <p>${playlist.id}</p>
                      //       ${"Foobar "+trackDiv.text()}
                      //       <a href="${playlist.external_urls.spotify}"target="_blank">More Info</a>
                       
                      //     </div>
                          
                      //   </li>
                      // `);

                      console.log($(".carousel").length);
                      console.log(playlist.images[playlist.images.length-1].url);

                        $(".carousel").append(`
                        <div class="carousel-item red white-text" href="${playlist.external_urls.spotify}" target="_blank">
                          <img src="${playlist.images[playlist.images.length-1].url}">
                          <h2>${playlist.name}</h2>
                          <p class="white-text"> ${"Foobar"+trackDiv.text()}</p>
                        </div>
                        `);
                  }

                }));
                //console.log("My track div " +trackDiv.text());

                    // var tracksDivObject = trackDiv.text();

             
            });

            Promise.all(emptyArr).then(function(){
              $('.carousel.carousel-slider').carousel({
                fullWidth: true,
                indicators: true
              });
            })
        }
    });

     
 }
});
   