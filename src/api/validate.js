import { JwksClient } from "jwks-rsa";
import *  as jwt from "jsonwebtoken"

const client = new JwksClient({
    jwksUri: "https://www.crisesnotes.com/members/.well-known/jwks.json",
});

export default async function confirmToken(req, res){
    console.log("Request: ", req);
    let encryptedJWT = req.body;
    
    const decoded = jwt.decode(encryptedJWT, 
        { complete: true }
    );

    console.log("Decoded Header:", decoded.header);
    
    const getKey = (header, callback) => {
        client.getSigningKey(header.kid, (err, key) => {
            if (err) return callback(err);
            const signingKey = key.publicKey || key.rsaPublicKey;
            console.log("SigningKey: ", signingKey)
            callback(null, signingKey);
        });
    }

    const validateJwt = async (token) => {
        jwt.verify(token, getKey, { algorithm: ['RS256'] }, (err, key) => {
            if (err) {
                console.error("Token validation failed:", err);
                return;
            }
            console.log("Token is valid:", key);
        });
    }

    let response = validateJwt(decoded)
    console.log("Validate JWT result: ", response)
    res.send(response)
}
