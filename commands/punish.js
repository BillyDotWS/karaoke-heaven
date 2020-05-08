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

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const punishEmbed = await new embeds.infoEmbed('working', message.channel, `Trying to punish user ${user}`, message.author, null).sendEmbed();
        
        let config = setconfig(args[1])

        if (`${config}` == "not found") {
            return new embeds.infoEmbed('error', punishEmbed, `Invalid type, use **global**, **official** or **community**`, message.author, null).editEmbed();
        }

        for (const reason in config) {
        
            if (reason === args[2]) {
            
		let punishid = makeid(8)
		    
                const punishment = {
		    id: `${punishid}`,
                    user: `${user.id}`,
                    type: `${args[1]}`,
                    reason: `${args[2]}`,
                    moderator: `${message.author.id}`,
                    weight: `${config[reason][1]}`,
                    track: `${config[reason][0]}`,
                    active: `true`
                }

                // make this a variable and check if it's a good reply once I do it ty future billy
                const punishmentstatus = await punishmenthandler.add(punishment)
		console.log(punishmentstatus)
		
		if (`${punishmentstatus.status}` == "success") {
			// spit out good/bad error
			return new embeds.infoEmbed('success', punishEmbed, `Punished ${user} for **${args[2]} (${args[1]})**`, message.author, null).editEmbed();
		} else {
			return new embeds.infoEmbed('error', punishEmbed, `Failed to execute punishment\n\nReason: \`\`\`${punishmentstatus.reason}\`\`\``, message.author, null).editEmbed();
		}

            }
        } 
        return new embeds.infoEmbed('error', punishEmbed, `Reason was not found, check punishment guidelines.`, message.author, null).editEmbed();



  	},

};

function setconfig(type) {

    if (`${type}` == "global") {let config = punishmentconfig.punishments.global; return config;}
    if (`${type}` == "community") {let config = punishmentconfig.punishments.community; return config;}
    if (`${type}` == "official") {let config = punishmentconfig.punishments.official; return config;}
    return "not found";
}

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
