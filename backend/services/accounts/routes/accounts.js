const express = require('express')
const router = express.Router()
 // DO NOT USE IT
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const Account = require('../models/Account')


router.get('/', async (req, res, next) => {
    try {
        const accounts = await Account.find();
        return res.status(200).json({data: accounts});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

module.exports = router