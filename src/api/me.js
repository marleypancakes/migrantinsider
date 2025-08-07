import { requireAuth } from '../utils/auth-middleware';
import GhostAdminAPI from '@tryghost/admin-api';
import { hasPaidSubscriptions } from './validate';

const api = new GhostAdminAPI({
    url: process.env.GHOST_URL,
    key: process.env.GHOST_ADMIN_API_KEY,
    version: 'v5.0'
});

async function fetchUserSubscriptions(userId) {
    try {
        // Fetch member with subscription data
        const member = await api.members.read(
            { id: userId }, 
            { include: ['subscriptions', 'tiers'] }
        );
        
        return member.subscriptions || [];
    } catch (error) {
        console.error('Error fetching user subscriptions:', error);
        return [];
    }
}

async function handler(req, res) {
  const { user } = req;
  
  // Optionally refresh subscription data from Ghost API
  const freshSubscriptionData = await fetchUserSubscriptions(user.userId);
  const currentIsPaid = hasPaidSubscriptions(freshSubscriptionData);
  
  res.status(200).json({
    id: user.userId,
    email: user.email,
    isPaidUser: currentIsPaid,
    subscriptionStatus: currentIsPaid ? 'paid' : 'free',
  });
}

export default requireAuth(handler);