import express from 'express'
import mongoose from 'mongoose'

import ProductModel from '../models/ProductModel.js'


export const getProductsByClient = async (req, res) => { 
    const { id } = req.params;

    try {
        const invoice = await ProductModel.find({ owner: id });
        
        res.status(200).json( {data: invoice} );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const getProducts = async (req, res) => {

    try {
        const allInvoices = await ProductModel.find({}).sort({_id:-1})
        //find({}).sort({_id:-1}) to sort according to date of creation
        res.status(200).json( { data: allInvoices })

    } catch (error) {
        res.status(409).json(error.message)
        
    }
    
}

export const createProduct = async (req, res) => {

    const order = req.body

    const newProduct = new ProductModel(order)
    
    
    try {
        await newProduct.save()
        res.status(201).json(newProduct)
        
    } catch (error) {
        console.log('Failed Creating Product')
        res.status(409).json(error.message)
    }

}

export const getProduct = async (req, res) => { 
    const { id } = req.params;

    try {
        const invoice = await ProductModel.findById(id);
        res.status(200).json(invoice);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const updateProduct = async (req, res) => {
    const { id: _id } = req.params
    const invoice = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No invoice with that id')

    const updatedProduct = await ProductModel.findByIdAndUpdate(_id, {...invoice, _id}, { new: true})

    res.json(updatedProduct)
}


export const deleteProduct = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No invoice with that id')

    await ProductModel.findByIdAndRemove(id)

    res.json({message: 'Invoice deleted successfully'})
}