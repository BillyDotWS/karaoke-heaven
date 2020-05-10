const punishment = {};
const main = require('../main.js');
const punishmentconfig = require('../settings/punishments.json');

punishment.add = async (punishy) => {

    console.log(`[api/punishmenthandler.js] Trying to punish ${punishy.user} for ${punishy.reason}`)
    
    const action = fetchaction(punishy.user, punishy.track)
    
    const newweight = await punishment.fetchweight(punishy.user, punishy.track)
    newweight = newweight + parseInt(punishy.weight) 
    
    const yiteisacunt = {
        
        id: `${punishy.id}`,
        user: `${punishy.user}`,
        type: `${punishy.type}`,
        track: `${punishy.track}`,        
        reason: `${punishy.reason}`,
        action: `${action}`,
        active: true,
        moderator: `${punishy.moderator}`,
        weight: `${punishy.weight}`,
        newweight: `${newweight}`
        
    }
    
    console.log(yiteisacunt)
    
    try {
        
        await main.client.r.db('punishments').table('punishments').insert(yiteisacunt, { conflict: 'update' }).run()
        
    } catch(err) {
        
        const response = {status: "error", reason: `${err}`}
        return response;
        
    }
    
    
    if(punishy.track == "mutetrack") {
        if(action == "warning") {
            const response = {status: "success", action: `${action}`, actiontype: `warning`}
            return response;
        } else {
            const response = {status: "success", action: `${action}`, actiontype: `mute`}
            return response; 
        }
    }
    
    if(punishy.track == "bantrack") {
        if(action == "warning") {
            const response = {status: "success", action: `${action}`, actiontype: `warning`}
            return response;
        } else {
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

    console.log(`[api/punishmenthandler.js] Trying to update punishment ${punishment.user} for ${punishment.reason}`)
    
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
        console.log(`Weight debug: ${weight}`)
        const responsevar = {status: "success", weight: weight}
        
        console.log(`fetchweight function debug: ${responsevar.weight}`)
        return responsevar;
    }

    if (type === "mutetrack") {
        for (const punishment in history) {
            console.log(`mutetrack loop - ${history[punishment].track}`)
            if (history[punishment].track === "mutetrack") {
                weight = weight + parseInt(history[punishment].weight) }
            }
        console.log(`Weight debug: ${weight}`)
        const responsevar = {status: "success", weight: weight}
        
        console.log(`fetchweight function debug: ${responsevar.weight}`)
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
    console.log(`mutetrack function debug: ${weight.weight}`)
    
    const loopconfig = punishmentconfig.weightresolves.mutetrack
    
    for(weightvalue in loopconfig) {
                
        const weightvalueint = parseInt(weightvalue)
        
        if(weight.weight <= weightvalueint) {
            console.log(`debug, true loop`)
            return loopconfig[weightvalue];
        }
        
    }

    return -1;
    
}


async function bantrack (user) {
   
    const weight = await punishment.fetchweight(user, "bantrack")
    console.log(`mutetrack function debug: ${weight.weight}`)
    
    const loopconfig = punishmentconfig.weightresolves.bantrack
    
    for(weightvalue in loopconfig) {
                
        const weightvalueint = parseInt(weightvalue)
        
        if(weight.weight <= weightvalueint) {
            console.log(`debug, true loop`)
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
