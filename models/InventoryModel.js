import mongoose from 'mongoose'

const InventorySchema = mongoose.Schema({
    items: [ { itemName: String,  quantity: String } ],
    notes: String,
    status: String,
    InventoryNumber: String,
    type: String,
    creator: [String],
    owner: [String],
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const InventoryModel = mongoose.model('InventoryModel', InventorySchema)
export default InventoryModel