const Discord = require('discord.js');
const { version } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

module.exports = {
	name: 'info',
	description: 'View information about the bot',
	usage: 'info',
	requiredRoles: ['@everyone'],
	allowedUsers: [],
	argsNeeded: 0,
	async execute(client, message) {
		const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
		const commandEmbed = new Discord.MessageEmbed();
		commandEmbed.setTitle('Bot Information');
		commandEmbed.setDescription(`This bot was created with a lot of hard work and tears! And code, we should not forget that.\n\n**:construction_worker: Creator Information:**\nAuthor: \`CookieBilly\`\nDiscord: \`CookieBilly#8137\`\nGithub: [Click here](https://github.com/CookieBilly)\n\n**:desktop: Server Information:**\nMemory Usage: \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB/8192 MB\`\nUptime: \`${duration}\`\nDiscord.js: \`v${version}\`\nNode: \`${process.version}\``);
		commandEmbed.setColor('#FFC0CB');
		message.channel.send(commandEmbed);
	},

};
