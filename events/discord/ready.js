const config = require('../../settings/config.json');
const main = require('../../main.js');
var moment = require('moment');
const punishmenthandler = require('../../API/punishmentHandler.js');

module.exports = async (client) => {
	console.log(`[/events/discord/ready.js] Logged in as ${client.user.tag}`);
	client.user.setActivity('Loud Music');
};

setInterval(async function() {

	let currentunix = moment().unix()
	
    async function getallbans() {
        return await main.client.r.db('punishments').table('punishments').filter({ active: "true" }).default(false).run();
    }

    const activeresult = await getallbans();
 
	for(result in activeresult) {// for loop of active
		if(activeresult[result].expiry >= 0) {
			if(activeresult[result].expiry <= currentunix) {
				if(activeresult[result].track == "mutetrack") {

					console.log(`expired mute #${activeresult[result].id}`)

					const yiteisacunt = {
        
						id: `${activeresult[result].id}`,
						user: `${activeresult[result].user}`,
						type: `${activeresult[result].type}`,
						track: `${activeresult[result].track}`,        
						reason: `${activeresult[result].reason}`,
						action: `${activeresult[result].action}`,
						active: `false`,
						moderator: `${activeresult[result].moderator}`,
						weight: `${activeresult[result].weight}`,
						newweight: `${activeresult[result].newweight}`,
						expiry: `${activeresult[result].expiry}`
						
					}

					const modifypunishment = await punishmenthandler.modify(yiteisacunt)
					main.client.guilds.cache.get(`700208007530676314`).members..cache.get(activeresult[result].user).roles.remove(['700213816201445431']);

				}
				if(activeresult[result].track == "bantrack") {
					console.log(`expired ban #${activeresult[result].id}`)
				}
			}


		}
	}
}, 60000);
