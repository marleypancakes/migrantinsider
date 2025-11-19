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
        const integrityResponse = await fetch(
            process.env.GHOST_ADMIN_API_URL + '/members/api/session',
            {
                headers: {
                    'app-pragma': 'no-cache',
                    'x-ghost-version': '5.98'
                },
                method: 'GET'
            }
        );
        
        console.log("[Sign In] Integrity token response status:", integrityResponse.status);
        
        if (integrityResponse.status !== 200) {
            // Try alternative endpoint
            const altResponse = await fetch(
                process.env.GHOST_ADMIN_API_URL + '/members/api/integrity-token',
                {
                    headers: {
                        'app-pragma': 'no-cache',
                        'x-ghost-version': '5.98'
                    },
                    method: 'GET'
                }
            );
            
            console.log("[Sign In] Alternative integrity token status:", altResponse.status);
            
            if (altResponse.status !== 200) {
                const errorText = await altResponse.text();
                console.error("[Sign In] Failed to get integrity token:", errorText);
                return {
                    statusCode: 500,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ error: 'Failed to initialize authentication' })
                };
            }
            
            var integrityToken = await altResponse.text();
        } else {
            var integrityToken = await integrityResponse.text();
        }
        
        console.log("[Sign In] Got integrity token:", integrityToken.substring(0, 20) + '...');
        
        // Step 2: Send magic link
        const magicLinkUrl = process.env.GHOST_ADMIN_API_URL + '/members/api/send-magic-link';
        console.log("[Sign In] Sending magic link to:", magicLinkUrl);
        
        const magicLinkResponse = await fetch(magicLinkUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': process.env.GHOST_ADMIN_API_URL
            },
            body: JSON.stringify({
                email: email,
                emailType: 'signin',
                integrityToken: integrityToken
            })
        });
        
        console.log("[Sign In] Magic link response status:", magicLinkResponse.status);
        
        // Log response body for debugging
        const responseText = await magicLinkResponse.text();
        console.log("[Sign In] Response body:", responseText);
        
        // Check for different success/error status codes
        if (magicLinkResponse.status === 201) {
            return {
                statusCode: 201,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ success: true })
            };
        } else if (magicLinkResponse.status === 400) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Member not found' })
            };
        } else if (magicLinkResponse.status === 404) {
            // Try alternative endpoints
            const endpoints = [
                '/members/api/magic-link',
                '/ghost/api/members/send-magic-link'
            ];
            
            for (const endpoint of endpoints) {
                const altUrl = process.env.GHOST_ADMIN_API_URL + endpoint;
                console.log("[Sign In] Trying alternative endpoint:", altUrl);
                
                const altResponse = await fetch(altUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Origin': process.env.GHOST_ADMIN_API_URL
                    },
                    body: JSON.stringify({
                        email: email,
                        emailType: 'signin',
                        integrityToken: integrityToken
                    })
                });
                
                console.log(`[Sign In] ${endpoint} status:`, altResponse.status);
                
                if (altResponse.status === 201) {
                    return {
                        statusCode: 201,
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ success: true })
                    };
                }
            }
            
            return {
                statusCode: 404,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Authentication endpoint not found', details: responseText })
            };
        }
        
        return {
            statusCode: magicLinkResponse.status,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Unexpected response', details: responseText })
        };
        
    } catch (err) {
        console.error("[Sign In] Error:", err.message, err.stack);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: err.message })
        };
    }
}