# Week10-liriNode
Week-10-Assignment for UofT Coding Bootcamp
API keys exported from personal .env file to keys.js file
 
## Technology
Javascript (ES6) 
Node.js (twitter, spotifym and request NPM modules)
## Functionality
Command Line Interface program that accepts parameters used to subsequently query API's

_After Supplying personal API keys and setting in .env file_
 
**Each command recieves a JSON object from the API and then displays selected information from it** 

node liri 'my-tweets' command will query the Twitter API to display the user's last 20 tweets and when they were created 

node liri spotify-this-song '<songname>'  queries the spotify API. This will display: 
* The Artist
* Name of the Song
* Link from spotify 
* Album the song came from

node liri movie-this '<movie-name>'  queries the OMDB API. This will display 
* Title of the movie
* Year of release 
* IMBD rating 
* Rotten tomatoes rating
* Country where movie was produced
* Language the movie was made in
* Plot summary 
* Actors featured in the movie
  
## Additions 
* node liri 'do-what-it-says' will read the eponymous file and perform whatever function is set in it.  
* Allows for multiple word queries
* Error checking for empty/incorrect commands have been added in
* All queries and the data retrieved from them are appended to the log.txt file using the 'fs' module. 




 
