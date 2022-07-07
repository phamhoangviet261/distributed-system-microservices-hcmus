const express = require('express')
const router = express.Router()
const axios = require('axios');
const Store = require('../models/Store')
const Product = require('../models/Product')

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
        const fakeStore = JSON.parse(JSON.stringify(store));
        const listProducts = []
        for(let i = 0; i < fakeStore.products.length; i++) {
            item = fakeStore.products[i];
            let p = await Product.findOne({id: item})
            listProducts.push(p)
        }
        fakeStore.productsDetail = listProducts


        const optionFindWard = {
            method: 'get',
            url: `http://localhost:5001/districts/${fakeStore.address.districtId}/${fakeStore.address.wardId}`,
            data: {},
        };

        const axiosRespondFindWard = await axios(optionFindWard);

        fakeStore.addressDetail = {
            district: axiosRespondFindWard.data.data?.district?.name,
            ward: axiosRespondFindWard.data.data?.ward?.name,
            detail: fakeStore.address.detail
        };
        return res.status(200).json({data: fakeStore});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.get('/getByOwnerId/:ownerId', async (req, res, next) => {
    try {
        const store = await Store.findOne({ownerId: req.params.ownerId});
        const fakeStore = JSON.parse(JSON.stringify(store));
        const listProducts = []
        for(let i = 0; i < fakeStore.products.length; i++) {
            item = fakeStore.products[i];
            let p = await Product.findOne({id: item})
            listProducts.push(p)
        }
        fakeStore.productsDetail = listProducts


        const optionFindWard = {
            method: 'get',
            url: `http://localhost:5001/districts/${fakeStore.address.districtId}/${fakeStore.address.wardId}`,
            data: {},
        };

        const axiosRespondFindWard = await axios(optionFindWard);

        fakeStore.addressDetail = {
            district: axiosRespondFindWard.data.data?.district?.name,
            ward: axiosRespondFindWard.data.data?.ward?.name,
            detail: fakeStore.address.detail
        };
        return res.status(200).json({data: fakeStore});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.post('/add', async (req, res, next) => {
    try {
        const {name, description, ownerId, address, products, invoices, status} = req.body;
        const stores = await Store.find({})
        const s = new Store({id: `STORE${stores.length}`, name, description, ownerId, address, products, invoices, status : status ? status : 'active'});
        const store = await s.save();
        return res.status(200).json({data: store});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.post('/addInvoice', async (req, res, next) => {
    try {
        const {storeId, invoice} = req.body;
        const store = await Store.find({storeId: storeId})
        const newInvoices = store.invoices || []
        newInvoices.push(invoice)
        const s = await Store.findOneAndUpdate({storeId: storeId}, {invoices: newInvoices});
        return res.status(200).json({data: s});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.post('/addProduct', async (req, res, next) => {
    try {
        const {products, storeId} = req.body;
        if(!storeId) {
            return res.status(200).json({data: [], message: 'Missing StoreID.', success: false, error: true});
        } else {
            let s = await Store.findOne({id: storeId});
            if(!s){
                return res.status(200).json({data: [], message: 'Missing StoreID.', success: false, error: true});
            }
        }
        if(!products) {
            return res.status(200).json({data: [], message: 'Missing list products.', success: true, error: false});
        }        
        const store = await Store.findOne({id: storeId});
        const newProducts = [...new Set([...store.products, ...products])];
        await Store.findOneAndUpdate({id: storeId}, {products: newProducts});
        const newStore = await Store.findOne({id: storeId})
        return res.status(200).json({data: newStore, message: 'Product added successfully.', success: true});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
})

router.post('/update', async (req, res, next) => {
    try {
        const {storeId, name, description, ownerId, address, products, invoices, status} = req.body;
        const store = await Store.findOne({id: storeId});
        if(!store) return res.status(404).json({success: false, message: 'Store not found'});
        await Store.findOneAndUpdate({id: storeId}, {
            name: name ? name : store.name, 
            description: description ? description : store.description, 
            ownerId: ownerId ? ownerId : store.ownerId, 
            address: address? address : store.address, 
            products: products ? products : store.products, 
            invoices: invoices ? invoices : store.invoices, 
            status: status ? status : store.status});
        const newStore = await Store.findOne({id: storeId});
        return res.status(200).json({data: newStore});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

module.exports = router