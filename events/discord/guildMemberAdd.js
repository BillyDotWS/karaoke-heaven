const Discord = require('discord.js');
const config = require('../settings/config.json');

module.exports = async (client, member) => {
	member.roles.add(['700213602098872350']);

	const welcomeEmbed = new Discord.MessageEmbed();
	welcomeEmbed.setTitle(`:wave: **Welcome to Karaoke Heaven ${member.user.username}!**`);
	welcomeEmbed.setColor('#FFC0CB');
	welcomeEmbed.setDescription(`This discord is the home to many exciting events. You\'re even welcome to host your own events. We\'re happy you\'ve chosen to join us. Here\'s some information about our discord\n\n**:confused: What is Karaoke Heaven?**\nKaraoke heaven is a community ran discord, our main purpose is to entertain through running weekly karaoke events and allowing members to host their own events. You are able to book slots for these events whenever they open!\n\n:blue_book: **Rules & Information**\nFor full rules and information about our discord and expected behaviour within our discord, check out <#700209261917241416>. By being in our discord: you automatically agree to these rules.\n\n**:robot: Commands**\nFor further information on our bot commands for our server, use the `-help` command, this will give you a full list of all commands! You can run bot commands in <#707282308369219664>.\n\n:link: **Useful links:**\n:white_medium_small_square: [Events List](${config.domain}/events)\n:white_medium_small_square: [Bouncer Applications](${config.domain}/bouncerapplications)\n:white_medium_small_square: [Host your own event](${config.domain}/events)\n:white_medium_small_square: [Manage your balance](${config.domain}/bank)`);
	member.send(welcomeEmbed);
	client.channels.cache.get('700209212751609916').send(`${member}`);
	const channelEmbed = new Discord.MessageEmbed();
	channelEmbed.setTitle(':wave: **Welcome to Karaoke Heaven!**');
	channelEmbed.setColor('#FFC0CB');
	channelEmbed.setThumbnail(member.user.displayAvatarURL({ format: 'png' }));
	channelEmbed.setDescription(`Welcome to the discord ${member}! we hope you enjoy your time here! Please check out <#700209261917241416> for information and to view our discord server's rules`);
	client.channels.cache.get('700209212751609916').send(channelEmbed);
};
