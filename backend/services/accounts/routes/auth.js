const express = require('express')
const router = express.Router()
 // DO NOT USE IT
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const Account = require('../models/Account')
// @route POST /api/auth/register
// @desc register new user
// @access public
router.post('/register', async (req, res, next) => {       
    const {phone, password, name, age, address, status} = req.body;    
    // Validation
    if(!phone || !password) return res.status(400).json({success: false, message: 'Missing phone number or password'})
    try {
        // check existing user
        const user = await Account.findOne({phoneNumber: phone});
        if(user){
            return res.status(400).json({success: false, message: 'Phone number already taken'})
        }
        
        // fine
        
        // generate salt to hash password
        // const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        
        const hashedPassword = await bcrypt.hash(password, '$2b$10$o/hktJ4aYLFo3zuvTU80mO');
        // console.log("hashedPassword register", hashedPassword);
        

        const customerList = await Account.find({});

        const cus = new Account({id: `ACC${customerList.length}`, phoneNumber: phone, password: hashedPassword, name: name, age: age || 18, address: address, invoices: [], status: status ? status : "Nam"})
        await cus.save()
        //return token 
        const accessToken = jwt.sign({userId: cus._id}, process.env.ACCESS_TOKEN_SECRET)
        console.log("accessToken", accessToken);
        return res.json({success: true, message: 'Register successfully', accessToken, cus})
    } catch (error) {
        console.log("ERROR: ", error);
        return res.status(500).json({success: false, message: "Internal server error"})
    }
})

// @route POST /api/auth/login
// @desc login user
// @access public
router.post('/login', async (req, res, next) => {
    const {phone, password} = req.body;
    console.log({phone, password});
    // console.log("body", req.body);
    // Validation
    if(!phone || !password) return res.status(400).json({success: false, message: 'Missing phone or password'})

    try {
        // check existing user
        
        const user = await Account.findOne({phoneNumber: phone})
        if(!user){
            return res.status(400).json({success: false, message: 'Incorrect phone or password'})
        }

        // found user
        // const hashedPassword = await bcrypt.hash(password, '$2b$10$o/hktJ4aYLFo3zuvTU80mO');
        // console.log("user.password          ", user.password)
        // console.log("hashedPassword login   ", hashedPassword);
        const passwordValid = await bcrypt.compareSync(password, user.password);
        // console.log("passwordValid", passwordValid)
        if(!passwordValid){
            return res.status(400).json({success: false, message: 'Incorrect phone or password'})
        }

        //return token 
        const accessToken = "Bearer " + jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET)
        console.log("accessToken", accessToken);
        return res
        .cookie("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 10000,
          })
        .status(200)
        .json({success: true, message: 'Logged in successfully', phoneNumber :user.phoneNumber, accessToken, user})
    } catch (error) {
        console.log("ERROR: ", error);
        return res.status(500).json({success: false, message: "Internal server error"})
    }
})

module.exports = router