import express from 'express'
import mongoose from 'mongoose'

const BoardSchema = new mongoose.Schema({
    id: String,
    label: String,
    pages:[String],
    createdAt: {
        type: Date,
        default: new Date()
    }
  })
  
const BoardModel = mongoose.model('Board', BoardSchema)
export default BoardModel