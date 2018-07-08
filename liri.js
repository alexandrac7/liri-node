require("dotenv").config();

var fs = require("fs");

var request = ("request");

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var Twitter = require("twitter");

var spotify = new Spotify(keys.spotify);

var client = new Twitter(keys.twitter);


//stored arguments

var search = process.argv[2];

var term = process.argv.slice(3).join(" ");


//attaches multiple word arguments





switch (search) {

  case "my-tweets":
    myTweets();
    break;

  case "spotify-this-song":
    if (term) {
      spotifyThisSong(term);
    } else {
      spotifyThisSong("I Saw The Sign");
    }
    spotifyThisSong();
    break;

  case "movie-this":
    movieThis();
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;

  default: console.log("Enter commands after node liri.js !" + "my-tweets" + "spotify-this-song 'any song title' " + "movie-this 'any movie title' " + "do-what-it-says")


};

function myTweets() {

  var userName = { screen_name: 'winedarksea1' };
  client.get('statuses/user_timeline', userName, function (error, tweets, response) {
    if (!error) {
      for (i = 0; i < tweets.length; i++) {
        var date = tweets[i].created_at;
        console.log("@winedarksea1: " + tweets[i].text + " Created At: " + date.substring(0, 19));

        //adds text to log.txt file
        fs.appendFile('log.txt', "@winedarksea1: " + tweets[i].text + " Created At: " + date.substring(0, 19));
        fs.appendFile('log.txt', );

      }

    } else {
      console.log("error:" + err);
      return;
    }

  });

};
function spotifyThisSong(song) {
  spotify.search({ type: 'track', query: song }, function (error, data) {
    if (!error) {
      for (var i = 0; i < data.tracks.items.length; i++) {
        var songData = data.tracks.items[i];
        //artist
        console.log("Artist: " + songData.artists[0].name);
        //song name
        console.log("Song: " + songData.name);
        //spotify preview link
        console.log("Preview URL: " + songData.preview_url);
        //album name
        console.log("Album: " + songData.album.name);

        //adds text to log.txt
        fs.appendFile('log.txt', songData.artists[0].name);
        fs.appendFile('log.txt', songData.name);
        fs.appendFile('log.txt', songData.preview_url);
        fs.appendFile('log.txt', songData.album.name);
      }
    } else {
      console.log('Error!');
    }
  });
}



function movieThis(queryUrl, error, response, body) {


  var queryUrl = "http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy";

  console.log(queryUrl);


    var body = JSON.parse(body);

    console.log("Title: " + body.Title);
    console.log("Release Year: " + body.Year);
    console.log("IMdB Rating: " + body.imdbRating);
    console.log("Country: " + body.Country);
    console.log("Language: " + body.Language);
    console.log("Plot: " + body.Plot);
    console.log("Actors: " + body.Actors);
    console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
    console.log("Rotten Tomatoes URL: " + body.tomatoURL);

    //text added to log
    fs.appendFile('log.txt', "Title: " + body.Title);
    fs.appendFile('log.txt', "Release Year: " + body.Year);
    fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating);
    fs.appendFile('log.txt', "Country: " + body.Country);
    fs.appendFile('log.txt', "Language: " + body.Language);
    fs.appendFile('log.txt', "Plot: " + body.Plot);
    fs.appendFile('log.txt', "Actors: " + body.Actors);
    fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating);
    fs.appendFile('log.txt', "Rotten Tomatoes URL: " + body.tomatoURL);

 
  
  if (movie === "Mr. Nobody") {
    console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
    console.log("It's on Netflix!");

    //adds text to log.txt
    fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
    fs.appendFile('log.txt', "It's on Netflix!");
  }
}

function doWhatItSays() {
  fs.readFile('random.txt', "utf8", function (error, data) {
  });
}


