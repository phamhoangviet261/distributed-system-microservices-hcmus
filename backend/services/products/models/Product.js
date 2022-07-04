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
    price: String,
    status: String
}, { timestamps: true })

module.exports = mongoose.model('products', ProductSchema)