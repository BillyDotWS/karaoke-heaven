const punishment = {};
const main = require('../main.js');
const punishmentconfig = require('../settings/punishments.json');

punishment.add = async (punishment) => {

    console.log(`[api/punishmenthandler.js] Trying to punish ${punishment.user} for ${punishment.reason}`)
    
    
    
    
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
        return responsevar;
    }

    if (type === "mutetrack") {
        for (const punishment in history) {
            if (history[punishment].track === "bantrack") {
                weight = weight + parseInt(history[punishment].weight) }
            }
        console.log(`Weight debug: ${weight}`)
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

function mutetrack(user) {
   
    const weight = await punishment.fetchweight(user, "mutetrack")
    
    const loopconfig = punishmentconfig.weightresolves.mutetrack
    
    for(weightvalue in loopconfig) {
        
        const weightvalueint = parseInt(weightvalue)
        if(weight.weight <= weightvalueint) {
            return weightvalue[0];
        }
        
    }

    return -1;
    
}


function bantrack(weight) {
   
}
