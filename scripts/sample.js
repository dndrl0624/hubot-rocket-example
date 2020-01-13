// Description:
//    Sample scripts for first developing hubot commands.
// 
// Commands:
//
cards=[1,2,3,4,5,6,7,8,9,10]

module.exports = (robot) => {
	robot.hear(/what?/gi, (res) => {
		res.reply('Hey, what\'s wrong?')
	})
 	robot.respond(/hello/gi, (res) => {
		now=new Date()
		h=((now.getHours() >= 10) ? now.getHours() : '0'+now.getHours())
		m=((now.getMinutes() >= 10) ? now.getMinutes() : '0'+now.getMinutes())
		s=((now.getSeconds() >= 10) ? now.getSeconds() : '0'+now.getSeconds())
		time=h+':'+m+':'+s
		res.send('Hi~ The current time is '+time)
	})
	robot.respond(/hey!/i, (res) => {
		res.reply('Hi friend!!')
	})
	robot.respond(/post+ (.+) room+ (.+)/i, (res) => {
		msg=res.match[1]
		toRoom=res.match[2]
		fromRoom=res.envelope.room
		from=res.envelope.user.name
		robot.messageRoom(toRoom,'#'+fromRoom+' @'+from+' '+msg)
	})
	robot.enter( (res) => {
		name=res.envelope.user.name
		room=res.envelope.room
		res.send(name+' welcome to room '+room)
	})
	robot.leave( (res) => {
		name=res.envelope.user.name
		res.send(name+' is gone... :cry:')
	})
	robot.respond(/game/i, (res) => {
		userNum=res.random(cards)
		botNum=res.random(cards)
		botName=robot.name
		res.reply(userNum+' : '+botNum+' @'+botName+' ... '+((userNum > botNum) ? 'you win' : ((userNum < botNum) ? 'you lose' : 'same number')))
	})
}
