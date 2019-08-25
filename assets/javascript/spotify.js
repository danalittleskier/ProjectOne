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
              let playlists = response.playlists.items;
              let trackDiv = $("<div>");

              let trackNum = 0;
              let emptyArr = [];
              console.log(emptyArr);

              playlists.forEach(function (playlist) {
                
                emptyArr.push($.ajax({
                    url: "https://api.spotify.com/v1/playlists/"+playlist.id+"/tracks",
                    headers: {
                      'Authorization': 'Bearer ' + accessCode
                    },
                    data : {
                      limit: 20
                    },
                    success: function(response){ 
                        //console.log(response);
                        let tracks = response.items;
                        trackDiv.empty();


                        tracks.forEach(function (element) {
                        console.log(trackNum);
                        trackDiv.append("<li> " + ' / ' + '  '  + element.track.name +  ' ' + "</li>");
                       
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

                      // console.log($(".carousel").length);
                      // console.log(playlist.images[playlist.images.length-1].url);

                      $(".carousel").show();
                        $(".carousel").append(`
                        <div id = 'car-height'class="carousel-item blue-grey darken-3 white-text">
                        <h2 id='playlist-name-title'>${playlist.name}</h2>
                        <div id = 'car-container'>
                          <img id="playlist-image"src="${playlist.images[0].url}">
                          <div>
                          <h6 id= 'playlist-info'> Playlist Preview </h6>
                          <p id='tracks' class="white-text"> ${trackDiv.text()}</p>
                          <a class="btn waves-effect white grey-text darken-text-2" href="${playlist.external_urls.spotify}" target="_blank" >Open In Spotify</a>
                          </div>
                          </div>
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
                indicators: true,
                dist: 0,
                padding: 0,
                duration: 150,
              });

              autoplay()
              function autoplay() {
                $('.carousel').carousel('next');
                setTimeout(autoplay, 8000);
                }     
            })
        }
    });

     
 }
});
   