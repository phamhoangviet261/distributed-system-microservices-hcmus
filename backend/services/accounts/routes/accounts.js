const express = require('express')
const router = express.Router()
 // DO NOT USE IT
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const axios = require('axios');
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

router.get('/:phoneNumber', async (req, res, next) => {
    try {
        const account = await Account.findOne({phoneNumber: req.params.phoneNumber});
        let fakeAccount = JSON.parse(JSON.stringify(account));
        let invDetail = []
        for(let i = 0; i < fakeAccount.invoices.length; i++) {
            let inv = await axios({
                method: 'get',
                url: `http://localhost:5002/invoices/${fakeAccount.invoices[i]}`,
                data: {},
            })
            invDetail.push(inv.data.data)
            
        }

        const optionFindWard = {
            method: 'get',
            url: `http://localhost:5001/districts/${fakeAccount.address.districtId}/${fakeAccount.address.wardId}`,
            data: {},
        };

        const axiosRespondFindWard = await axios(optionFindWard);

        fakeAccount.addressDetail = {
            district: axiosRespondFindWard.data.data?.district?.name,
            ward: axiosRespondFindWard.data.data?.ward?.name,
            detail: fakeAccount.address.detail
        };
        fakeAccount.invoicesDetail = invDetail;
        return res.status(200).json({data: fakeAccount});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.post('/addInvoice', async (req, res, next) => {
    try {
        const {phoneNumber, invoice} = req.body;
        const account = await Account.findOne({phoneNumber: phoneNumber});

        const newInvoices = [...account.invoices]
        newInvoices.push(invoice);

        const acc = await Account.findOneAndUpdate({phoneNumber: phoneNumber}, {invoices: newInvoices});
        return res.status(200).json({data: acc});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.post('/update', async (req, res, next) => {
    try {
        const {id, phoneNumber, name, dob, age, ccid, gender, address, typeAccount, invoices, storeId, status} = req.body;
        const account = await Account.findOne({id: id});
        if(!account) return res.status(404).json({success: false, message: 'Account not found'});
        await Account.findOneAndUpdate({id: id}, {
            phoneNumber: phoneNumber ? phoneNumber : account.phoneNumber,
            name: name ? name : account.name,
            dob: dob ? dob : account.dob,
            age: age ? age : account.age,
            ccid: ccid ? ccid : account.ccid,   
            gender: gender ? gender : account.gender,
            address: address ? address : account.address,
            typeAccount: typeAccount ? typeAccount : account.typeAccount,
            invoices: invoices ? invoices : account.invoices,
            storeId: storeId ? storeId : account.storeId,
            status: status ? status : account.status,
        })
        const newAccount = await Account.findOne({id: id});
        return res.status(200).json({data: newAccount});
    } catch (errors) {
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

module.exports = router