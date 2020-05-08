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
        const punishEmbed = await new embeds.infoEmbed('working', message.channel, `Trying to find history of ${user}`, message.author, null).sendEmbed();
        
        const punishmentstatus = await punishmenthandler.history(user.id)
	    console.log(punishmentstatus)
	
        if (`${punishmentstatus.status}` == "success") {
            // spit out good/bad error
            return new embeds.infoEmbed('success', punishEmbed, `Punishment history:\n\`\`\`${punishmentstatus.result}\`\`\``, message.author, null).editEmbed();
        } else {
            return new embeds.infoEmbed('error', punishEmbed, `Failed to fetch history\n\nReason: \`\`\`${punishmentstatus.reason}\`\`\``, message.author, null).editEmbed();
        }



  	},

};
