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
	async execute(client, message, args) {
        
        let global = punishmentconfig.punishments.global;

        for (const idk in punishmentconfig.punishments.args[1]) {
            message.reply(`reason: ${idk} track: ${global[idk][0]} weight: ${global[idk][1]}`)
        }

  	},

};