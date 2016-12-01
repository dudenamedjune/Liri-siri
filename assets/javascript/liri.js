var request = require("request");
var Twitter = require("twitter");
var spotify = require("spotify");
var keys = require("./keys.js");
var fs = require("fs");

//nodconsole.log(keys);

var command = process.argv[2];		

//creates client for twiiter 

var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret,
});

// will show my last 20 tweets and when they were created
function tweets(){
	var params = {screen_name: "dudenamedjune"};

	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if (!error){

			for(var i in tweets){
				console.log(tweets[i].created_at + " " + tweets[i].text + "\n");
			}
			
		}
	});



}


 // This will show the following information about the song in your terminal/bash window
	// 	* Artist(s)
	// 	* The song's name
	// 	* A preview link of the song from Spotify
	// 	* The album that the song is from

	// * if no song is provided then your program will default to
	// 	* "The Sign" by Ace of Base
function spotifyinfo(track){

	spotify.search({ type: 'track', query: track }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    
    
 	 console.log("Artist: " + data.tracks.items[0].artists[0].name);

 	 //displays sond name
 	  console.log("Song Title: " + data.tracks.items[0].name);

 	 //displays track preiview link
 	 console.log("Preview Link: " + data.tracks.items[0].preview_url);

 	 //display album name
 	 console.log("Album: " + data.tracks.items[0].album.name);
    // Do something with 'data' 
});

}

if(command === "twitter"){
  tweets();
}else if (command === "spotify"){
	var track = process.argv[3];
	var i = 4;
	while(i < process.argv.length){
		track += "+" + process.argv[i];
		i++
	}			
		spotifyinfo(track); 
}else if(command === "movie"){
	var moviename = process.argv[3];
	var i = 4;
	while(i < process.argv.length){
		moviename += "+" + process.argv[i];
		i++
	}

	movieInfo(moviename);
}else if(command === "dotext"){
	dotext();
}







// * This will output the following information to your terminal/bash window:

// 		* Title of the movie.
// 		* Year the movie came out.
// 		* IMDB Rating of the movie.
// 		* Country where the movie was produced.
// 		* Language of the movie.
// 		* Plot of the movie.
// 		* Actors in the movie.
// 		* Rotten Tomatoes Rating.
// 		* Rotten Tomatoes URL.

// 	* If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
// 		* If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
// 		* It's on Netflix!
 function movieInfo(){
 	request("http://www.omdbapi.com/?t=" + moviename + "&y=&plot=short&r=json&tomatoes=true", function(error, response, body) {

  // If there were no errors and the response code was 200 (i.e. the request was successful)...
  if (!error && response.statusCode === 200) {

  	
  	//print out title of the movie
  	console.log("TItle: " + JSON.parse(body).Title);

  	//year the movie came out
  	console.log("Year released: " + JSON.parse(body).Year);

    // Then we print out the imdbRating
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);

    //country where produced
    console.log("Country: " + JSON.parse(body).Country);

    //language of the movie
    console.log("Language: " + JSON.parse(body).Language);

    //plot 
    console.log("Plot: " + JSON.parse(body).Plot);

    //actors in the movie
    console.log("Actors: " + JSON.parse(body).Actors);

    //rotten tomatoes rating
    console.log("Tomato Raiting: " + JSON.parse(body).tomatoRating  + " (Based on " + JSON.parse(body).tomatoReviews + " reviews)");

    //tomato user rating 
    console.log("Tomato Raiting: " + JSON.parse(body).tomatoUserRating + " (Based on " +  JSON.parse(body).tomatoUserReviews + " reviews)");

    //tomato meter 
    console.log("Tomato Meter: " + JSON.parse(body).tomatoMeter + "%");

    //rotton tomatoes url 
    console.log("Tomato URL: " + JSON.parse(body).tomatoURL);



  }
});

}

 // Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
	// 	* It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
	// 	* Feel free to change the text in that document to test out the feature for other commands.

 function dotext(){
 	fs.readFile("random.txt", "utf8", function(err, data){
 		console.log(data);

 		spotifyinfo(data);
		
	});

}