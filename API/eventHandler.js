const event = {};

event.create = async (event) => {

    const eventid = makeid(8)

    if(event.title.length() <= 32) {

        if(event.category == "official" || category == "community") {

            if(event.maxslots <= 50) {
                
                

                const submitevent = {

                    id: eventid,
                    title: `${event.title}`,
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

event.modify = async (event, args, data = {}) => {

    // validation

    // if fine, modify event embed

    // update db

    // return done json

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

    // return list of events json

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
 