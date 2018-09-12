// Import dotenv package for procss variables
require('dotenv').config();

// Imported keys from javascript file
let APIKeys = require('./keys.js');

//File system module
let fs = require('fs'); 

//Packages required for queries
let Twitter = require('twitter');
let Spotify = require('node-spotify-api');
let Request = require('request');

//Objects for accessing keys
let client = new Twitter(APIKeys.twitter);
let spotify = new Spotify(APIKeys.spotify);

// Command line arguments stored
let argumentsProvided = process.argv; 

//grab the specific query
let queriedAPI = argumentsProvided[2];

// Control for multiple word requests
let totalRequest = []; 
for (let i = 3; i < argumentsProvided.length; i++) {
	totalRequest.push(argumentsProvided[i]); 
}
let queryRequest = totalRequest.join(" "); 
 

// Query Twitter function
function retrieveTweets() {

	//parameters for only 20 tweets
	let tweetAmount = {
		count: 20
	};

	// Get request for amount of tweets specified by tweetAmount
	client.get('statuses/user_timeline', tweetAmount, (err, tweets) => {
		if (err) return console.log(err); 

		// Array used to log query
		let twitterInfo = [];

		console.log(`The Last 20 tweets \n`); 
		
		//For loop because retrieving multiple objects from API and want to display number
		for(var i = 0; i < tweets.length; i++)  {
			console.log(`User: ${tweets[i].user.name}`);
			console.log(`Tweet #${i + 1} : ${tweets[i].text}`);
			console.log(`Timestamp: ${tweets[i].created_at}\n`);
			//push tweet into the array
			twitterInfo.push(`\n${tweets[i].user.name}, ${tweets[i].text}, ${tweets[i].created_at}`); 
		}

		//Add the file to the 'log.txt' file
		fs.appendFile('log.txt', twitterInfo, (err) => {
			if (err) return console.log(err)
		});
	}); 
} 


//Query Spotify function
function querySpotify(query) { 
	// Preset query if no argument provided
	if (!query) query = 'The Sign Ace of Base';

	//Search the spotify API for 1 song based on argument provided
	spotify.search({ type: 'track', query: query, limit: 1 }, (err, data) => {
		if (err) return console.log(err);

		//song data from the API
		let song = data.tracks.items[0];
		 
		//array for all the artists. Allows for logging more than one
		let loggedArtists = []; 

		console.log(`Song name: ${song.name}`);
		
		// control for multiple artists
		for (var i = 0; i < song.artists.length; i++) {
			loggedArtists.push(` ${song.artists[i].name}`)
			if (i === 0) {
				console.log(`Artist(s): ${song.artists[i].name}`);
			} else { 
				console.log(`           ${song.artists[i].name}`); 
			}  
		}  
		console.log(`Album: ${song.album.name}`); 
		console.log(`URL: ${song.external_urls.spotify}`);

		let songData = [`Song name: ${song.name}`, `\nArtist(s): ${loggedArtists}`, `\nAlbum: ${song.album.name}`, `\nURL: ${song.external_urls.spotify}`];

		//Add the file to the 'log.txt' file
		fs.appendFile('log.txt', songData, (err) => {
			if (err) return console.log(err)
		});
	}); 
} 

//Query OMBD function, using 'request' package
function queryOMDB(query) {
 
	// Preset query if one is not provided
	if (!query) query = 'Mr. Nobody';

	//Use request module to query OMBD API
	Request(`http://www.omdbapi.com/?t=${query}&y=&plot=short&apikey=trilogy`, (error, response, body) => {

		if (response.statusCode === 200 && !error) {
			//parse the whole response
			let movie = JSON.parse(body);
			
			console.log(`Title: ${movie.Title}`);
			console.log(`Released in: ${movie.Year}`);
			console.log(`Produced in: ${movie.Country}`);
			console.log(`Language(s): ${movie.Language}`);
			console.log(`Featuring: ${movie.Actors}`);
			console.log(`Preview: ${movie.Plot}`);
			console.log(`IMDB rating: ${movie.Ratings[0].Value}`); 
			// Old movies have no rotten tomatoes rating, so check to prevent an error
			movie.Ratings[1] ? rottenTomatoesRating = movie.Ratings[1].Value : rottenTomatoesRating = 'No Rating'
			console.log(`Rotten Tomatoes Rating: ${rottenTomatoesRating}`); 

			let movieData = [`Title: ${movie.Title}`, `\nReleased in: ${movie.Year}`, `\nProduced in: ${movie.Country}`, `\nLanguage(s): ${movie.Language}`, `\nFeaturing: ${movie.Actors}`, `\nPreview: ${movie.Plot}`, `\nIMDB rating: ${movie.Ratings[0].Value}`, `\nRotten Tomatoes Rating: ${rottenTomatoesRating}`];

			//Add the file to the 'log.txt' file
			fs.appendFile('log.txt', movieData, (err) => {
				if (err) return console.log(err)
			});
		}  
	});
} 

 
// function to read the do-what-it-says query
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

// Append the query type to the log.txt file after every query and add spaces
fs.appendFile('log.txt', '\n\n#' + queriedAPI + '\n\n', (err) => {
	if (err) return console.log(err)
}); 

 
// handle the query and run appropriate function. Controls for no argument provided
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
		console.log('Please Enter a proper command');
}   