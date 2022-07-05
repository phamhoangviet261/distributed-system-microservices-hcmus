const mongoose = require('mongoose')

const Schema = mongoose.Schema

const InvoiceSchema = new Schema({
    id: {
        type: String, 
        required: true,
        unique: true
    },
    storeId: String,
    userId: String,    
    address: {
        districtId: Number,
        wardId: Number,
        detail: String
    }, 
    products: Array,
    total: Number,    
    history: Array,
    status: {
        type: String,
        enum: ['To Pay', 'To Ship', 'To Receive', 'Completed', 'Cancelled', 'Return Refund'],
        default: 'To Pay',
    },
}, { timestamps: true })

const Status = {
    ToPay: 'To Pay', ToShip:'To Ship', ToReceive: 'To receive', Completed: 'Completed', Cancelled: 'Cancelled', ReturnRefund: 'Return Refund'
}

module.exports = mongoose.model('invoices', InvoiceSchema)