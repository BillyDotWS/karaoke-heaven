const Discord = require('discord.js');
const config = require('../settings/config.json');

module.exports = {
	name: 'help',
	description: 'View all bot commands',
	usage: 'help [command]',
	requiredRoles: ['👪 Member', '🧍🏿‍♂️  Bouncer'],
	allowedUsers: [],
	argsNeeded: 0,
	async execute(client, message, args) {
		const helpEmbed = new Discord.MessageEmbed()
			.setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'png' }))
			.setColor('#FFC0CB')
			.setThumbnail('https://i.imgur.com/wKiXoia.png')
			.setFooter('Karaoke Heaven Bot', 'https://i.imgur.com/wKiXoia.png');

		if (args[0]) {
			if (client.commands.get(args[0])) {
				helpEmbed.setTitle(client.commands.get(args[0]).name.charAt(0).toUpperCase() + client.commands.get(args[0]).name.slice(1) + ' Command');
				helpEmbed.addField('Command Usage:', `\`${config.prefix}${client.commands.get(args[0]).usage}\``);
				helpEmbed.addField('Command Description:', `\`${client.commands.get(args[0]).description}\``);
				helpEmbed.addField('Required Role:', `\`${client.commands.get(args[0]).requiredRoles}\``);
				message.channel.send(helpEmbed);

			}
			else {sendMainHelpEmbed(message, helpEmbed, []);}


		}
		else {sendMainHelpEmbed(message, helpEmbed, []);}


	},
};

function sendMainHelpEmbed(message, helpEmbed, commands) {
	message.client.commands.map(command => command).forEach(cmd => {
		if (message.member.roles.cache
			.some(r => cmd.requiredRoles.includes(r.name)) || cmd.allowedUsers.includes(message.author.id)) {commands.push({ name: cmd.name, description: cmd.description });}
	});
	const mainHelpEmbed = new Discord.MessageEmbed();
	mainHelpEmbed.setTitle('Command List');
	mainHelpEmbed.setDescription(`**Use \`${config.prefix}help (command)\` for further information**`);
	mainHelpEmbed.addField('Command', commands.map(m => m.name).join('\n'), true);
	mainHelpEmbed.addField('Description', commands.map(m => m.description).join('\n'), true);
	mainHelpEmbed.setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'png' }));
	mainHelpEmbed.setColor('#FFC0CB');
	mainHelpEmbed.setFooter('Karaoke Heaven Bot', 'https://i.imgur.com/wKiXoia.png');
	message.channel.send(mainHelpEmbed);

}
