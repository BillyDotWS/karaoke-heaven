const config = require('../../settings/config.json');
const main = require('../../main.js');
var moment = require('moment');

module.exports = async (client) => {
	console.log(`[/events/discord/ready.js] Logged in as ${client.user.tag}`);
	client.user.setActivity('Loud Music');
};

setInterval(async function() {

	const currentunix = new Date().getTime()
	currentunix = moment.unix(currentunix)

	
    async function getallbans() {
        return await main.client.r.db('punishments').table('punishments').filter({ active: "true" }).default(false).run();
    }

    const activeresult = await getallbans();
 
	for(result in activeresult) {// for loop of active
		if(activeresult[result].expiry >= 0) {
			if(activeresult[result].expiry <= currentunix) {
				if(activeresult[result].track == "mutetrack") {
					console.log(`expired mute #${activeresult[result].id}`)
				}
				if(activeresult[result].track == "bantrack") {
					console.log(`expired ban #${activeresult[result].id}`)
				}
			}


		}
	}
}, 60000);
