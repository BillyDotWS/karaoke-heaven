const config = require('../../settings/config.json');

module.exports = async (client) => {
	console.log(`[/events/discord/ready.js] Logged in as ${client.user.tag}`);
	client.user.setActivity('Loud Music');
};

setInterval(function() {

    const currentunix = new Date().getTime()
	
    // get punishments that are active
 
    // for loop of active
	    // if expiry is not -1:

		// if expiry unix is less than current

		     // if mute
			 //unmute

		     //if ban
			 //unban
}, 60000);
