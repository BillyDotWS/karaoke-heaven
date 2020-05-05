const config = require('../settings/config.json');
const Discord = require('discord.js');

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
			evalEmbed.setTitle(':white_check_mark: **Success!**')
			evalEmbed.setColor('#00FF00')
                	evalEmbed.addField('Result:', `\`\`\`${evaledCode}\`\`\``)
                	message.channel.send(evalEmbed).catch(() => {
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
			evalEmbed.setTitle(':warning: **Error!**')
                	evalEmbed.addField('Result:', `\`\`\`${e.stack}\`\`\``)
			evalEmbed.setColor('#FF4500')
                	message.channel.send(evalEmbed).catch(() => {
				return message.channel.send({
					files: [{
						attachment: Buffer.from(e.stack),
						name: 'error.txt',
					}],
				});
			});
		}
	},
};
