// Import dotenv package
require('dotenv').config();

// Imported keys from javascript file
let APIKeys = require('./keys.js');

//File system module
let fs = require('fs');

//Packages used for queries
let Twitter = require('twitter');
let Spotify = require('node-spotify-api');
let Request = require('request');

//Objects for accessing keys
let client = new Twitter(APIKeys.twitter);
let spotify = new Spotify(APIKeys.spotify);

// Commands
let queriedAPI = process.argv[2]; 
let queryRequest = process.argv[3];


// Query Twitter function
function retrieveTweets() {
	client.get('statuses/user_timeline', (err, tweets, ) => {
		if (err) throw err;

		let twitterInfo = [];

		for (i in tweets) {
			console.log(tweets[i].user.name);
			console.log(tweets[i].text);
			console.log(tweets[i].created_at + '\n');
			twitterInfo.push(tweets[i].user.name, tweets[i].text, tweets[i].created_at);
		}

		//Add the file to the 'log.txt' file
		fs.appendFile('log.txt', twitterInfo, (err) => {
			if (err) return console.log(err)
		});
	});
}
 
//Query Spotify function
function querySpotify(query) {
	if (!query) query = 'The Sign Ace of Base';

	spotify.search({ type: 'track', query: query, limit: 1 }, (err, data) => {
		if (err) {
			return console.log(': ' + err);
		}

		let song = data.tracks.items[0];
		console.log(song.name);
		console.log(song.artists[0].name);
		console.log(song.album.name);
		console.log(song.external_urls.spotify);

		let songData = [song.name, song.artists[0].name, song.album.name, song.external_urls.spotify];

		fs.appendFile('log.txt', songData, (err) => {
			if (err) return console.log(err)
		});
	});
}

//Query OMBD function, using 'request' package
function queryOMDB(query) {

	if (!query) query = 'Mr. Nobody';

	Request("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy", (error, response, body) => {

		if (response.statusCode === 200 && !error) {
			let movie = JSON.parse(body);

			console.log(movie.Title);
			console.log(movie.Ratings[0].Value);
			console.log(movie.Ratings[1].Value);
			console.log(movie.Country);
			console.log(movie.Language);
			console.log(movie.Actors);
			console.log(movie.Plot);

			let movieData = [movie.Title, movie.Ratings[0].Value, movie.Ratings[1].Value, movie.Country, movie.Language, movie.Actors, movie.Plot];

			fs.appendFile('log.txt', movieData, (err) => {
				if (err) return console.log(err)
			});
		}
	});
}

function readTxtFile() {
	fs.readFile('random.txt', 'utf8', function (err, data) {
		if (err) return console.log(err);
		
		info = data.split(',');
		
		switch (info[0]) {
			case 'my-tweets':
				retrieveTweets();
				break;
			case 'spotify-this-song':
				querySpotify(info[1]);
				break;
			case 'movie-this':
				queryOMDB(info[1]);
				break;
			default:
				console.log('Improper Request');
		}
	});
}

// Append the query to the log.txt file after every query and add spaces
fs.appendFile('log.txt', '\n\n#' + queriedAPI + '\n\n',  (err) => { 
	
	if (err) return console.log(err) 
});

switch (queriedAPI) {
	case 'my-tweets':
		retrieveTweets();
		break;
	case 'spotify-this-song':
		querySpotify(queryRequest);
		break;
	case 'movie-this':
		queryOMDB(queryRequest);
		break;
	case 'do-what-it-says':
	readTxtFile(); 
		break;
	default:
		console.log('Improper command');
}