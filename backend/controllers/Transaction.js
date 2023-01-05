import express from 'express'
import mongoose from 'mongoose'

import TransactionModel from '../models/TransactionModel.js'


export const getTransactionsByClient = async (req, res) => { 
    const { id } = req.params;

    try {
        const invoice = await TransactionModel.find({ owner: id });
        
        res.status(200).json( {data: invoice} );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const getTransactions = async (req, res) => {

    try {
        const allInvoices = await TransactionModel.find({}).sort({_id:-1})
        //find({}).sort({_id:-1}) to sort according to date of creation

        res.status(200).json( { data: allInvoices })

    } catch (error) {
        res.status(409).json(error.message)
        
    }
    
}

export const createTransaction = async (req, res) => {

    const Transaction = req.body

    const newTransaction = new TransactionModel(Transaction)
    console.log(newTransaction)

    try {
        await newTransaction.save()
        res.status(201).json(newTransaction)
    } catch (error) {
        res.status(409).json(error.message)
    }

}

export const getTransaction = async (req, res) => { 
    const { id } = req.params;

    try {
        const invoice = await TransactionModel.findById(id);
        
        res.status(200).json(invoice);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const updateTransaction = async (req, res) => {
    const { id: _id } = req.params
    const invoice = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No invoice with that id')

    const updatedTransaction = await TransactionModel.findByIdAndUpdate(_id, {...invoice, _id}, { new: true})

    res.json(updatedTransaction)
}


export const deleteTransaction = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No invoice with that id')

    await TransactionModel.findByIdAndRemove(id)

    res.json({message: 'Invoice deleted successfully'})
}