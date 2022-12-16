import mongoose from 'mongoose'

const PurchaseSchema = mongoose.Schema({
    dueDate: Date,
    currency: String,
    items: [ { itemName: String, unitPrice: String, quantity: String, discount: String } ],
    rates: String,
    vat: Number,
    total: Number,
    subTotal: Number,
    notes: String,
    status: String,
    orderStatus: Number,
    purchaseNumber: String,
    type: String,
    creator: [String],
    owner: [String],
    totalAmountReceived: Number,
    client: { _id: String, name: String, email: String, phone: String, address: String },
    paymentRecords: [ {amountPaid: Number, datePaid: Date, paymentMethod: String, note: String, paidBy: String } ],
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const PurchaseModel = mongoose.model('PurchaseModel', PurchaseSchema)
export default PurchaseModel