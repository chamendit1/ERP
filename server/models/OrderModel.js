import mongoose from 'mongoose'

const OrderSchema = mongoose.Schema({
    dueDate: Date,
    items: [ { itemName: String,  quantity: String } ],
    notes: String,
    status: String,
    orderNumber: String,
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