import express from 'express'
import mongoose from 'mongoose'

const ClientSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    userId: [String],
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const ClientModel = mongoose.model('ClientModel', ClientSchema)
export default ClientModel