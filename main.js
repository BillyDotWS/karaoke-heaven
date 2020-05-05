const Discord = require('discord.js');
const client = new Discord.Client();
const credentials = require('./settings/credentials.json');
const config = require('./settings/config.json');
const fs = require('fs');

fs.readdir('./events/discord/', (err, files) => {
	const jsFiles = files.filter(f => f.split('.').pop() === 'js');

	if (jsFiles.length !== 0) {
		// eslint-disable-next-line no-unused-vars
		files.forEach((f, i) => {
			const event = require(`./events/discord/${f}`);
			const eventName = f.split('.')[0];
			client.on(eventName, event.bind(null, client));
		});
	}
});

client.login(credentials.discordToken).catch(err => console.error(err));

module.exports.client = client;
