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
		historyEmbed.setTitle(`History of ${user.user.username}#${user.user.disciriminator}`);
		historyEmbed.setColor('#FFC0CB');
		historyEmbed.setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'png' }))
		historyEmbed.setThumbnail(user.user.displayAvatarURL({ format: 'png' }))

		for (const punishment in punishmentstatus) {
		    console.log(punishmentstatus[punishment]);
		    historyEmbed.addField(`**Punishment #${punishmentstatus[punishment].id}**`, `**Type:** ${punishmentstatus[punishment].type}\n**Reason:** ${punishmentstatus[punishment].reason}\n**Moderator:** <@${punishmentstatus[punishment].moderator}>`)
		}

		message.channel.send(historyEmbed)
		return;



  	},

};
