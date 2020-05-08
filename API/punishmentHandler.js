const punishment = {};
const main = require('../main.js');

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

    // return

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
        console.log(historyresult);

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
