const express = require('express')
const router = express.Router()

const Product = require('../models/Product')
const mongoose = require('mongoose')

router.get('/', async (req, res, next) => {
    try {
        const products = await Product.find({})
        return res.status(200).json({data: products});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.get('/:productId', async (req, res, next) => {
    try {
        const district = await Product.findOne({id: req.params.productId});
        return res.status(200).json({data: district});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

module.exports = router