import express from 'express'
import mongoose from 'mongoose'

import PurchaseModel from '../models/PurchaseModel.js'


export const getPurchasesByClient = async (req, res) => { 
    const { id } = req.params;

    try {
        const invoice = await PurchaseModel.find({ owner: id });
        
        res.status(200).json( {data: invoice} );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const getPurchases = async (req, res) => {

    try {
        const allInvoices = await PurchaseModel.find({}).sort({_id:-1})
        //find({}).sort({_id:-1}) to sort according to date of creation

        res.status(200).json( { data: allInvoices })

    } catch (error) {
        res.status(409).json(error.message)
        
    }
    
}

export const createPurchase = async (req, res) => {

    const Purchase = req.body

    const newPurchase = new PurchaseModel(Purchase)
    console.log(newPurchase)

    try {
        await newPurchase.save()
        res.status(201).json(newPurchase)
    } catch (error) {
        res.status(409).json(error.message)
    }

}

export const getPurchase = async (req, res) => { 
    const { id } = req.params;

    try {
        const invoice = await PurchaseModel.findById(id);
        
        res.status(200).json(invoice);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const updatePurchase = async (req, res) => {
    const { id: _id } = req.params
    const invoice = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No invoice with that id')

    const updatedPurchase = await PurchaseModel.findByIdAndUpdate(_id, {...invoice, _id}, { new: true})

    res.json(updatedPurchase)
}


export const deletePurchase = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No invoice with that id')

    await PurchaseModel.findByIdAndRemove(id)

    res.json({message: 'Invoice deleted successfully'})
}