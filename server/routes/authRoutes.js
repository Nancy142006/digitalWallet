const express= require("express");
const bcrypt= require("bcryptjs");
const jwt= require("jsonwebtoken");
const User= require("../models/User");

const router= express.Router();

// Signup Route
router.post("/signup", async(req,res)=>{
    try{
        const{name, email, password}= req.body;

        // check if the user exists
        const existingUser= await User.findOne({email});
        if(existingUser) return res.status(400).json({message: "User already exists"});

        // hash password
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password, salt);

        // create new user
        const newUser = new User({name, email, password: hashedPassword});
        await newUser.save();

        res.status(201).json({message: "Signup successful. Please login."});
    }catch(error){
        res.status(500).json({message: "Server error"});
    }
});


// Login Route
router.post("/login", async(req,res)=>{
    try{
        const{email, password}= req.body;

        // check if user exists
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "User not found"});

        // compare password
        const isMatch= await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: "invalid password"});

        // generate jwt token
        const token= jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn:"1h"});
        res.json({message: "Login Successfull!", token});
    }catch(error){
        res.status(500).json({message: "Server error"});
    }
});

module.exports= router;