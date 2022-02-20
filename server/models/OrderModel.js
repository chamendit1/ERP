import mongoose from 'mongoose'

const OrderSchema = mongoose.Schema({
    dueDate: Date,
    items: [ { itemName: String, unitPrice: String, quantity: String, discount: String } ],
    notes: String,
    status: String,
    invoiceNumber: String,
    type: String,
    creator: [String],
    owner: [String],
    client: { _id: String, name: String, email: String, phone: String, address: String },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const OrderModel = mongoose.model('OrderModel', OrderSchema)
export default OrderModel