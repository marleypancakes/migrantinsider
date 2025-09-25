import GhostAdminAPI from '@tryghost/admin-api'


const admin = new GhostAdminAPI({
    url: process.env.GHOST_ADMIN_API_URL,
    key: process.env.GHOST_ADMIN_API_KEY,
    version: "v5.0",
});

export default async function subscribeHandler(req, res) {
    console.log("[Subscribe] Request Body: ", req.body)


    const newsletters = await admin.newsletters.browse();
    console.log(newsletters); // This will log the JSON object containing newsletter details

    let data = {
        email: req.body.email, 
        name: req.body.name, 
        labels:[{name: "Migrant Insider Free Subscriber"}],
        newsletters: [{name: 'Migrant Insider'}]}
    let options = {
        send_email: true,
        email_type: 'subscribe'
    }
    // if user selects free tier, create free member in ghost and send confirmation email
    await admin.members.add(data, options)
    .then(response => {
        console.log("Member added successfully: ", response)


        res.send(response)
    })
    .catch((err)=> {
        console.error("Error adding member: ", err.message)
        res.send(err)
    })
}

