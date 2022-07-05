const mongoose = require('mongoose')

const Schema = mongoose.Schema

const StoreSchema = new Schema({
    id: {
        type: String, 
        required: true,
        unique: true
    },
    name: String,
    description: String,
    ownerId: String,
    address: {
        districtId: Number,
        wardId: Number,
        detail: String
    }, 
    products: Array,
    invoices: Array,
    status: String
}, { timestamps: true })

module.exports = mongoose.model('stores', StoreSchema)