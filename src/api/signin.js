export default async function handler(event) {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { email } = JSON.parse(event.body);
        console.log("[Sign In] Processing request for email:", email);
        console.log("[Sign In] Ghost URL:", process.env.GHOST_ADMIN_API_URL);
        
        // Step 1: Get integrity token
        console.log("[Sign In] Fetching integrity token...");
        let integrityToken = null;
        
        // Try first endpoint
        let integrityResponse = await fetch(
            process.env.GHOST_ADMIN_API_URL + '/members/api/session',
            {
                headers: {
                    'app-pragma': 'no-cache',
                    'x-ghost-version': '5.98'
                },
                method: 'GET'
            }
        );
        
        console.log("[Sign In] Session endpoint status:", integrityResponse.status);
        
        if (integrityResponse.status === 200) {
            integrityToken = await integrityResponse.text();
        } else {
            // Try alternative endpoint
            integrityResponse = await fetch(
                process.env.GHOST_ADMIN_API_URL + '/members/api/integrity-token',
                {
                    headers: {
                        'app-pragma': 'no-cache',
                        'x-ghost-version': '5.98'
                    },
                    method: 'GET'
                }
            );
            
            console.log("[Sign In] Integrity token endpoint status:", integrityResponse.status);
            
            if (integrityResponse.status === 200) {
                integrityToken = await integrityResponse.text();
            }
        }
        
        if (!integrityToken) {
            const errorText = await integrityResponse.text();
            console.error("[Sign In] Failed to get integrity token:", errorText);
            return {
                statusCode: 500,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Failed to initialize authentication', details: errorText })
            };
        }
        
        console.log("[Sign In] Got integrity token:", integrityToken.substring(0, 20) + '...');
        
        // Step 2: Send magic link
        const magicLinkUrl = process.env.GHOST_ADMIN_API_URL + '/members/api/send-magic-link';
        console.log("[Sign In] Sending magic link to:", magicLinkUrl);
        
        const magicLinkResponse = await fetch(magicLinkUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                emailType: 'signin',
                integrityToken: integrityToken
            })
        });
        
        console.log("[Sign In] Magic link response status:", magicLinkResponse.status);
        
        // Get response text for debugging
        const responseText = await magicLinkResponse.text();
        console.log("[Sign In] Response body:", responseText);
        
        // Handle different status codes
        if (magicLinkResponse.status === 201) {
            return {
                statusCode: 201,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ success: true })
            };
        } 
        
        if (magicLinkResponse.status === 400) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Member not found' })
            };
        }
        
        // If we got a 404 or other error, return it
        return {
            statusCode: magicLinkResponse.status,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                error: 'Unexpected response', 
                status: magicLinkResponse.status,
                details: responseText 
            })
        };
        
    } catch (err) {
        console.error("[Sign In] Error:", err);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: err.message, stack: err.stack })
        };
    }
}