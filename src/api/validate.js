export default async function confirmToken(req, res){
    const client = JwksClient({
        jwksUri: "https://www.crisesnotes.com/members/.well-known/jwks.json",
    });

    let encryptedJWT = req.body;

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

    const validateJwt = async (token) => {
        jwt.verify(token, getKey, { algorithm: ['RS256'] }, (err, decoded) => {
            if (err) {
                console.error("Token validation failed:", err);
                return;
            }
            console.log("Token is valid:", decoded);
        });
    }

    let response = validateJwt(decoded)
    console.log("Validate JWT result: ", response)
    res.send(response)
}
