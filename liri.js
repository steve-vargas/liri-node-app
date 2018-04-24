
//Dependency
require("dotenv").config();

var keys = require('./keys.js');
var request = require('request');
var fs = require('fs');

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
//tweets are accessed, come back and figure the access to keys
if (command === 'my-tweets') {
    client.get('statuses/user_timeline', function(error, tweets, response) {
        if(error) throw error;
        for (let i =0; i < 20; i++) {
            console.log(tweets[i].text);
        }
     
    });
    
};
//objects are returned, need to come back and extract.
if ((command === 'spotify-this-song') || (command === 'do-what-it-says') ) {
    if (command === 'do-what-it-says') {
    
        fs.readFile("random.txt", "utf8", function(error, data) {
            if (error) {
                return console.log(error);
            }
           var random = data.split(",")
           var string1 = random[1].slice(1);
           var string2 = string1.split('"')[0];
            
            
            spotify.search({ type: 'track', query: string2}, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
        }
        //how to dig into this
        console.log(data[0][0]);
        });

    
    
    });

        
    }
    else {
    spotify.search({ type: 'track', query: process.argv[3]}, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    
    });
}};

if (command === 'movie-this') {
    var movieName = process.argv[3];
    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("The movie's title is: " + JSON.parse(body).Title);
            console.log("The movie's year is: " + JSON.parse(body).Year);
            console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
            console.log("The movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
            console.log("The movie's country origination is: " + JSON.parse(body).Country);
            console.log("The movie's language is: " + JSON.parse(body).Language);
            console.log("The movie's plot is: " + JSON.parse(body).Plot);
            console.log("The movie's stars are: " + JSON.parse(body).Actors);
        }

        else {
            movieName = 'Mr. Nobody';
            console.log("If you haven't watched \"Mr. Nobody\" then you should: \n It's on Netflix");
            console.log("The movie's title is: " + JSON.parse(body).Title);
            console.log("The movie's year is: " + JSON.parse(body).Year);
            console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
            console.log("The movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
            console.log("The movie's country origination is: " + JSON.parse(body).Country);
            console.log("The movie's language is: " + JSON.parse(body).Language);
            console.log("The movie's plot is: " + JSON.parse(body).Plot);
            console.log("The movie's stars are: " + JSON.parse(body).Actors);
        }
    })
};



    

