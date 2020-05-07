const Discord = require('discord.js');
const punishmentconfig = require('../settings/punishments.json');

module.exports = {
	name: 'punish',
	description: 'View information about the bot',
	usage: 'punish [member] [type] [reason]',
	example: 'punish 281199286765748225 global Spamming',
	requiredRoles: ['🧍🏿‍♂️  Bouncer'],
	allowedUsers: [],
	argsNeeded: 3,
	async execute(client, message) {
        
        message.reply(punishmentconfig);

  	},

};