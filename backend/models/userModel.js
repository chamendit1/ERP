import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
    access: [String],
    resetToken:String,
    expireToken:Date,
})

const User = mongoose.model('User', userSchema)

export default User