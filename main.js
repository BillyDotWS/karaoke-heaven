const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login('NzAwNDkyNDEwNTg0Njk0ODQ0.XrBzng.90Ww5xr8qNQF14zrD4OB7slO7cg');
