const Discord = require('discord.js');
const fs = require('fs');
const verify = require('../../modules/verifyUser');
const guildBridge = require('../../modules/guildBridge');
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
};
