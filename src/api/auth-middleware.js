// src/utils/auth-middleware.js
import jwt from 'jsonwebtoken';


export function extractUserFromCookie(req) {
  try {
    const token = req.headers.cookie
      ?.split(';')
      .find(c => c.trim().startsWith('auth_token='))
      ?.split('=')[1];

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return {
      memberId: decoded.memberId,
      email: decoded.email,
      isPaidMember: decoded.isPaidMember,
      subscriptionStatus: decoded.subscriptionStatus,
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export function requireAuth(handler) {
  return async (req, res) => {
    const user = extractUserFromCookie(req);
    
    if (!user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    // Add user info to request object
    req.user = user;
    return handler(req, res);
  };
}

export function requirePaidSubscription(handler) {
  return async (req, res) => {
    const user = extractUserFromCookie(req);
    
    if (!user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    if (!user.isPaidMember) {
      return res.status(403).json({ 
        message: 'Paid subscription required',
        subscriptionStatus: user.subscriptionStatus 
      });
    }
    
    req.user = user;
    return handler(req, res);
  };
}