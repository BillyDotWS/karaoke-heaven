const punishment = {};
const main = require('../main.js');
const punishmentconfig = require('../settings/punishments.json');

punishment.add = async (punishy) => {

    console.log(`[api/punishmenthandler.js] Trying to punish ${punishy.user} for ${punishy.reason}`)
    
    const action = await fetchaction(punishy.user, punishy.track)
    
    const oldweight = await punishment.fetchweight(punishy.user, punishy.track)
    
    const punishweight = parseInt(punishy.weight) 
       
    let newweight = oldweight.weight + punishweight
    
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
        newweight: `${newweight}`
        
    }
    
    
    try {
        
        await main.client.r.db('punishments').table('punishments').insert(yiteisacunt, { conflict: 'update' }).run()
        
    } catch(err) {
        
        const response = {status: "error", reason: `${err}`}
        return response;
        
    }
    
    
    if(punishy.track == "mutetrack") {
        if(action == "warning") {
            
            punishmentchannel(punishy.user, punishy.reason, "warning", null)
            const response = {status: "success", action: `${action}`, actiontype: `warning`}
            return response;
        } else {

            punishmentchannel(punishy.user, punishy.reason, "mute", action)
            const response = {status: "success", action: `${action}`, actiontype: `mute`}
            return response; 
        }
    }
    
    if(punishy.track == "bantrack") {
        if(action == "warning") {

            punishmentchannel(punishy.user, punishy.reason, "warning", null)
            const response = {status: "success", action: `${action}`, actiontype: `warning`}
            return response;
        } else {

            punishmentchannel(punishy.user, punishy.reason, "ban", action)
            const response = {status: "success", action: `${action}`, actiontype: `ban`}
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

punishment.modify = async (punishment, data = {}) => {

    
    try {
        
        await main.client.r.db('punishments').table('punishments').insert(punishment, { conflict: 'update' }).run()
        
    } catch(err) {
        
        const response = {status: "error", reason: `${err}`}
        return response;
        
    }
    
    
    // fetch action to execute
    
    // execute action
    const response = {status: "success", action: "uwu"}
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

async function fetchaction (user, track) {
    
    if(track == "mutetrack") {
        return action = await mutetrack(user)
    
    }
    
    if(track == "bantrack") {
        return action = await bantrack(user)   
    
    
    }
   
}

async function punishmentchannel (user, reason, type, length) {

    if(type == "warning") {
        
        const username = main.client.guilds.cache.get(`700208007530676314`).members.cache.get(user)
        const channel = await main.client.guilds.cache.get(`700208007530676314`).channels.create(`warning-${username.user.username}`, {
        type: 'text',

        })
    
        const warnEmbed = new Discord.MessageEmbed()
        warnEmbed.setTitle(`You have been warned!`);
        warnEmbed.setDescription(`You have been warned for ${reason}. This behaviour will not be tolerated within our discord, please ensure that you follow our rules at all times when within our discord: you can find more information about our rules in <#700209261917241416>.\n\nFailure to follow these rules may lead to further, more severe punishments: please remember this before breaking our rules.\n\nYou can appeal your punishment by clicking below:\n[Appeal my punishment](https://karaoke-heaven.net/appeal/)`);
        channel.send(warnEmbed);
        let everyone = message.guild.roles.cache.get(`700208007530676314`)
        channel.updateOverwrite(everyone, { VIEW_CHANNEL: false });
        channel.updateOverwrite(username, { VIEW_CHANNEL: true, CREATE_INVITE: false, SEND_MESSAGES: false, READ_MESSAGES: true });

    }
    

    if(type == "mute") {
        
    }

    if(type == "ban") {
        
    }

}
