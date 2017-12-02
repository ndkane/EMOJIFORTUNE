console.log('the bot is starting');

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);

//Regular Tweet

tweetIt();
setInterval (tweetIt, 60 * 60 * 500);

function tweetIt() {
	
	var r = Math.floor(Math.random()*50);

	var tweet = {
		status: 'Give me ' + r + ' emojis and I will read your fortune...'
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
                    " It's all going to be fine, it's all going to be fine. Just keep telling yourself that. It's all going...",
                    " There are four people in a room, you have interrupted. Tell one of them to leave and then continue.",
                    " Stop where you are, immediately. Turn around, find something green and put it in your pocket.",
                    " They aren't your true love, but they suit the furniture. Ask them to change and invite them over.",
                    " The next song your hear will definitely, absolutely, be about your current problem.",
                    " Open all that unopened mail you've been collecting, one of them might have a surprise..." ];
        
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