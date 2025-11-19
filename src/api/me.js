import { requireAuth } from './auth-middleware';
import GhostAdminAPI from '@tryghost/admin-api';

const api = new GhostAdminAPI({
    url: process.env.GHOST_ADMIN_API_URL,
    key: process.env.GHOST_ADMIN_API_KEY,
    version: 'v5.0'
});

async function handler(req, res) {

  const { user } = req;
  console.log("[Me.js] User: " + user)
    
  res.status(200).json({
    id: user.memberId,
    name: user.name,
    email: user.email,
    isPaidUser: user.isPaidMember,
    subscriptionStatus: user.subscriptionStatus,
  });
}

export default requireAuth(handler);