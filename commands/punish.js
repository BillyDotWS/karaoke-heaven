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
        
        const config = "not found"
        if (`${args[1]}` == "global") {const config = punishmentconfig.punishments.global}
        if (`${args[1]}` == "community") {const config = punishmentconfig.punishments.community}
        if (`${args[1]}` == "official") {const config = punishmentconfig.punishments.official}
        if (`${args[1]}` == "not found") {message.reply("You haven't entered a correct punishment type")}

        for (const idk in config) {if (idk === args[2]) {message.reply(`**Found!** reason: ${idk} track: ${global[idk][0]} weight: ${global[idk][1]}`)}}

  	},

};