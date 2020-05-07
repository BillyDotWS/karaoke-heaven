const punishment = {};

punishment.add = async (punishment) => {

    console.log(punishment);
    // add punishment to database

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