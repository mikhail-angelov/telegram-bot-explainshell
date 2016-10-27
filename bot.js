const request = require('request');
const cheerio = require('cheerio');
const MAIN_URL = 'http://explainshell.com/explain';
function processMessage(telegram,msg){
	const qs = {cmd: msg.text}
	request({url:MAIN_URL, qs:qs},(error, response, body)=>{
		if(!error && response.statusCode == 200 && body){
			const $ = cheerio.load(body);
			//todo: format output
			const data = $('#help').text() || 'parse html error :(';
			telegram.sendMessage(msg.chat.id, data, {parse_mode:'HTML'})
				.then(function () {
				// console.log('op',msg, data)
				});
		}else{
			const message = 'explainshell.com site error: ' + error;
			telegram.sendMessage(msg.chat.id, message)				
		}
		});
	console.log('op',msg)
}


module.exports = {processMessage};