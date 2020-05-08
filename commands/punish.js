const Discord = require('discord.js');
const punishmentconfig = require('../settings/punishments.json');
const punishmenthandler = require('../API/punishmentHandler.js');
const embeds = require('../modules/embeds.js');

module.exports = {
	name: 'punish',
	description: 'Enforce rules on the discord',
	usage: 'punish [member] [type] [reason]',
	example: 'punish 281199286765748225 global Spamming',
	requiredRoles: ['🧍🏿‍♂️  Bouncer'],
	allowedUsers: [],
	argsNeeded: 3,
	async execute(client, message, args) {
        
        const punishEmbed = await new embeds.infoEmbed('working', message.channel, `Trying to punish user ${client.users.cache.get(args[0])}`, message.author, null).sendEmbed();

        let config = setconfig(args[1])

        if (`${config}` == "not found") {message.reply(`You haven't entered a correct punishment type -- entered ${args[1]}`)}

        for (const reason in config) {
        
            if (reason === args[2]) {
            

                let punishment = {
                    user: client.users.cache.get(args[0]),
                    type: args[1],
                    reason: args[2],
                    moderator: message.author,
                    weight: config[reason][1],
                    track: config[reason][0],
                    active: true
                }

                // make this a variable and check if it's a good reply once I do it ty future billy
                punishmenthandler.add(punishment)

                // spit out good/bad error
                new embeds.infoEmbed('success', punishEmbed, `Punished ${client.users.cache.get(args[0])} for **${args[2]} (${args[1]})**`, message.author, 10).editEmbed();

            }
        } 

  	},

};

function setconfig(type) {

    if (`${type}` == "global") {let config = punishmentconfig.punishments.global; return config;}
    if (`${type}` == "community") {let config = punishmentconfig.punishments.community; return config;}
    if (`${type}` == "official") {let config = punishmentconfig.punishments.official; return config;}
    return "not found";
}
