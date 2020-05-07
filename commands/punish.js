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
        
        let config = setconfig(args[1])

        if (`${config}` == "not found") {message.reply(`You haven't entered a correct punishment type -- entered ${args[1]}`)}

        for (const idk in config) {if (idk === args[2]) {message.reply(`**Found!** reason: ${idk} track: ${config[idk][0]} weight: ${config[idk][1]}`)}} //  

  	},

};

function setconfig(type) {

    if (`${type}` == "global") {let config = punishmentconfig.punishments.global; return config;}
    if (`${type}` == "community") {let config = punishmentconfig.punishments.community; return config;}
    if (`${type}` == "official") {let config = punishmentconfig.punishments.official; return config;}
    return "not found";
}