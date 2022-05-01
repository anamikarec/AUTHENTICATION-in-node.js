const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user.model');
const newToken = (user) => {
    return jwt.sign({id:user.id},process.env.JWT_SECRET_KEY);
}
const signup = async (req, res) => {
    try{
        const duplicateUser = await User.findOne({email: req.body.email});
        if(duplicateUser){
            return res.status(400).send("User already exist! Please signin to proceed")
        }
        const user = await User.create(req.body);
        const token = await newToken(user);
        return res.status(201).json({data:{token}});
    }
    catch(err){
        return res.status(400).send("Something went wrong!");
    }
}
const signin = async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(401).json({status:"failed",message:"Your email or password is incorrect"});
        }
        const match = await user.checkPassword(req.body.password);
        if(!match){return res.status(401).json({status: "failed", message : "Your password or email is incorrect"});}
        const token = newToken(user);
        return res.status(201).json({data: {token}})
      
    }
      catch(err){
            return res.status(400).send("Something went wrong!");
        }
}

const getAllUsers = async(req,res)=> {
    try{
        const users = await User.find({}).lean().exec();
        return res.status(201).json({data:users});
    }
    catch(err){
        return res.status(400).send("Something went wrong!");
    }
}
module.exports = {
    signin: signin,
    signup: signup,
    getAllUsers: getAllUsers
}