export default async function handler (event) {
    console.log("[Sign In] Function started");
    
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        console.log("[Sign In] Parsing body");
        const { email } = JSON.parse(event.body);
        console.log("[Sign In] Email:", email);
        
        console.log("[Sign In] Ghost URL:", process.env.GHOST_ADMIN_API_URL);
        
        // Test 1: Just try to reach Ghost
        console.log("[Sign In] Testing Ghost connection...");
        const testResponse = await fetch(process.env.GHOST_ADMIN_API_URL);
        console.log("[Sign In] Ghost connection test status:", testResponse.status);
        
        // Return early for now
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                message: 'Test successful',
                ghostUrl: process.env.GHOST_ADMIN_API_URL,
                testStatus: testResponse.status
            })
        };
        
    } catch (err) {
        console.error("[Sign In] Error:", err);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                error: err.message,
                stack: err.stack
            })
        };
    }
};