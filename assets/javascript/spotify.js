
var accessCode;
var clientID = "ab78c9bfe2104f2e9e01b86f908541a9";
//project url changes as need it for testing on local server or github
var ourProjectURL = (typeof localURL !== "undefined") ? localURL : "https://danalittleskier.github.io/ProjectOne/";

var encodedProjectURL = encodeURIComponent(ourProjectURL);
var spotifyURL = "https://accounts.spotify.com/authorize?client_id=" + clientID + "&response_type=token&redirect_uri=" + encodedProjectURL + "&scope=user-read-private%20user-read-email"; // &state=34fFs29kd09"

//in order to have access to spotify api we need to reload page after login and grab access token
$(document).ready(function () {
    //Changed to grabing hash
    var urlParams = new URLSearchParams(window.location.hash.substr(1));
    accessCode = urlParams.get('access_token');

    //if access token received make all necessary API calls to retrieve data
    if (accessCode) {

        callAPIs();

        $.ajax({
            url: "https://api.spotify.com/v1/search",
            headers: {
                'Authorization': 'Bearer ' + accessCode
            },
            data: {
                q: localStorage.getItem('duration'),
                type: "playlist",
                limit: 10
            },
            success: function (response) {
                console.log(response);
                let playlists = response.playlists.items;
                let trackDiv = $("<div>");

                let trackNum = 0;
                let emptyArr = [];

                playlists.forEach(function (playlist) {

                    emptyArr.push($.ajax({
                        url: "https://api.spotify.com/v1/playlists/" + playlist.id + "/tracks",
                        headers: {
                            'Authorization': 'Bearer ' + accessCode
                        },
                        data: {
                            limit: 20
                        },
                        success: function (response) {

                            let tracks = response.items;
                            trackDiv.empty();


                            tracks.forEach(function (element) {
                                console.log(trackNum);
                                trackDiv.append("<li> " + ' / ' + '  ' + element.track.name + ' ' + "</li>");

                            });

                            $(".carousel").show();
                            $(".carousel").append(`
                        <div id = 'car-height'class="carousel-item grey lighten-3 grey-text">
                        <h2 id='playlist-name-title'>${playlist.name}</h2>
                        <div id = 'car-container'>
                          <img id="playlist-image"src="${playlist.images[0].url}">
                          <div>
                          <h6 id= 'playlist-info'> Playlist Preview </h6>
                          <p id='tracks' class="grey-text"> ${trackDiv.text()}</p>
                          <a class="btn waves-effect waves-light grey darken-1 spotify-link" href="${playlist.external_urls.spotify}" target="_blank" >Open In Spotify</a>
                          </div>
                          </div>
                        </div>
                        `);
                        }

                    }));


                });

                Promise.all(emptyArr).then(function () {
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
