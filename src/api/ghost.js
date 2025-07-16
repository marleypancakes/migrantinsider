import GhostAdminAPI from '@tryghost/admin-api'
import fetch from "node-fetch"
import jwt from "jsonwebtoken"
import { JwksClient } from 'jwks-rsa';


const admin = new GhostAdminAPI({
    url: process.env.GHOST_ADMIN_API_URL,
    key: process.env.GHOST_ADMIN_API_KEY,
    version: "v5.0",
});

async function confirmToken(encryptedJWT){
    const client = JwksClient({
        jwksUri: "https://www.crisesnotes.com/members/.well-known/jwks.json",
    });

    const getKey = (header, callback) => {
        client.getSigningKey(header.kid, (err, key) => {
            if (err) return callback(err);
            const signingKey = key.publicKey || key.rsaPublicKey;
            callback(null, signingKey);
        });
    }

    const decoded = jwt.decode(encryptedJWT, 
        { complete: true }
    );

    console.log("Header:", decoded.header);

    const validateJwt = (token) => {
        jwt.verify(token, getKey, { algorithm: ['RS256'] }, (err, decoded) => {
            if (err) {
                console.error("Token validation failed:", err);
                return;
            }
            console.log("Token is valid:", decoded);
        });
    }
}

export default async function subscribeHandler(req, res) {
    console.log(req.body)
    const members = await admin.members.browse({limit: "10"})
    console.log(members)
    const newMember = await admin.members.add(
        {email: req.body.email, name: req.body.name, newsletters: [{id: '6840cc3014b8dd0001d83e98'}]});
    console.log(newMember)
    res.send(newMember)
}

