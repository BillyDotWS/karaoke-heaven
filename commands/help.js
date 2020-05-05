const Discord = require('discord.js')
const config = require('../settings/config.json')

module.exports = {
    name: 'help',
    description: 'View all bot commands',
    usage: '-help [command]',
    requiredRoles: ['👪 Member', '🧍🏿‍♂️  Bouncer'],
    allowedUsers: [],
    argsNeeded: 0,
    async execute(client, message, args, embeds) {
        var helpEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png"}))
            .setColor('#FFC0CB')
            .setThumbnail('https://i.imgur.com/wKiXoia.png')
            .setFooter('Karaoke Heaven Bot', 'https://i.imgur.com/wKiXoia.png')
          
        if (args[0]) {
            if (client.commands.get(args[0])) {
                helpEmbed.setTitle(client.commands.get(args[0]).name.charAt(0).toUpperCase() + client.commands.get(args[0]).name.slice(1) + ' Command')
                helpEmbed.addField('Command Usage', `\`${config.prefix}${client.commands.get(args[0]).usage}\``)
                helpEmbed.addField('Required Role', message.channel.guild.roles.cache
                    .find(role => role.name === client.commands.get(args[0]).requiredRoles[0]))
                message.channel.send(helpEmbed)
            
            } else sendMainHelperEmbed(message, helpEmbed, [])

               
        } else sendMainHelpEmbed(message, helpEmbed, [])

    }    
}

function sendMainHelpEmbed(message, helpEmbed, commands) {
    message.client.commands.map(command => command).forEach(cmd => {
        if (message.member.roles.cache
            .some(r => cmd.requiredRoles.includes(r.name)) || cmd.allowedUsers.includes(message.author.id))
                commands.push({name: cmd.name, description: cmd.description})
    })
    var helpEmbed = new Discord.MessageEmbed()
    helpEmbed.setTitle('Command List')
    helpEmbed.setDescription(`**Use ${config.prefix}help (command) for further information**`)
    helpEmbed.addField('Command', commands.map(m => m.name).join("\n"), true)
    helpEmbed.addField('Description', commands.map(m => m.description).join("\n"), true)
    helpEmbed.setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png"}))
    helpEmbed.setColor('#FFC0CB')
    helpEmbed.setFooter('Karaoke Heaven Bot', 'https://i.imgur.com/wKiXoia.png')
    message.channel.send(helpEmbed)

}
