const Discord = require('discord.js')

module.exports = async (client, member) => {
	member.roles.add(['700213602098872350']);
	
	var welcomeEmbed = new Discord.MessageEmbed()
	welcomeEmbed.setTitle(':wave: **Welcome to Karaoke Heaven!**')
	welcomeEmbed.setColor('#00FF00')
        welcomeEmbed.setDescription(`This discord is the home to many exciting events. You're even welcome to host your own events.`)
        member.send(welcomeEmbed)
				
};
