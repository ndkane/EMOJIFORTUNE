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
                    " They are not your true love, but they suit the furniture. Ask them to change and invite them over.",
                    " The next song your hear will definitely, absolutely, be about your current problem.",
                    " Take four steps right, then two steps back, three left, one forward, two right. Stop. Think.",
                    " Nobody will attempt to talk to you on the commute in today.",
                    " The next podcast you listen to will reveal your next Amazon purchase.",
                    " You will see at least five dogs today, and you will be able to pet one of them.",
                    " No one will judge you if you take the last biscuit.",
                    " Don't get your hair cut this week, if you were planning too. You will need the strength.",
                    " The next four clocks you see will be wrong. Revert to the Old Rituals instead.",
                    " Have you tried dowsing?",
                    " It probably is not a good time to look in your closet today. Leave it for a couple of days, you will not like what you find.",
                    " I see the letter N, six pairs of socks, and the colour purple. Mean anything?",
                    " I see the letter O, a white cat, two identical jumpers and a bathtub. Mean anything?",
                    " I see a storm, two flamingoes and a broken computer. They spell trouble.",
                    " I see a cloudy day, a red scarf, an odd shoe and a bent fork. They spell riches.",
                    " I see fields of green, red roses too, oh wait. Sorry. I see two black birds. The answer is no.",
                    " Open all that unopened mail you have been collecting, one of them might have a surprise...",
                    " Chips. Just chips, forever and always.",
                    " The art will not make itself.",
                    " Offer to remove the bobbles on the next jumper you see, you will be rewarded kindly.",
                    " You have made a mistake, but not yet realised it. Retrace your steps.",
                    " Tomorrow you will learn a great truth. Write everything down, it will make sense on Friday.",
                    " Todays troubles will be tomorrows to-do-list.",
                    " You will find a surprise whilst doing dull work.",
                    " The early bird gets a surprise. Rise early each day this week.",
                    " Clean socks maketh the man. Matching socks maketh the day.",
                    " Clean socks maketh the woman. Odd socks maketh the day.",
                    " The night is still young. Ask for its age.",
                    " Send a letter to a lover. Preferably a vowel.",
                    " Wear a hat tomorrow and await twist of fate. Not a red one though. You know why.",
                    " It is where you least expect it. It is somewhere you have never been. Do not go there.",
                    " Check the back of your sofa for more than just dust.",
                    " Do not forget to buy toilet roll.",
                    " An irritating family member will appear with a gift. Leave it outside.",
                    " A person with glasses will be a true friend. Check the lenses, make sure.",
                    " Nothing will go well this week. Nothing. Just a heads up.",
                    " Collect ten stones. Live with them for a week. Drop them. There your answer will be.",
                    " Board a late train to find thy true destiny. This will not be difficult." ];
        
function chooseRandom(myArray) {
  return myArray[Math.floor(Math.random() * myArray.length)];
}
var phrase = chooseRandom(phraseArray);

	if (replyto === 'fortune_emojis'){
		var newtweet = '.@' + from + phrase;
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