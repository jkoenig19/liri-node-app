require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

var command = process.argv[2];
var selection = process.argv.slice(3).join(" ");

determineCommand();

function determineCommand(){
    switch (command){
        case "concert-this":
            concert();
            break;
        case "spotify-this-song":
            music();
            break;
        case "movie-this":
            movie();
            break;
        case "do-what-it-says":
            doWhat();
            break;
    }
}

function concert(){
    axios.get("https://rest.bandsintown.com/artists/" + selection + "/events?app_id=codingbootcamp")
        .then(function(response) {
            fs.appendFile("log.txt", command + " " + selection + "\n\n", function(error) {
                if (error){
                    return console.log(error);
                }
            });
            var venue = "";
            var location = "";
            var date = "";
            for (var i = 0; i < response.data.length; i++){
                console.log("\nVenue: " + response.data[i].venue.name);
                console.log("Venue location: " + response.data[i].venue.city);
                console.log("Date of the Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
                venue = "Venue: " + response.data[i].venue.name + "\n";
                location = "Venue location: " + response.data[i].venue.city + "\n";
                date = "Date of the Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY") + "\n";
                fs.appendFile("log.txt", venue + location + date + "\n", function(error) {
                    if (error){
                        return console.log(error);
                    }
                });
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}

function music(){
    if (!selection){
        selection = "The Sign";
    }
    spotify.search({type: "track", query: selection}, function(err,data){
        if (err){
            return console.log("Error occurred: " + err)
        }
        fs.appendFile("log.txt", command + " " + selection + "\n\n", function(error) {
            if (error){
                return console.log(error);
            }
        });
        var artists = "";
        var name = "";
        var preview = "";
        var album = "";
        for (var i = 0; i < data.tracks.items.length; i++){
            console.log("\nArtist(s): " + data.tracks.items[i].artists[0].name);
            console.log("The song's name: " + data.tracks.items[i].name);
            console.log("A preview link of the song from Spotify: " + data.tracks.items[i].preview_url);
            console.log("The album that the song is from: " + data.tracks.items[i].album.name);
            artists = "Artist(s): " + data.tracks.items[i].artists[0].name + "\n";
            name = "The song's name: " + data.tracks.items[i].name + "\n";
            preview = "A preview link of the song from Spotify: " + data.tracks.items[i].preview_url + "\n";            
            album = "The album that the song is from: " + data.tracks.items[i].album.name + "\n";
            fs.appendFile("log.txt", artists + name + preview + album + "\n", function(error) {
                if (error){
                    return console.log(error);
                }
            });
        }
    });
}

function movie(){
    if (!selection){
        selection = "Mr. Nobody";
    }
    axios.get("http://www.omdbapi.com/?t=" + selection + "&apikey=trilogy")
        .then(function(response) {
            fs.appendFile("log.txt", command + " " + selection + "\n\n", function(error) {
                if (error){
                    return console.log(error);
                }
            });
            console.log("\nTitle: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            var title = "Title: " + response.data.Title + "\n";
            var year = "Year: " + response.data.Year + "\n";
            var imdb = "IMDB Rating: " + response.data.Ratings[0].Value + "\n";
            var tomatoes = "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n";
            var country = "Country: " + response.data.Country + "\n";
            var language = "Language: " + response.data.Language + "\n";
            var plot = "Plot: " + response.data.Plot + "\n";
            var actors = "Actors: " + response.data.Actors + "\n";
            fs.appendFile("log.txt", title + year + imdb + tomatoes + country + language + plot + actors + "\n", function(error) {
                if (error){
                    return console.log(error);
                }
            });
        })
        .catch(function(error) {
            console.log(error);
        });
}

function doWhat(){
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error){
            return console.log(error);
        }
        fs.appendFile("log.txt", command + "\n", function(error) {
            if (error){
                return console.log(error);
            }
        });
        var dataArray = data.split(",");
        var random = Math.floor(Math.random() * dataArray.length);
        var remainder = random % 2;
        if (remainder === 1){
            random = random - 1;
        }
        command = dataArray[random];
        selection = dataArray[random+1];
        selection = selection.replace(/"/g,"");
        determineCommand();
    });
}