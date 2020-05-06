module.exports = async (client, oldMember, newMember) => {
	// Config File
	const config = require('../../settings/config.json');

	// Map old and new roles
	const oldRoles = oldMember.roles.cache.map(g => g.id);
	const newRoles = newMember.roles.cache.map(g => g.id);

	// Detect if someone recieves the bouncer role
	if (!oldRoles.includes(config.roles.bouncer) && newRoles.includes(config.roles.bouncer)) {
		client.channels.cache.get('706303003400994957').send(`OMG OMG OMG OMG OMG OMG OMG OMG OMG OMG OMG GUESS WHAT? **${newMember.tag}** BOUNCER @everyone PANIC!`)
	}
};
