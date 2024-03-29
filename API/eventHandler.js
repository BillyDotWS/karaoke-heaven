const event = {};
const Discord = require('discord.js');
const main = require('../main.js');

event.create = async (event) => {

    const eventid = makeid(8)
    console.log(event)

    if(event.title.length <= 32) {

        if(event.category == `Official` || event.category == `Community`) {

            if(event.maxslots <= 50) {
                
                let submitevent = {}
                const eventEmbed = new Discord.MessageEmbed()
                eventEmbed.setTitle(`[${event.category}] ${event.title}`);
                eventEmbed.setDescription(`${event.description}`);

                // convert start unix time to normal human time
                const eventstartconverted = "uwu"

                eventEmbed.addField(`Event start:`, `\`${eventstartconverted}\``, true)

                // convert end unix time to normal human time
                const eventendconverted = "uwu"
                eventEmbed.addField(`Event end:`, `\`${eventendconverted}\``, true)

                // convert list of event hosts into mention

                if(event.hosts.length == 1) {
                    eventEmbed.addField(`Event host:`, `<@${event.hosts[0]}>`, true)
                }

                if(event.hosts.length >= 2) {
                    eventEmbed.addField(`Event hosts:`, `[Click to view](https://karaoke-heaven.net/event/${eventid})`, true)
                }

                eventEmbed.addField(`Event theme:`, `\`${event.theme}\``, true)

                eventEmbed.addField(`Event max signups:`, `\`${event.maxslots}\``, true)

                eventEmbed.addField(`View full info:`, `[Click to view](https://karaoke-heaven.net/event/${eventid})`, true)

                eventEmbed.setColor("#FFC0CB")

                eventEmbed.setThumbnail(`https://i.imgur.com/aK93jQp.png`)

                if(event.category == `Official`) {
                    main.client.guilds.cache.get(`700208007530676314`).channels.cache.get(`700209759080546345`).send(eventEmbed).then(async (msg) => {
                        
                        msg.react(`711061304240242738`)

                        submitevent = {
    
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
                            premium: false,
                            embedid: msg.id,
                            announced: false
                    
                        }
                    
                        try {
        
                            await main.client.r.db('Events').table('events').insert(submitevent, { conflict: 'update' }).run()
                            
                        } catch(err) {
                            
                            const response = {status: "error", reason: `${err}`}
                            return response;
                            
                        }
        
                        const response = {status: "success", eventid: `${eventid}`} 
                        return response;
    
                    })
                }

                if(event.category == `Community`) {
                    main.client.guilds.cache.get(`700208007530676314`).channels.cache.get(`700209781859942400`).send(eventEmbed).then(async (msg) => {
                        msg.react(`711061304240242738`)
                        submitevent = {
    
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
                            premium: false,
                            embedid: msg.id,
                            announced: false
                    
                        }
                        
                        try {
        
                            await main.client.r.db('Events').table('events').insert(submitevent, { conflict: 'update' }).run()
                            
                        } catch(err) {
                            
                            const response = {status: "error", reason: `${err}`}
                            return response;
                            
                        }
        
                        const response = {status: "success", eventid: `${eventid}`} 
                        return response;
                    })
                }




            }

        }

    }

    const response = {status: "error", reason: `You failed validation`}
    return response;


}

event.delete = async (event) => {

    try {
        
        await main.client.r.db('Events').table('events').get(`${event.id}`).delete().run()
        
    } catch(err) {
        
        const response = {status: "error", reason: `${err}`}
        return response;
        
    }
    
    const response = {status: "success"}
    return response;


}

event.endevent = async (event) => {

    setTimeout(function(){

        if(`${event.category}` === "Community") {

            const eventchannel = main.client.channels.cache.get(`700209889691041843`)
            const eventchat = main.client.channels.cache.get(`700209837866483804`)
            const memberrole = main.client.guilds.cache.get(`700208007530676314`).roles.cache.get(`700213602098872350`)
            const movelobby = main.client.channels.cache.get(`700208007530676319`)
            
            eventchannel.updateOverwrite(memberrole, {
                VIEW_CHANNEL: true,
                CONNECT: false,
                SPEAK: false,
                STREAM: false 
            })

            for(channelmember of eventchannel.members) {
                console.log(`${channelmember[0]}`)
                main.client.guilds.cache.get(`700208007530676314`).members.cache.get(`${channelmember[0]}`).voice.setChannel(movelobby)
            }

            for (let x = 0; x < 20; x++) {
                
                setTimeout(function(){

                    eventchat.bulkDelete(100)

                }, 5000)

            }

            main.client.channels.cache.get(`700209781859942400`).messages.fetch(event.embedid).then((msg) => {

                msg.delete()

            })
            main.client.r.db('Events').table('events').get(`${event.id}`).delete().run()
        }

        if(`${event.category}` === "Official") {

            const eventchannel = main.client.channels.cache.get(`700208783674048602`)
            const eventchat = main.client.channels.cache.get(`700208759770710067`)
            const memberrole = main.client.guilds.cache.get(`700208007530676314`).roles.cache.get(`700213602098872350`)
            const movelobby = main.client.channels.cache.get(`700208007530676319`)

            eventchannel.updateOverwrite(memberrole, {
                VIEW_CHANNEL: true,
                CONNECT: false,
                SPEAK: false,
                STREAM: false 
            })

            for(channelmember of eventchannel.members) {
                main.client.guilds.cache.get(`700208007530676314`).members.cache.get(`${channelmember[0]}`).voice.setChannel(movelobby)
            }

            for (let x = 0; x < 20; x++) {
                
                setTimeout(function(){

                    eventchat.bulkDelete(100)

                }, 5000);

            }
            
            main.client.channels.cache.get(`700209759080546345`).messages.fetch(event.embedid).then((msg) => {

                msg.delete()

            })

        }

    }, 20000);

}

event.modify = async (event) => {

    try {
        
        await main.client.r.db('Events').table('events').insert(event, { conflict: 'update' }).run()
        
    } catch(err) {
        
        const response = {status: "error", reason: `${err}`}
        return response;
        
    }

    if(event.category == "Official") {

        main.client.channels.cache.get(`700209759080546345`).messages.fetch(event.embedid).then((msg) => {
            const eventEmbed = new Discord.MessageEmbed()
            eventEmbed.setTitle(`[${event.category}] ${event.title}`);
            eventEmbed.setDescription(`${event.description}`);

            // convert start unix time to normal human time
            const eventstartconverted = "uwu"

            eventEmbed.addField(`Event start:`, `\`${eventstartconverted}\``, true)

            // convert end unix time to normal human time
            const eventendconverted = "uwu"
            eventEmbed.addField(`Event end:`, `\`${eventendconverted}\``, true)

            // convert list of event hosts into mention

            if(event.hosts.length == 1) {
                eventEmbed.addField(`Event host:`, `<@${event.hosts[0]}>`, true)
            }

            if(event.hosts.length >= 2) {
                eventEmbed.addField(`Event hosts:`, `[Click to view](https://karaoke-heaven.net/event/${event.id})`, true)
            }

            eventEmbed.addField(`Event theme:`, `\`${event.theme}\``, true)

            eventEmbed.addField(`Event max signups:`, `\`${event.maxslots}\``, true)
            eventEmbed.addField(`View full info:`, `[Click to view](https://karaoke-heaven.net/event/${event.id})`, true)
            eventEmbed.setColor("#FFC0CB")
            eventEmbed.setThumbnail(`https://i.imgur.com/aK93jQp.png`)

            msg.edit(eventEmbed)
        })

        const response = {status: "success"}
        return response;

    }

    if(event.category == "Community") {

        console.log(`community event embed test ${event.embedid}`)

        main.client.channels.cache.get(`700209781859942400`).messages.fetch(event.embedid).then((msg) => {
            const eventEmbed = new Discord.MessageEmbed()
            eventEmbed.setTitle(`[${event.category}] ${event.title}`);
            eventEmbed.setDescription(`${event.description}`);

            // convert start unix time to normal human time
            const eventstartconverted = "uwu" 

            eventEmbed.addField(`Event start:`, `\`${eventstartconverted}\``, true)

            // convert end unix time to normal human time
            const eventendconverted = "uwu"
            eventEmbed.addField(`Event end:`, `\`${eventendconverted}\``, true)

            // convert list of event hosts into mention

            if(event.hosts.length == 1) {
                eventEmbed.addField(`Event host:`, `<@${event.hosts[0]}>`, true)
            }

            if(event.hosts.length >= 2) {
                eventEmbed.addField(`Event hosts:`, `[Click to view](https://karaoke-heaven.net/event/${event.id})`, true)
            }

            eventEmbed.addField(`Event theme:`, `\`${event.theme}\``, true)

            eventEmbed.addField(`Event max signups:`, `\`${event.maxslots}\``, true)
            eventEmbed.addField(`View full info:`, `[Click to view](https://karaoke-heaven.net/event/${event.id})`, true)

            eventEmbed.setColor("#FFC0CB")
            eventEmbed.setThumbnail(`https://i.imgur.com/aK93jQp.png`)

            msg.edit(eventEmbed)
        })

        const response = {status: "success"}
        return response;

    }


    const response = {status: "error", reason: "Invalid category"}
    return response;

}

event.info = async (event) => {

    async function fetchinfo(event) {
        return await main.client.r.db('Events').table('events').filter({ id: event.id }).default(false).run();
    }
    
    try {
        
        const infofetch = await fetchinfo(event);
        return infofetch;

    } catch(err) {
        
        const response = {status: "error", reason: `${err}`}
        return response;
        
    }

}

event.list = async () => {

    async function eventlist() {
        return await main.client.r.db('Events').table('events').run();
    }
    
    try {
        
        const listofevents = await eventlist();
        console.log(`uwu ${listofevents}`)
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