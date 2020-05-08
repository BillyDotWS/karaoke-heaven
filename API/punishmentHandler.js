const punishment = {};
const main = require('../main.js');

punishment.add = async (punishment) => {

    // validation

    // add punishment to database
    const test = {
        test: "test"
    }
    await main.client.r.db('punishments').table('punishments').insert(test, { conflict: 'update' }).run();

    // error
    const returnvar = {

        status: "error",
        reason: "Invalid data"

    }

    return;
    // return

}

punishment.clear = async (punishment) => {

    // clear punishment to database

    // return

}

punishment.modify = async (punishment, data = {}) => {

    // clear punishment to database

    // return

}

punishment.fetchweight = async (user, type) => {

    // fetch weight of user in type

    // return

}

punishment.addweight = async (user, type) => {

    // add weight to user in type

    // return

}

punishment.appeal = async (punishment, data = {}) => {

    // create appeal in slack

    // email person telling them to wait

}

punishment.history = async (user) => {

    // fetch punishments of user

    // return

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
