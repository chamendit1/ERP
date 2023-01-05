import mongoose from 'mongoose'

const TransactionSchema = mongoose.Schema({
    items: [ { itemName: String, unitPrice: String, quantity: String, discount: String } ],
    amountPaid: Number, 
    datePaid: Date,
    paymentCategory: String,
    paymentMethod: String, 
    note: String, 
    paidBy: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const TransactionModel = mongoose.model('TransactionModel', TransactionSchema)
export default TransactionModel