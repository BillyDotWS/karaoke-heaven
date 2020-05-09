const Discord = require('discord.js');
const punishmentconfig = require('../settings/punishments.json');
const punishmenthandler = require('../API/punishmentHandler.js');
const embeds = require('../modules/embeds.js');

module.exports = {
	name: 'history',
	description: 'Fetch punishment history',
	usage: 'history [userid]',
	example: 'history 213849560508792832',
	requiredRoles: ['🧍🏿‍♂️  Bouncer'],
	allowedUsers: [],
	argsNeeded: 1,
	async execute(client, message, args) {

		let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);        
		const punishmentstatus = await punishmenthandler.history(user.id)

		const historyEmbed = new Discord.MessageEmbed();
		historyEmbed.setTitle('History of ${user.username}');
		historyEmbed.setColor('#00FF00');

		for (const punishment in punishmentstatus) {
		    historyEmbed.addField(`**Punishment #${punishment}**`, `**Type:** ${punishment[0]}\n**Reason:** ${punishment[1]}\n**Moderator:** <@${punishment[2]}>`)
		}

		message.channel.send(historyEmbed)
		return;



  	},

};
