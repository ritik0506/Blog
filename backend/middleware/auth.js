import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    // Get token from cookie or Authorization header
    let token = req.cookies.token;
    
    if (!token && req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized, please login' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user id to request
    req.user = { id: decoded.id };
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ 
      success: false, 
      message: 'Invalid or expired token' 
    });
  }
};

export default auth;
