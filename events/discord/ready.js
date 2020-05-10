const config = require('../../settings/config.json');
const main = require('../../main.js');

module.exports = async (client) => {
	console.log(`[/events/discord/ready.js] Logged in as ${client.user.tag}`);
	client.user.setActivity('Loud Music');
};

setInterval(async function() {

    const currentunix = new Date().getTime()
	
    async function getallbans() {
        return await main.client.r.db('punishments').table('punishments').filter({ active: "true" }).default(false).run();
    }

    const activeresult = await getallbans();
 
	for(result in activeresult) {// for loop of active
		console.log(activeresult[result])
	    // if expiry is not -1:

		// if expiry unix is less than current

		     // if mute
			 //unmute

		     //if ban
			 //unban
	}
}, 60000);
