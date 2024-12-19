import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";
import {protect, adminOnly} from "../middlewares/authMiddleware.js";

const router = express.Router();

//Register
router.post('/signup', async (req, res) => {
const {name, email, password } = req.body;
try{
const hashedPassword = await bcrypt.hash(password, 10);
const user = new User({name, email, password: hashedPassword});
await user.save();
res.status(201).json({message: 'User registered successfully!'});
} catch (err){
    res.status(400).json({message: err.message});
}
});

//Login
router.post('/login', async (req, res) => {
const {email, password} = req.body;
try{
const user = await User.findOne({email});
if (!user) return res.status(404).json({message: 'User not found'});
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) return res.status(400).json({message: 'Invalid credentials'});
const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h',});
res.json({token, role: user.role});
} catch (err) {
    res.status(500).json({message: err.message});
}
});
//Route for admin only
router.get('/admin', protect, adminOnly, (req, res) => {
    res.json({message: `Welcome, ${req.user.role}`});
});

//Route for user and admin
router.get('/dashboard', protect, (req, res) =>{
    res.json({message: `Welcome, ${req.user.role}!`});
});

export default router;