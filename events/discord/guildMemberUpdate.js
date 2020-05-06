const Discord = require('discord.js');

module.exports = async (client, oldMember, newMember) => {
	// Config File
	const config = require('../../settings/config.json');

	// Map old and new roles
	const oldRoles = oldMember.roles.cache.map(g => g.id);
	const newRoles = newMember.roles.cache.map(g => g.id);

	// Detect if someone recieves the bouncer role
	if (!oldRoles.includes(config.roles.bouncer) && newRoles.includes(config.roles.bouncer)) {
		var bouncerEmbed = new Discord.MessageEmbed()
		bouncerEmbed.setTitle('🧍🏿‍♂️ **Congratulations!**')
		bouncerEmbed.setDescription(`You have been added to the \`🧍🏿‍♂️  Bouncer\` role in the Karaoke Heaven server! We can't wait to get to know you and welcome you to our team. In order to get you fully setup, we'll have to get you into our slack!\n\n:speech_balloon: **Joining Slack:**\nIn order to download slack, [click here](https://slack.com/intl/en-gb/downloads/windows). Once you have downloaded slack, check your email account: you will have an invite to our slack workspace, please do not share any information about this.\n\n**:confused: Need help?**\nFeel free to private message a Manager with any questions you have about joining our slack workspacce or any other questions you have. We'll be happy to help you.\n\nOnce again, congratulations on being promoted, we wish you luck as a member of the team!`)
		bouncerEmbed.setColor('#00FF00')
            	bouncerEmbed.setAuthor(newMember.user.username, newMember.user.displayAvatarURL({ format: "png"}))
            	bouncerEmbed.setThumbnail('https://i.imgur.com/wKiXoia.png')
            	bouncerEmbed.setFooter('Karaoke Heaven Bot', 'https://i.imgur.com/wKiXoia.png')
                newMember.send(bouncerEmbed)
	}
};
