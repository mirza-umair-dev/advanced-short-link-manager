import jwt from 'jsonwebtoken'
import User from '../models/User.js';

export const protect = async (req,res,next) => {
    let token = req.cookies.accessToken;
    console.log(token);
    if(!token){
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
    try {
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if(!req.user || !req.user.isVerified){
      return res.status(401).json({message:'Not authorized, no user found'})
    }
        next();
    } catch (error) {
        return res.status(401).json({message:'Not authorized, token failed',error})
    }
    
}


export const defend = async (req,res,next) => {
    let token = req.cookies.accessToken;
    if(!token){
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
    try {
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if(!req.user ){
      return res.status(401).json({message:'Not authorized, no user found'})
    }
        next();
    } catch (error) {
        return res.status(401).json({message:'Not authorized, token failed',error})
    }
    
}
