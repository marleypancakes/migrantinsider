import { requireAuth } from './auth-middleware';
import GhostAdminAPI from '@tryghost/admin-api';
import { hasPaidSubscriptions } from './validate';

const api = new GhostAdminAPI({
    url: process.env.GHOST_ADMIN_API_URL,
    key: process.env.GHOST_ADMIN_API_KEY,
    version: 'v5.0'
});


async function handler(req, res) {

  const { user } = req;
  
  // Optionally refresh subscription data from Ghost API
//   const currentIsPaid = hasPaidSubscriptions(user);

  
  console.log("[me.js] Current User: ", user)
//   console.log("[me.js] Fresh Subscription Data: ", freshSubscriptionData)
//   console.log("[me.js] Is Paid?: ", currentIsPaid)
  
  res.status(200).json({
    id: user.memberId,
    email: user.email,
    isPaidUser: user.isPaidMember,
    subscriptionStatus: user.subscriptionStatus,
  });
}

export default requireAuth(handler);