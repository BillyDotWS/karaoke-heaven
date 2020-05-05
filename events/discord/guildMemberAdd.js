const Discord = require('discord.js')

module.exports = async (client, member) => {
	member.roles.add(['700213602098872350']);
	
	var welcomeEmbed = new Discord.MessageEmbed()
	welcomeEmbed.setTitle(`:wave: **Welcome to Karaoke Heaven!**`)
	welcomeEmbed.setColor('#00FF00')
        welcomeEmbed.setDescription(`This discord is the home to many exciting events. You're even welcome to host your own events. We're happy you've chosen to join us. Here's some information about our discord\n\n**:confused: What is Karaoke Heaven?**\nKaraoke heaven is a community ran discord, our main purpose is to entertain through running weekly karaoke events and allowing members to host their own events. You are able to book slots for these events whenever they open!\n\n**:robot: Commands**\nFor further information on our bot commands for our server, use the \`-help\` command, this will give you a full list of all commands!\n\n:link: **Useful links:**\n[Events List](http://karaokeheaven.net/events)\n[Bouncer Applications](http://karaokeheaven.net/bouncerapplications)\n[Host your own event](http://karaokeheaven.net/events)`)
        member.send(welcomeEmbed)
				
};
