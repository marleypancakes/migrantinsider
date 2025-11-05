import { JwksClient } from "jwks-rsa";
import * as jwt from "jsonwebtoken"
import GhostAdminAPI from '@tryghost/admin-api'

const client = new JwksClient({
    jwksUri: `${process.env.GHOST_ADMIN_API_URL}/members/.well-known/jwks.json`,
});

const admin = new GhostAdminAPI({
    url: process.env.GHOST_ADMIN_API_URL,
    key: process.env.GHOST_ADMIN_API_KEY,
    version: "v5.0",
});

const validateJwt = (token, signingKey) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, signingKey, { algorithm: 'RS256' }, (err, decoded) => {
            if (err) {
                console.error("Token validation failed:", err);
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};   
// Check if member is a MI paid subscriber based on label attached to Ghost membership.
export function hasPaidSubscriptions(member) {
// Check if member has the label "Migrant Insider Subscriber"
return member.labels && member.labels.some(label => 
    label.name.toLowerCase() === "migrant insider subscriber"
);
}

export default async function confirmToken(req, res){
    try {
        // Get encoded JWT from request body
        let signinToken = req.body != null ? req.body.token : ""
        
        // Decode JWT
        const decoded =jwt.decode(signinToken, { complete: true });
        
        //Get Signing Key from [GHOST ADMIN URL]/members/.well-known/jwks.json
        const key = await client.getSigningKey(decoded.header.kid)
        const signingKey = key.getPublicKey();

        
        const validationResult = await validateJwt(signinToken, signingKey)
        console.log("Validate JWT result: ", validationResult)

        // Get member email from validated JWT
        const email = validationResult.sub

        // Retrieve member object from Ghost Admin API via email
        const members = await admin.members.browse({
            filter: `email:'${email}'`,
            include: "paid"
        });

        // The member will be in members[0] if found
        const member = members.length > 0 ? members[0] : null;

        if (!member) {
            res.status(401).json({message: 'Member not found'})
        }

        const isPaidMember = hasPaidSubscriptions(member)
        if (isPaidMember) {
            // console.log('Member has active paid subscriptions');
        } else {
            // console.log('Member has no paid subscriptions');
        }

        const token = jwt.sign(
            {
            memberId: member.id,
            name: member.name != null ? member.name : "",
            email: member.email,
            isPaidMember: isPaidMember,
            subscriptionStatus: isPaidMember ? 'paid' : 'free'
            },
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );

        res.setHeader('Set-Cookie', [
            `auth_token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${7 * 24 * 60 * 60}`,
            ]);
        
        // Send proper JSON response
        res.status(200).json({ 
            success: true, 
            user:{
                id: member.id,
                email: member.email,
                name: member.name,
                isPaidUser: isPaidMember,
                subscriptionStatus: isPaidMember ? 'paid' : 'free'
            } 
        });
    } catch (error) {
        console.error("Validation error:", error);
        res.status(401).json({ 
            success: false, 
            error: "Token validation failed" 
        });
    }
}
