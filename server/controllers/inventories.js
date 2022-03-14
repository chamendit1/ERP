import express from 'express'
import mongoose from 'mongoose'

import InventoryModel from '../models/InventoryModel.js'


export const getInventoriesByClient = async (req, res) => { 
    const { id } = req.params;

    try {
        const invoice = await InventoryModel.find({ owner: id });
        
        res.status(200).json( {data: invoice} );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const getInventories = async (req, res) => {

    try {
        const allInvoices = await InventoryModel.find({}).sort({_id:-1})
        //find({}).sort({_id:-1}) to sort according to date of creation

        res.status(200).json( { data: allInvoices })

    } catch (error) {
        res.status(409).json(error.message)
        
    }
    
}

export const createInventory = async (req, res) => {

    const order = req.body

    const newInventory = new InventoryModel(order)
    console.log("created")

    try {
        await newInventory.save()
        res.status(201).json(newInventory)
    } catch (error) {
        res.status(409).json(error.message)
    }

}

export const getInventory = async (req, res) => { 
    const { id } = req.params;

    try {
        const invoice = await InventoryModel.findById(id);
        
        res.status(200).json(invoice);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const updateInventory = async (req, res) => {
    const { id: _id } = req.params
    const invoice = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No invoice with that id')

    const updatedInventory = await InventoryModel.findByIdAndUpdate(_id, {...invoice, _id}, { new: true})

    res.json(updatedInventory)
}


export const deleteInventory = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No invoice with that id')

    await InventoryModel.findByIdAndRemove(id)

    res.json({message: 'Invoice deleted successfully'})
}