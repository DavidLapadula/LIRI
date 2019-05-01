# Language Interpreter

## Description
This is a command line argument built with node that accepts user input, uses it to query various API's, and then displays a result.

## Motivation
This project was meant as an introduction to Node and NPM. The ability to run javascript outside of a browser is a popular trend in modern web development. 

## Installation

If you want to test this out for yourself, it is very easy! Just use these simple steps!

1. Fork the repository and clone it to your local machine. 
2. Make sure node is installed, create a '.env' file and supply your own 'Twitter API' and 'Spotify API' Key
3. Open the terminal in our project directory and run the command 'npm install'
4. Issue the commands listed below in the 'Functionality' and watch the data flow in!

## Screenshots
![](./images/nodeLiri.gif)
  
## Technology
* Javascript (ES6) 
* Node.js


## Functionality
Command Line Interface program that accepts parameters used to subsequently query API's
 
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




 
