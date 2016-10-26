const Bot = require('node-telegram-bot-api');
const request = require('request');
const cheerio = require('cheerio');
const MAIN_URL = 'http://explainshell.com/explain';
function init(token){
	var bot;

	if(process.env.NODE_ENV === 'production') {
	  bot = new Bot(token);
	  bot.setWebHook(process.env.HEROKU_URL + bot.token);
	}
	else {
	  bot = new Bot(token, { polling: true });
	}

	bot.on('message',(msg)=>{
		const qs = {cmd: msg.text}
		request({url:MAIN_URL, qs:qs},(error, response, body)=>{
			if(!error && response.statusCode == 200 && body){
				const $ = cheerio.load(body);
				//todo: format output
				const data = $('#help').text() || 'parse html error :(';
				bot.sendMessage(msg.chat.id, data, {parse_mode:'HTML'})
		  			.then(function () {
				    	// console.log('op',msg, data)
					});
			}else{
				const message = 'explainshell.com site error: ' + error;
				bot.sendMessage(msg.chat.id, message)				
			}
  		});
		console.log('op',msg)
	})
	return bot;
}

module.exports = init;