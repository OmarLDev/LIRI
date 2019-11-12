require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require('Axios');

var spotify = new Spotify(keys.spotify);
var option = process.argv[2];
var params = process.argv.slice(3).join("+");

var concertUrlStart = "https://rest.bandsintown.com/artists/"; 
var concertUrlEnd = "/events?app_id=codingbootcamp";
var moviesUrl = 'http://www.omdbapi.com/?apikey=trilogy&t=';

//Switch statement to handle options
switch (option) {
    case 'concert-this':
            requestApi('concert', params);
        break;
    
    case 'spotify-this-song':
        spotifyThis(params);
        break;
    
    case 'movie-this':
        requestApi('movie', params);
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
    switch (option){
        case 'movie':
            var params = (params === '') ? 'Mr. Nobody' : params;
            axios.get(moviesUrl+params).then(response => {
                console.log(`Movie title: ${response.data.Title}`);
                console.log(`Release date: ${response.data.Released}`);
                console.log(`Rotten Tomatoes rating: ${response.data.Ratings[1].Value}`);
                console.log(`Country of origin: ${response.data.Country}`);
                console.log(`Language: ${response.data.Language}`);
                console.log(`Language: ${response.data.Plot}`);
                console.log(`Language: ${response.data.Actors}`);
            }).catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                  } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                  }
                  console.log(error.config);
            });
            break;
        case 'concert':
            break;
    }
}
