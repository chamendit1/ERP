import express from 'express'
import mongoose from 'mongoose'

import OrderModel from '../models/OrderModel.js'


export const getOrdersByClient = async (req, res) => { 
    const { id } = req.params;

    try {
        const invoice = await OrderModel.find({ owner: id });
        
        res.status(200).json( {data: invoice} );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const getOrders = async (req, res) => {

    try {
        const allInvoices = await OrderModel.find({}).sort({_id:-1})
        //find({}).sort({_id:-1}) to sort according to date of creation

        res.status(200).json( { data: allInvoices })

    } catch (error) {
        res.status(409).json(error.message)
        
    }
    
}

export const createOrder = async (req, res) => {

    const order = req.body

    const newOrder = new OrderModel(order)
    console.log(newOrder)

    try {
        await newOrder.save()
        res.status(201).json(newOrder)
    } catch (error) {
        res.status(409).json(error.message)
    }

}

export const getOrder = async (req, res) => { 
    const { id } = req.params;

    try {
        const invoice = await OrderModel.findById(id);
        
        res.status(200).json(invoice);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const updateOrder = async (req, res) => {
    const { id: _id } = req.params
    const invoice = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No invoice with that id')

    const updatedOrder = await OrderModel.findByIdAndUpdate(_id, {...invoice, _id}, { new: true})

    res.json(updatedOrder)
}


export const deleteOrder = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No invoice with that id')

    await OrderModel.findByIdAndRemove(id)

    res.json({message: 'Invoice deleted successfully'})
}