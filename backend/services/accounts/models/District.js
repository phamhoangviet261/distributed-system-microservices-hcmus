const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DistrictSchema = new Schema({
    name: String,
    code: Number,
    codename: String,
    division_type: String,
    short_codename: String,
    wards: Array
}, { timestamps: true })

module.exports = mongoose.model('districts', DistrictSchema)