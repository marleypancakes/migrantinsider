import { JwksClient } from "jwks-rsa";
import { decode, verify } from "jsonwebtoken"
import GhostAdminAPI from '@tryghost/admin-api'
import createTierWithRawAPI from "./createTier";

const client = new JwksClient({
    jwksUri: "http://127.0.0.1:2368/members/.well-known/jwks.json",
});

const admin = new GhostAdminAPI({
    url: process.env.GHOST_ADMIN_API_URL,
    key: process.env.GHOST_ADMIN_API_KEY,
    version: "v5.0",
});

export default async function confirmToken(req, res){
    try {

        // console.log("Request: ", req.body);
        let encryptedJWT = req.body != null ? req.body.token : ""
        
        const decoded = decode(encryptedJWT, { complete: true });
        
        // console.log("Decoded", decoded)
        // console.log("Decoded Header:", decoded?.header);
    
        const key = await client.getSigningKey(decoded.header.kid)
        // console.log("Key: ", key)
        const signingKey = key.getPublicKey();

    //     const getKey = (header, callback) => {
    //         console.log("Requested kid:", header.kid)
    //         client.getSigningKey(header.kid, (err, key) => {
    //         if (err) callback("poopoopoo");
    //         const signingKey = key.publicKey || key.rsaPublicKey;
    //         console.log("SigningKey: ", signingKey)
    //         callback(null, signingKey);
    //     });
    // }

    const validateJwt = (token) => {
        return new Promise((resolve, reject) => {
            verify(token, signingKey, { algorithm: 'RS256' }, (err, decoded) => {
                if (err) {
                    console.error("Token validation failed:", err);
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });
    };    
        const validationResult = await validateJwt(encryptedJWT)
        console.log("Validate JWT result: ", validationResult)

        const email = validationResult.sub
        // console.log("Email: ", email)

        // Using the Ghost Admin API SDK
        const members = await admin.members.browse({
            filter: `email:'${email}'`,
            include: "paid"
        });

        // The member will be in members[0] if found
        const member = members.length > 0 ? members[0] : null;
        // console.log("Member: ", member)

        function hasPaidSubscriptions(member) {
            // Check if member has subscriptions array
            if (!member.subscriptions || !Array.isArray(member.subscriptions)) {
                return false;
            }
            // Check for active paid subscriptions
            return member.subscriptions.some(subscription => {
                // Must be active status
                const isActive = subscription.status === 'active';
                return isActive;
            });
        }

        if (hasPaidSubscriptions(member)) {
            console.log('Member has active paid subscriptions');
        } else {
            console.log('Member has no paid subscriptions');
        }

        // Send proper JSON response
        res.json({ 
            success: true, 
            data: validationResult 
        });
    } catch (error) {
        console.error("Validation error:", error);
        res.status(401).json({ 
            success: false, 
            error: "Token validation failed" 
        });
    }
}
