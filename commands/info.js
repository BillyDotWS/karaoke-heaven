const Discord = require('discord.js')
const config = require('../settings/config.json')
const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: 'info',
    description: 'View information about the bot',
    usage: 'info',
    requiredRoles: ['@everyone'],
    allowedUsers: [],
    argsNeeded: 0,
    async execute(client, message, args, embeds) {
        const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        var commandembed = new Discord.MessageEmbed()
        commandembed.setTitle('Bot Information')
        commandembed.setDescription(`Mem Usage: \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`\nUptime: \`${duration}\`\nDiscord.js: \`v${version}\`\nNode: \`${process.version}\``)
        commandembed.setColor('#FFC0CB')
        message.channel.send(commandembed)
    }

};
