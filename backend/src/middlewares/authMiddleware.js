import jwt from "jsonwebtoken";
import User from "../models/Users.js";

const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({message: 'Unauthorize'});
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (err) {
        res.status(401).json({message: 'Invalid Token'});
    }
};

const adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({message: 'Access only for Admins'});
    }
    next();
};

export {protect, adminOnly};