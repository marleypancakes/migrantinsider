export default async function signInHandler(req, res) {

    // Using the local server will fail, because it won't do email
    // On production, will give 201 only for subscribers
    
    console.log("signin request: ", req.body)

    let integrityToken = await fetch(process.env.GHOST_ADMIN_API_URL+'/members/api/integrity-token',
        {   headers: {
                'app-pragma': 'no-cache',
                'x-ghost-version': '5.98'
                },
            method: 'GET'}
        )
    integrityToken = await integrityToken.text()
    console.log("[Sign In] Integrity Token: ", integrityToken)
    const url = process.env.GHOST_ADMIN_API_URL+'/members/api/send-magic-link'
    console.log("[Sign In] URL: ", url)
    const email = req.body.email;
    console.log("[Sign In] Email: ", email)

    // Send request to server
    let response;
    response = await fetch (url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {email: email,
                emailType: 'signin',
                integrityToken: integrityToken
                }
            )
        }).then((response) => {
            console.log(response.status)
            res.sendStatus(response.status)})
        // .then((data) => {
        //     console.log(data);
        //     res.send(data); })
        .catch((err) => console.error(err.message))
}