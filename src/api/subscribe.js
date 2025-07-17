import GhostAdminAPI from '@tryghost/admin-api'
import fetch from "node-fetch"
import jwt from "jsonwebtoken"
import { JwksClient } from 'jwks-rsa';


const admin = new GhostAdminAPI({
    url: process.env.GHOST_ADMIN_API_URL,
    key: process.env.GHOST_ADMIN_API_KEY,
    version: "v5.0",
});

export default async function subscribeHandler(req, res) {
    console.log(req.body)

    // const members = await admin.members.browse({limit: "10"})
    // console.log(members)

    let data = {email: req.body.email, name: req.body.name, newsletters: [{id: '6840cc3014b8dd0001d83e98'}]}
    let options = {
        send_email: true,
        email_type: 'subscribe'
    }
    const newMember = await admin.members.add(data, options);
    console.log(newMember)
    res.send(newMember)
}

