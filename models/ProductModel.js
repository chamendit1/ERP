import mongoose from 'mongoose'

const ProductSchema = mongoose.Schema({
    itemName: String,  
    price: String,
    notes: String,
    status: String,
    ProductNumber: String,
    type: String,
    creator: [String],
    owner: [String],
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const ProductModel = mongoose.model('ProductModel', ProductSchema)
export default ProductModel