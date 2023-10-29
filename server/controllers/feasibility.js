import express from 'express'
import mongoose from 'mongoose'
import FeasibilityModel from '../models/FeasibilityModel.js';

export const getFeasibility = async (req, res) => { 
    const { id } = req.params;

    try {
        const invoice = await FeasibilityModel.findById(id);
        
        res.status(200).json(invoice);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const createFeasibility = async (req, res) => {

    const feasibility = req.body

    const newFeasibility = new feasibilityModel(feasibility)

    console.log(newFeasibility)

    try {
        await newFeasibility.save()
        res.status(201).json(newFeasibility)
    } catch (error) {
        res.status(409).json(error.message)
    }

}