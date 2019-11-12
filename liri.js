require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require('Axios');

var spotify = new Spotify(keys.spotify);
var option = process.argv[2];
var params = process.argv.slice(3).join(" ");

//Switch statement to handle options
switch (option) {
    case 'concert-this':
        
        break;
    
    case 'spotify-this-song':
        break;
    
    case 'movie-this':
        break;

    case 'do-what-it-says':
        break;

    default:
        console.log('Invalid option selected');
        break;
}

