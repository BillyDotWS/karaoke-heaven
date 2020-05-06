const Discord = require('discord.js');
const fs = require('fs');
const embeds = require('../../modules/embeds');
const config = require('../../settings/config.json');

module.exports = async (client, message) => {
	if (message.author.bot) return;

	client.commands = new Discord.Collection();

	const commandFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(`../../commands/${file}`);
		client.commands.set(command.name, command);
	}

	const messageAsArray = message.content.split(/ +/);
	const args = messageAsArray.slice(1);

	const command = client.commands.get(messageAsArray[0].slice(config.prefix.length).toLowerCase());

	if (!message.content.startsWith(config.prefix) || !command) return;

	if (message.member.roles.cache.some(r => command.requiredRoles.includes(r.name)) || command.allowedUsers.includes(message.author.id)) {
		if (command.argsNeeded <= args.length) command.execute(client, message, args);
		else new embeds.infoEmbed('error', message.channel, `That command requires at least **${command.argsNeeded - args.length}** arg(s) to run`, message.author, 10).sendEmbed();
	}
	else {new embeds.infoEmbed('error', message.channel, `You must have the role ${message.guild.roles.cache.find(role => role.name === command.requiredRoles[0])} to run that command`, message.author, 10).sendEmbed();}
};
