console.log('the bot is starting');

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);


// Setting up a user stream
var stream = T.stream('user');

//Anytime anyone replies to me
stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg){
	//var fs = require('fs');
	//var json = JSON.stringify(eventMsg,null,2);
	//fs.writeFile("tweet.json", json);

	var replyto = eventMsg.in_reply_to_screen_name;
	var text = eventMsg.text;
	var from = eventMsg.user.screen_name;

var phraseArray = [ " I see trouble ahead. Gather your things and get on the next train.",
                    " I see a kind stranger approaching. Ask them the time, do not hesitate at their answer.",
                    " Give a woman with brown hair your time. Direct her to the last place you stood.",
                    " Stop where you are, immediately. Turn around, find something green and put it in your pocket." ];
        
function chooseRandom(myArray) {
  return myArray[Math.floor(Math.random() * myArray.length)];
}
var phrase = chooseRandom(phraseArray);

	if (replyto === 'fortune_emojis'){
		var newtweet = '@' + from + phrase;
		tweetOut(newtweet);
	}
}

function tweetOut(txt){
	var tweet = {
		status: txt
	}

	T.post('statuses/update', tweet, tweeted);

	function tweeted(err, data, response) {
		if (err) {
			console.log("Something went wrong!");
		} else {
			console.log("It worked!");
		}
	}

}