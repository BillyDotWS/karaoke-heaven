const event = {};
const Discord = require('discord.js');
const main = require('../main.js');

event.create = async (event) => {

    const eventid = makeid(8)


    if(event.title.length <= 32) {

        if(event.category == "official" || event.category == "community") {

            if(event.maxslots <= 50) {
                
                

                const submitevent = {

                    id: eventid,
                    title: `${event.title}`,
                    description: `${event.description}`,
                    start: event.start,
                    end: event.end,
                    hosts: event.hosts,
                    category: `${event.category}`,
                    maxslots: event.maxslots,
                    slotsperperson: event.slotsperperson,
                    inviteonly: false,
                    invites: [],
                    active: false,
                    theme: `${event.theme}`,
                    creator: event.hosts[0],
                    goldenabled: true,
                    auctions: true,
                    premium: false
            
                }


                try {
        
                    await main.client.r.db('events').table('events').insert(submitevent, { conflict: 'update' }).run()
                    
                } catch(err) {
                    
                    const response = {status: "error", reason: `${err}`}
                    return response;
                    
                }

                const eventEmbed = new Discord.MessageEmbed()
                eventEmbed.setTitle(`[${event.category}] ${event.title}`);
                eventEmbed.setDescription(`${event.description}`);

                // convert start unix time to normal human time

                eventEmbed.addField(`Event start:`, `\`${eventstartconverted}\``, true)

                // convert end unix time to normal human time

                eventEmbed.addField(`Event end:`, `\`${eventendconverted}\``, true)

                // convert list of event hosts into mention

                if(event.hosts.length == 1) {
                    eventEmbed.addField(`Event host:`, `<@${event.hosts[0]}>`, true)
                }

                if(event.hosts.length >= 2) {
                    eventEmbed.addField(`Event hosts:`, `[Click to view](https://karaoke-heaven.net/event/${submitevent.id})`, true)
                }

                eventEmbed.addField(`Event theme:`, `\`${event.theme}\``, true)

                eventEmbed.addField(`Event max slots:`, `\`${event.maxslots}\``, true)

                main.client.guilds.cache.get(`700208007530676314`).channels.cache.get(`700209759080546345`).send(eventEmbed);
                // id: 700209759080546345
                // discord embed

            }

        }

    }

    const response = {status: "success", eventid: `${eventid}`}
    return response;


}

event.delete = async (event) => {

    const validationcheck = await event.info(event.id)

    if(validationcheck[0].id == null) {
        return response = { status: "error", reason: "No event found with that ID"}
    }

    try {
        
        await main.client.r.db('events').table('events').get(`${event.id}`).delete().run()
        
    } catch(err) {
        
        const response = {status: "error", reason: `${err}`}
        return response;
        
    }
    
    const response = {status: "success"}
    return response;


}

event.modify = async (event) => {

    try {
        
        await main.client.r.db('events').table('events').insert(event, { conflict: 'update' }).run()
        
    } catch(err) {
        
        const response = {status: "error", reason: `${err}`}
        return response;
        
    }

    const response = {status: "success"}
    return response;

}

event.info = async (event) => {

    async function fetchinfo(user) {
        return await main.client.r.db('events').table('events').filter({ id: event.id }).default(false).run();
    }
    
    try {
        
        const infofetch = await fetchinfo(user);
        return infofetch;

    } catch(err) {
        
        const response = {status: "error", reason: `${err}`}
        return response;
        
    }

}

event.list = async () => {

    async function eventlist() {
        return await main.client.r.db('events').table('events').run();
    }
    
    try {
        
        const listofevents = await eventlist();
        return listofevents;

    } catch(err) {
        
        const response = {status: "error", reason: `${err}`}
        return response;
        
    }

}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 
 
module.exports = event;