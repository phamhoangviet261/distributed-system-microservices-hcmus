const express = require('express')
const router = express.Router()

const District = require('../models/District')
const mongoose = require('mongoose')

router.get('/', async (req, res, next) => {
    try {
        const district = await District.find();
        return res.status(200).json({data: district});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.get('/:districtId', async (req, res, next) => {
    try {
        const district = await District.findOne({code: req.params.districtId});
        return res.status(200).json({data: district});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

module.exports = router