module.exports = {
	name: 'eval',
	description: 'Run a piece of code from Discord',
	usage: '-eval <code>',
	requiredRoles: ['Guild Master'],
	allowedUsers: ['686643076420206597', '213849560508792832'],
	argsNeeded: 1,
	async execute(client, message, args) {
		if (filteredCode.some(w => args.join(' ').toLowerCase().includes(w))) {
			message.channel.send(`▶️ **Input**\n\`\`\`${args.join(' ')}\`\`\`\n\n◀️ **Output**\n\`\`\`Eval Block, don't test me bitch\`\`\``);
			return;
		}
		try {
			var evaledCode = require('util').inspect(eval(args.join(' '), {
				depth: 0,
			}));

			if (typeof evaledCode !== 'string') {
				evaledCode = require('util').inspect(evaledCode);
			}

			message.channel.send(`${message.author}\n▶️ **Input**\n\`\`\`${args.join(' ')}\`\`\`\n\n◀️ **Output**\n\`\`\`${evaledCode}\`\`\``).catch(() => {
				return message.channel.send({
					files: [{
						attachment: Buffer.from(evaledCode),
						name: 'output.txt',
					}],
				});
			});
		}
		catch (e) {
			message.channel.send(`${message.author}\n▶️ **Input**\n\`\`\`${args.join(' ')}\`\`\`\n\n◀️ **Output**\n\`\`\`${e.stack}\`\`\``).catch(() => {
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
