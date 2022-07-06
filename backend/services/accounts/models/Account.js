const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AccountSchema = new Schema({
    id: {
        type: String, 
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true,
    },
    name: {
        type: String, 
        required: true,
    },
    dob: {
        type: Date
    },
    age: {
        type: Number, 
        min: [0, 'Too few age.']
    },
    ccid: {
        type: String, 
    },
    gender: {
        type: String,
    },
    address: {
        type: Object,
    },
    typeAccount: {
        type: String,
        enum: ['Customer', 'Store'],
        default: 'Customer',
    },
    invoices: {
        type: Array,
    },
    status: String
}, { timestamps: true })

module.exports = mongoose.model('accounts', AccountSchema)