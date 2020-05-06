const Discord = require('discord.js');
const client = new Discord.Client();
const credentials = require('./settings/credentials.json');
const config = require('./settings/config.json');
const fs = require('fs');
require('./website/dashboard.js')(client);

const SlackBot = require('slackbots');
const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()

console.log(process.env.BOT_TOKEN)

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

const slacc = new SlackBot({
    token: process.env.BOT_TOKEN,
    name: 'karaoke_heaven'
})

slacc.on('message', (data) => {
    if(data.type !== 'message') {
        return;
    }
    handleMessage(data.text);
})

slacc.on('start', () => {
    const params = {
        icon_emoji: ':robot_face:'
    }

    slacc.postMessageToChannel(
        'commands',
        'Bot turned on',
        params
    );
})

slacc.on('error', (err) => {
    console.log(err);
})

function handleMessage(message) {
    if(message.includes(' command')) {
	    slacc.postMessageToChannel(
		'commands',
		'uwu',
		params
	    );
    }
}

client.login(credentials.discordToken).catch(err => console.error(err));

module.exports.client = client;
