require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require('Axios');

var spotify = new Spotify(keys.spotify);
var option = process.argv[2];
var params = process.argv.slice(3).join("+");

var concertUrlStart = "https://rest.bandsintown.com/artists/"; 
var concertUrlEnd = "/events?app_id=codingbootcamp";

//Switch statement to handle options
switch (option) {
    case 'concert-this':
        
        break;
    
    case 'spotify-this-song':
        spotifyThis(params);
        break;
    
    case 'movie-this':
        break;

    case 'do-what-it-says':
        break;

    default:
        console.log('Invalid option selected');
        break;
}

//functions to handle requests
function spotifyThis(params){
    params = (params === "") ? 'The sign' : params;
    
    spotify.search({ type: 'track', 
                    query: params }, 
        (err, data) => {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        data.tracks.items.forEach((element, index) => {
            console.log(`------------------------------------`);
            console.log(`Artist: ${element.artists[0].name}`);
            console.log(`Song name: ${element.name}`);
            console.log(`Link to the song: ${element.external_urls.spotify}`);
            console.log(`Album: ${element.album.name}`);
        });
      });
}

function requestApi(option, params){

}
