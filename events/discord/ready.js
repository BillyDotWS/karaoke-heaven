const config = require('../../settings/config.json');
const main = require('../../main.js');
var moment = require('moment');
const punishmenthandler = require('../../API/punishmentHandler.js');
const eventHandler = require('../../API/eventHandler.js');

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
		if(activeresult[result].action != -1 && activeresult[result].action != "warning") {
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
					const targetuser = main.client.guilds.cache.get(`700208007530676314`).members.cache.get(activeresult[result].user)
					targetuser.roles.remove(['700213816201445431']);
					console.log(`trying to delete channel ${activeresult[result].id}`)
					const findchannel = activeresult[result].id.toLowerCase()
					main.client.guilds.cache.get(`700208007530676314`).channels.cache.find(c => c.name === `🚫-${findchannel}`).delete()

				}
				if(activeresult[result].track == "bantrack") {

					console.log(`expired ban #${activeresult[result].id}`)

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
					const targetuser = main.client.guilds.cache.get(`700208007530676314`).members.cache.get(activeresult[result].user)
					main.client.guilds.cache.get(`700208007530676314`).members.unban(yiteisacunt.user)
					console.log(`trying to unban ${activeresult[result].id}`)
				}
			}


		}
	}
}, 60000);


setInterval(async function() {

	// set current unix
	let currentunix = moment().unix()

	// fetch the list to loop
	const eventlist = await eventHandler.list()

	// loop through list
	for(event in eventlist) {
		
		// get event's unix time
		let eventinfo = await eventHandler.info(eventlist[event])

		let eventtime = parseInt(eventinfo[0].start)
		currenttime = parseInt(currentunix)
	

		// get time until
		let announcetime = eventtime - currenttime

		// debug
		console.log(`debug ${eventtime} - ${currenttime} = ${announcetime}`)

		// if time is less than 15 mins
		if(announcetime <= 900) {

			if(eventinfo[0].announced == false) {

				if(`${eventinfo[0].category}` === "Official") {
					rolecreated = await main.client.guilds.cache.get(`700208007530676314`).roles.create({
						data: {
						  name: `🔔 ${eventinfo[0].id}`,
						  color: 'ORANGE',
						}
					  })

					console.log(`------------------------`)
					console.log(eventinfo[0].embedid)

					const shrugUsers = await main.client.guilds.cache.get(`700208007530676314`).channels.cache.get(`700209759080546345`).fetch(eventinfo[0].embedid).reactions.cache.get(`711061304240242738`)//.users.cache.map(users => users.id);
					console.log(`------------------------`)
					console.log(shrugUsers)
					  
					for (const user in shrugUsers) {
						console.log(shrugUsers[user])
					}

					console.log(`------------------------`)
					console.log(rolecreated)
					main.client.channels.cache.get(`700208131833200660`).send(`<@&${rolecreated.id}> **Quick reminder!** \`${eventinfo[0].title}\` is starting in **15** minutes!`)
				}

				
				JSON.stringify(eventinfo[0])
				eventinfo[0].announced = true

				eventHandler.modify(eventinfo[0])
				// change to false in db

			}

		}

		if(announcetime <= 15) {

			if(eventinfo[0].active == false) {

				// change channel permissions

				// change to active

			}

		}

		if(announcetime <= -300) {

			if(eventinfo[0].active == true) {

				// change channel permissions

				// change to active

			}

		}

	}
	

    // does an event start in 15 minutes?

        // if so: has it been announced?

            // if not: announce

            // unlock event chat channel

            // tweet

    // does an event start now?

        // are hosts around?
            // unmute the hosts

        // else
            // tell people the event will start soon
            // pm the event hosts reminding them

    // does an event start 5 minutes ago?

        // are hosts around?
            // do nothing

        // else
            // set event as active: false
            // tell people event cancelled
            // stop the event

    // does an event end now?

        // is it already marked as inactive

            // do nothing

        // else

            // end the event

            // broadcast that the event is running too long

            
	
	
}, 60000);

