const express = require('express')
const router = express.Router()

const Invoice = require('../models/Invoice')

const mongoose = require('mongoose')

router.get('/', async (req, res, next) => {
    try {
        const invoices = await Invoice.find({})
        return res.status(200).json({data: invoices});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.get('/:invId', async (req, res, next) => {
    try {
        const invoice = await Invoice.findOne({id: req.params.invId});
        return res.status(200).json({data: invoice});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.post('/add', async (req, res, next) => {
    try {
        
        return res.status(200).json({data: []});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

module.exports = router