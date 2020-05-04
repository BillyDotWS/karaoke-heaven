const config = require('../../settings/config.json');

module.exports = async (client) => {
	console.log(`[D] - Logged in as ${client.user.tag}`);
	client.user.setActivity(`Loud Music`);
};
