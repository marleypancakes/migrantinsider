const jwt = require('jsonwebtoken');

export default async function createTierWithRawAPI() {
    // Generate JWT token
    const [id, secret] = process.env.GHOST_ADMIN_API_KEY.split(':');
    const token = jwt.sign(
        {
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (5 * 60),
            aud: '/admin/'
        },
        Buffer.from(secret, 'hex'),
        {
            algorithm: 'HS256',
            header: { kid: id, typ: 'JWT' }
        }
    );

    // Create tier via direct API call
    const response = await fetch('http://127.0.0.1:2368/ghost/api/admin/tiers/', {
        method: 'POST',
        headers: {
            'Authorization': `Ghost ${token}`,
            'Accept-Version': 'v5.0',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tiers: [{
                name: 'Premium Membership',
                monthly_price: 999,
                yearly_price: 9999,
                currency: 'usd',
                benefits: ['Premium content', 'Newsletter']
            }]
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.tiers[0];
}