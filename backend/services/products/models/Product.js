const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductSchema = new Schema({
    id: {
        type: String, 
        required: true,
        unique: true
    },
    name: String,
    linkImg: String,
    description: String,
    price: Number,
    sold: Number,
    rest: Number,
    discount: Number,
    NSX: Date,
    HSD: Date,
    rating: Number,
    reviews: Number,
    storeId: String,
    storeName: String,
    lsp: {
        type: String,
    },
    status: String
}, { timestamps: true })

module.exports = mongoose.model('products', ProductSchema)