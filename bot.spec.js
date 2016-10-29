const expect = require('chai').expect

describe('bot',()=>{
	const bot = require('./bot')

	it('should process messages',done=>{
		const message = {
			chat:{id:'TEST'},
			text: 'ls'
		}
		const telegramStub = {
			sendMessage: (chatId, msg)=>{
				expect(chatId).to.equal('TEST')
				expect(msg.trim()).to.equal('list directory contents')
				done()
			}
		}

		//test
		bot.processMessage(telegramStub, message)
	})
})