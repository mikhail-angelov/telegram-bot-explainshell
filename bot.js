const Bot = require('node-telegram-bot-api');
const request = require('request');
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
		const cmd = (msg.text || '').split(' ').join('+');
		if(msg.entities && cmd){
			const qs = {cmd: cmd}
			request({url:MAIN_URL, qs:qs},(error, response, body)=>{
				if(!error && response.statusCode == 200 && body){
			  		bot.sendMessage(msg.chat.id, body,{parse_mode:'HTML'})
			  			.then(function () {
					    	// console.log('op',msg, data)
						});
				}
	  		});
		} else {
			const message = 'пустая команда, введите что нибудь';
			bot.sendMessage(msg.chat.id, message)
		}
		console.log('op',msg)
	})
	return bot;
}

module.exports = init;