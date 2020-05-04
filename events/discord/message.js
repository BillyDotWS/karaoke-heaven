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

	if (message.channel.name === 'guild-bridge' || message.channel.name === 'officer-bridge') {
		if (message.author.bot) return;
		else return guildBridge.bridgeToMC(message, message.channel.name);
	}

	const messageAsArray = message.content.split(/ +/);
	const args = messageAsArray.slice(1);

	if (message.channel.name === 'verification') {
		if (message.content.split(' ').length === 1) {
			message.delete();
			const discordUser = client.users.cache.get(message.author.id);
			return verify.linkAccount(message, false, discordUser, message.content.split(' ')[0], null);
		}
		else {return message.delete();}
	}

	const command = client.commands.get(messageAsArray[0].slice(config.prefix.length).toLowerCase());

	if (!message.content.startsWith(config.prefix) || !command) return;

	if (message.member.roles.cache.some(r => command.requiredRoles.includes(r.name)) || command.allowedUsers.includes(message.author.id)) {
		if (command.argsNeeded <= args.length) command.execute(client, message, args);
		else new embeds.infoEmbed('error', message.channel, `That command requires at least **${command.argsNeeded - args.length}** arg(s) to run`, message.author, 10).sendEmbed();
	}
	else {new embeds.infoEmbed('error', message.channel, `You must have the role ${message.guild.roles.cache.find(role => role.name === command.requiredRoles[0])} to run that command`, message.author, 10).sendEmbed();}
};
