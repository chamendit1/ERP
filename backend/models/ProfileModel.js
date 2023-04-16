import mongoose from 'mongoose'

const profileSchema = mongoose.Schema({
    name: String,
    email: {type: String, required: true, unique: true},
    phoneNumber: String,
    businessName: String,
    contactAddress: String, 
    logo: String,
    website: String,
    role: {type: String, required: true},
    access: {CRM: Boolean, Accounting: Boolean},
    active: Boolean,
    userId: [String],
})

const Profile = mongoose.model('Profile', profileSchema)

export default Profile