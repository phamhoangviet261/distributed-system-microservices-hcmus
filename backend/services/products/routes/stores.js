const express = require('express')
const router = express.Router()

const Store = require('../models/Store')
const mongoose = require('mongoose')

router.get('/', async (req, res, next) => {
    try {
        const stores = await Store.find({})
        return res.status(200).json({data: stores});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.get('/:storeId', async (req, res, next) => {
    try {
        const store = await Store.findOne({id: req.params.storeId});
        return res.status(200).json({data: store});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.post('/add', async (req, res, next) => {
    try {
        const {name, description, owerId, address, products, invoices, status} = req.body;

        const stores = await Store.find({})

        const s = new Store({id: `STORE${stores.length}`, name, description, owerId, address, products, invoices, status : status ? status : 'active'});
        return res.status(200).json({data: []});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

module.exports = router