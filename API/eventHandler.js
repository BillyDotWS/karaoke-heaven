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

    // delete event validation

    // delete event code

    // return done json

}

event.modify = async (event, args, data = {}) => {

    // validation

    // if fine, modify event embed

    // update db

    // return done json

}

event.info = async (event) => {

    // return info about event json

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
 