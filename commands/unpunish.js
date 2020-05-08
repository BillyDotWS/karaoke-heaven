const Discord = require('discord.js');
const punishmentconfig = require('../settings/punishments.json');
const punishmenthandler = require('../API/punishmentHandler.js');
const embeds = require('../modules/embeds.js');

module.exports = {
	name: 'unpunish',
	description: 'Revoke a punishment',
	usage: 'unpunish [punishid]',
	example: 'unpunish uwo2131a',
	requiredRoles: ['🧍🏿‍♂️  Bouncer'],
	allowedUsers: [],
	argsNeeded: 1,
	async execute(client, message, args) {

        let punishid = (args[0])
        const punishEmbed = await new embeds.infoEmbed('working', message.channel, `Trying to remove punishment ${punishid}`, message.author, null).sendEmbed();
        
        const punishment = {
            id: `${punishid}`
        }

        const punishmentstatus = await punishmenthandler.clear(punishment)
	console.log(punishmentstatus)
	
        if (`${punishmentstatus.status}` == "success") {
            // spit out good/bad error
            return new embeds.infoEmbed('success', punishEmbed, `Removed punishment ${punishid}`, message.author, null).editEmbed();
        } else {
            return new embeds.infoEmbed('error', punishEmbed, `Failed to remove punishment\n\nReason: \`\`\`${punishmentstatus.reason}\`\`\``, message.author, null).editEmbed();
        }



  	},

};

