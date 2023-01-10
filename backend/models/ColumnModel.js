import express from 'express'
import mongoose from 'mongoose'

const ColumnSchema = new mongoose.Schema({
    id: String,
    label: String,
    board: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
  })
  
const ColumnModel = mongoose.model('Column', ColumnSchema)
export default ColumnModel