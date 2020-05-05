const config = require('../settings/config.json');

module.exports = {
  name: 'eval',
  description: 'Run a piece of code from Discord',
  usage: 'eval <code>',
  requiredRoles: ['☕ Developer'],
  allowedUsers: ['707010477917470761', '213849560508792832'],
  argsNeeded: 1,
  async execute(client, message, args) {
    try {
      var evaledCode = require('util').inspect(eval(args.join(' '), {
        depth: 0,
      }));

      if (typeof evaledCode !== 'string') {
        evaledCode = require('util').inspect(evaledCode);
      }

      var evalEmbed = new Discord.MessageEmbed()
      helpEmbed.setTitle('Eval Result')
      helpEmbed.setDescription(`:white_check_mark: **Success!**`)
      helpEmbed.addField('Output', '\`\`\`${evaledcode}\`\`\``, true)
      helpEmbed.setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png"}))
      helpEmbed.setColor('#FFC0CB')
      helpEmbed.setFooter('Karaoke Heaven Bot', 'https://i.imgur.com/2w4KKRE.png')
      message.channel.send(helpEmbed).catch(() => {
        return message.channel.send({
          files: [{
            attachment: Buffer.from(evaledCode),
            name: 'output.txt',
          }],
        });
      });
    }
    catch (e) {
      var evalEmbed = new Discord.MessageEmbed()
      helpEmbed.setTitle('Eval Result')
      helpEmbed.setDescription(`:warning: **Error!**`)
      helpEmbed.addField('Output', '\`\`\`${e.stack}\`\`\``, true)
      helpEmbed.setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png"}))
      helpEmbed.setColor('#FFC0CB')
      helpEmbed.setFooter('Karaoke Heaven Bot', 'https://i.imgur.com/2w4KKRE.png')
      message.channel.send(helpEmbed).catch(() => {
        return message.channel.send({
          files: [{
            attachment: Buffer.from(evaledCode),
            name: 'error.txt',
          }],
        });
      });
    }
  },
};
