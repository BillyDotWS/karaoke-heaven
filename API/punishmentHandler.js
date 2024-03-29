const punishment = {};
const main = require('../main.js');
const punishmentconfig = require('../settings/punishments.json');
const Discord = require('discord.js');
var moment = require('moment');

punishment.add = async (punishy) => {

    console.log(`[api/punishmenthandler.js] Trying to punish ${punishy.user} for ${punishy.reason}`)
    
    
    
    const oldweight = await punishment.fetchweight(punishy.user, punishy.track)
    
    const punishweight = parseInt(punishy.weight) 
    
    let newweight = oldweight.weight + punishweight
    
    let action = await fetchaction(newweight, punishy.track)
       
    let expiry = moment()
    const 

    actionint = parseInt(action)
    expiry = expiry.add(actionint, 'seconds').unix()


    
    const yiteisacunt = {
        
        id: `${punishy.id}`,
        user: `${punishy.user}`,
        type: `${punishy.type}`,
        track: `${punishy.track}`,        
        reason: `${punishy.reason}`,
        action: `${action}`,
        active: `true`,
        moderator: `${punishy.moderator}`,
        weight: `${punishy.weight}`,
        newweight: `${newweight}`,
        expiry: expiry
        
    }
    
    
    try {
        
        await main.client.r.db('punishments').table('punishments').insert(yiteisacunt, { conflict: 'update' }).run()
        
    } catch(err) {
        
        const response = {status: "error", reason: `${err}`}
        return response;
        
    }
    
    
    if(punishy.track == "mutetrack") {
        if(action == "warning") {
            
            punishmentchannel(punishy.user, punishy.reason, "warning", null, punishy)
            const response = {status: "success", action: `${action}`, actiontype: `warning`}
            return response;
        } else {

            punishmentchannel(punishy.user, punishy.reason, "mute", action, punishy)
            const username = main.client.guilds.cache.get(`700208007530676314`).members.cache.get(punishy.user)
            username.roles.add(['700213816201445431']);
            const response = {status: "success", action: `${action}`, actiontype: `mute`}
            return response; 
        }
    }
    
    if(punishy.track == "bantrack") {
        if(action == "warning") {

            await punishmentchannel(punishy.user, punishy.reason, "warning", null, punishy)
            const response = {status: "success", action: `${action}`, actiontype: `warning`}
            return response;
        } else {

            await punishmentchannel(punishy.user, punishy.reason, "ban", action, punishy)
            const response = {status: "success", action: `${action}`, actiontype: `ban`}
            main.client.guilds.cache.get(`700208007530676314`).members.ban(punishy.user, {reason: `Punishment ID: #${punishy.id}`});
            return response; 
        }
    }
    
}

punishment.clear = async (punishment) => {
    
    try {
        
        await main.client.r.db('punishments').table('punishments').get(`${punishment.id}`).delete().run()
        
    } catch(err) {
        
        const response = {status: "error", reason: `${err}`}
        return response;
        
    }
    
    const response = {status: "success"}
    return response;

}

punishment.modify = async (punishment) => {

    
    try {
        
        await main.client.r.db('punishments').table('punishments').insert(punishment, { conflict: 'update' }).run()
        
    } catch(err) {
        
        const response = {status: "error", reason: `${err}`}
        return response;
        
    }
    
    
    // fetch action to execute
    
    // execute action
    const response = {status: "success"}
    return response;

}

punishment.fetchweight = async (user, type) => {

    // fetch weight of user in type
    const history = await punishment.history(user)
    let weight = 0

    if (type === "bantrack") {
        for (const punishment in history) {
            if (history[punishment].track === "bantrack") {
                weight = weight + parseInt(history[punishment].weight) }
            }
        const responsevar = {status: "success", weight: weight}
        
        return responsevar;
    }

    if (type === "mutetrack") {
        for (const punishment in history) {
            if (history[punishment].track === "mutetrack") {
                weight = weight + parseInt(history[punishment].weight) }
            }
        const responsevar = {status: "success", weight: weight}
       
        return responsevar;
    }
    // return
    const responsevar = {status: "error", reason: "Failed to fetch weight"}
    return responsevar;

}

punishment.appeal = async (punishment, data = {}) => {

    // create appeal in slack

    // email person telling them to wait

}

punishment.history = async (user) => {
    

    async function checkHistory(user) {
        return await main.client.r.db('punishments').table('punishments').filter({ user: user }).default(false).run();
    }
    
    try {
        
        const historyresult = await checkHistory(user);
        return historyresult;

    } catch(err) {
        
        const response = {status: "error", reason: `${err}`}
        return response;
        
    }
        
    // execute action
    try {
        
        const response = {status: "success", result: historyresult}

    } catch(err) {
        
        const response = {status: "error", reason: `No punishments`}
        return response;
        
    }
    
     
    return response;

}

punishment.appealaccept = async (punishment) => {

    // modify punishment to say appeal accepted

    // email person

    // remove punishment on discord

    // return

}

punishment.appealdeny = async (punishment) => {

    // modify punishment to say appeal denied

    // email person

    // return

}

module.exports = punishment;

async function mutetrack (user) {
   
    const weight = await punishment.fetchweight(user, "mutetrack")
    
    const loopconfig = punishmentconfig.weightresolves.mutetrack
    
    for(weightvalue in loopconfig) {
                
        const weightvalueint = parseInt(weightvalue)
        
        if(weight.weight <= weightvalueint) {
            return loopconfig[weightvalue];
        }
        
    }

    return -1;
    
}


async function bantrack (user) {
   
    const weight = await punishment.fetchweight(user, "bantrack")
    
    const loopconfig = punishmentconfig.weightresolves.bantrack
    
    for(weightvalue in loopconfig) {
                
        const weightvalueint = parseInt(weightvalue)
        
        if(weight.weight <= weightvalueint) {
            return loopconfig[weightvalue];
        }
        
    }

    return -1;
    
}

async function fetchaction (weight, track) {
    
    if(track == "mutetrack") {

        const loopconfig = punishmentconfig.weightresolves.mutetrack

        for(weightvalue in loopconfig) {

            const weightvalueint = parseInt(weightvalue)

            if(weight <= weightvalueint) {
                return loopconfig[weightvalue];
            }

        }
    
    }
    
    if(track == "bantrack") {

        const loopconfig = punishmentconfig.weightresolves.bantrack

        for(weightvalue in loopconfig) {

            const weightvalueint = parseInt(weightvalue)

            if(weight <= weightvalueint) {
                return loopconfig[weightvalue];
            }

        }
    
    }
   
}

async function punishmentchannel (user, reason, type, length, punishment) {

    if(type == "warning") {
        
        const username = main.client.guilds.cache.get(`700208007530676314`).members.cache.get(user)
        const channel = await main.client.guilds.cache.get(`700208007530676314`).channels.create(`🚫-${punishment.id}`, {
        type: 'text',

        })
    
        const warnEmbed = new Discord.MessageEmbed()
        channel.send(`${username}`)
        warnEmbed.setTitle(`You have been warned!`);
        warnEmbed.setDescription(`You have been warned for \`${reason}\`.\n\n This behaviour will not be tolerated within our discord, please ensure that you follow our rules at all times when within our discord: you can find more information about our rules in <#700209261917241416>.\n\nFailure to follow these rules may lead to further, more severe punishments: please remember this before breaking our rules. This punishment may prevent you from accessing parts of our website or being eligible for specific perks, depending on the punishment.\n\nYou can appeal your punishment by clicking below:\n[Appeal my punishment](https://karaoke-heaven.net/appeal/)`);
        channel.send(warnEmbed);
        let everyone = main.client.guilds.cache.get(`700208007530676314`).roles.cache.get(`700208007530676314`)
        channel.updateOverwrite(everyone, { VIEW_CHANNEL: false });
        channel.updateOverwrite(username, { VIEW_CHANNEL: true, CREATE_INVITE: false, SEND_MESSAGES: false, READ_MESSAGES: true });
        channel.setParent(`700214247661109268`)
        return;
    }
    

    if(type == "mute") {
        
        const username = main.client.guilds.cache.get(`700208007530676314`).members.cache.get(user)
        const channel = await main.client.guilds.cache.get(`700208007530676314`).channels.create(`🚫-${punishment.id}`, {
        type: 'text',

        })
        channel.send(`${username}`)
        const warnEmbed = new Discord.MessageEmbed()
        warnEmbed.setTitle(`You have been muted!`);
        warnEmbed.setDescription(`You have been muted for \`${reason}\`, this will expire in \`${length} seconds\`.\n\n This behaviour will not be tolerated within our discord, please ensure that you follow our rules at all times when within our discord: you can find more information about our rules in <#700209261917241416>.\n\nFailure to follow these rules may lead to further, more severe punishments: please remember this before breaking our rules. This punishment may prevent you from accessing parts of our website or being eligible for specific perks, depending on the punishment.\n\nYou can appeal your punishment by clicking below:\n[Appeal my punishment](https://karaoke-heaven.net/appeal/)`);
        channel.send(warnEmbed);
        let everyone = main.client.guilds.cache.get(`700208007530676314`).roles.cache.get(`700208007530676314`)
        channel.updateOverwrite(everyone, { VIEW_CHANNEL: false });
        channel.updateOverwrite(username, { VIEW_CHANNEL: true, CREATE_INVITE: false, SEND_MESSAGES: false, READ_MESSAGES: true });
        channel.setParent(`700214247661109268`)
        return;
    }

    if(type == "ban") {
        
        const username = main.client.guilds.cache.get(`700208007530676314`).members.cache.get(user)
        const warnEmbed = new Discord.MessageEmbed()
        warnEmbed.setTitle(`You have been banned!`);
        warnEmbed.setDescription(`You have been banned for \`${reason}\`, this will expire in \`${length} seconds\`.\n\n This behaviour will not be tolerated within our discord, please ensure that you follow our rules at all times when within our discord: you can find more information about our rules in <#700209261917241416>.\n\nFailure to follow these rules may lead to further, more severe punishments: please remember this before breaking our rules. This punishment may prevent you from accessing parts of our website or being eligible for specific perks, depending on the punishment.\n\nYou can appeal your punishment by clicking below:\n[Appeal my punishment](https://karaoke-heaven.net/appeal/)`);
        return await username.send(warnEmbed);

    }

}

function convertTheThingToTheThing(time, longText) {
    const intervals = [
        [31536000, "year"  ],
        [ 2592000, "month" ],
        [   86400, "day"   ],
        [    3600, "hour"  ],
        [      60, "minute"],
        [       1, "second"],
    ]

    let intervalStrings = []
    for (let i = 0; i < intervals.length; i++) {
        let divResult = Math.floor(time / intervals[i][0])
        if (divResult > 0) {
            intervalStrings.push(divResult + " " + intervals[i][1] + ((divResult > 1) ? "s" : ""))
            time = time % intervals[i][0]
            if (!longText) break
        }
    }

    return intervalStrings.join(", ")
}
//console.log(convertTheThingToTheThing(Date.now()))
//50392 years

//console.log(convertTheThingToTheThing(Date.now(), true))
//50392 years, 6 days, 8 hours, 51 minutes, 40 seconds