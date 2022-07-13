const express = require('express')
const router = express.Router()
const axios = require('axios');
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
        const invoices = await Invoice.find({});

        const {storeId, user, phoneNumber, address, products, total} = req.body;
        const history = [
            {
                status: "To Pay",
                timestamp: new Date()
            },
            {
                status: "To Ship",
                timestamp: null
            },
            {
                status: "To Receive",
                timestamp: null,
            },            
            {
                status: "Completed",
                timestamp: null,
            },
            {
                status: "Cancelled",
                timestamp: null,
            },
            {
                status: "Return Refund",
                timestamp: null,
            }
        ]
        const i = new Invoice({id: `INV${invoices.length}`, user, storeId, phoneNumber, address, products, total, history});
        const invoice = await i.save();

        const optionsAddInvoiceToAccount = {
            method: 'post',
            url: 'http://localhost:5001/accounts/addInvoice',
            data: {
                "phoneNumber": phoneNumber,
                invoice: `INV${invoices.length}`
            },
        };

        const axiosRespondAddInvoiceToAccount = await axios(optionsAddInvoiceToAccount);


        const optionsAddInvoiceToStore = {
            method: 'post',
            url: 'http://localhost:5003/stores/addInvoice',
            data: {
                "storeId": storeId,
                invoice: `INV${invoices.length}`
            },
        };

        const axiosRespondAddInvoiceToStore = await axios(optionsAddInvoiceToStore);

        return res.status(200).json({messsage:"Add invoice id to account and store successfully", data: i, inv: axiosRespondAddInvoiceToAccount.data});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
})

router.post('/updateStatus', async (req, res, next) => {
    try {
        const {invoiceId} = req.body;

        const invoice = await Invoice.findOne({id: invoiceId});
        
        const history = [...invoice.history]

        const nearestStatus = history.find(item => item.timestamp == null);

        if(nearestStatus == null)  
            return res.status(200).json({data: invoice});

        const newHistory = history.map(item => {
            if(item.status == nearestStatus.status){
                item.timestamp = new Date()
            }
            return item;
        });

        const i = await Invoice.findOneAndUpdate({id: invoiceId}, {history: history});

        return res.status(200).json({data: i});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

module.exports = router