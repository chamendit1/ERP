import express from 'express'
import mongoose from 'mongoose'

import ColumnModel from '../models/ColumnModel.js'

export const getColumn = async (req, res) => {
  const { id } = req.params;

  try {
      const columns = await ColumnModel.findById(id);
      res.status(200).json({ data: columns })
    } catch (err) {
      res.status(500).json(err)
    }
}

export const getColumnbyBoard = async (req, res) => {
  const { board } = req.params;

  try {
      const columns = await ColumnModel.find({board: board});
      res.status(200).json({ data: columns })
    } catch (err) {
      res.status(500).json(err)
    }
}

export const createColumn = async (req, res) => {
    try {
        const client = req.body
        console.log(client)
        const column = await ColumnModel.create({...client, createdAt: new Date().toISOString() })
        await column.save()
        res.status(201).json(column)
      } catch (err) {
        res.status(500).json(err)
      }
}

export const getAllColumn = async (req, res) => {
    try {
        const columns = await ColumnModel.find({}).sort({_id:-1})
        res.status(200).json({ data: columns })
        // console.log(columns)
      } catch (err) {
        res.status(500).json(err)
      }
}

export const updateColumn = async (req, res) => {
  const { id: _id } = req.params
  const client = req.body

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No client with that id')

  const updatedClient = await ColumnModel.findByIdAndUpdate(_id, {...client, _id}, { new: true})

  res.json(updatedClient)
}

// export const deleteColumn = async (req, res) => {
//     const { columnId } = req.params
//     try {
//       const sections = await Section.find({ column: columnId })
//       for (const section of sections) {
//         await Task.deleteMany({ section: section.id })
//       }
//       await Section.deleteMany({ column: columnId })
  
//       const currentColumn = await ColumnModel.findById(columnId)
  
//       if (currentColumnModel.favourite) {
//         const favourites = await ColumnModel.find({
//           user: currentColumnModel.user,
//           favourite: true,
//           _id: { $ne: columnId }
//         }).sort('favouritePosition')
  
//         for (const key in favourites) {
//           const element = favourites[key]
//           await ColumnModel.findByIdAndUpdate(
//             element.id,
//             { $set: { favouritePosition: key } }
//           )
//         }
//       }
  
//       await ColumnModel.deleteOne({ _id: columnId })
  
//       const columns = await ColumnModel.find().sort('position')
//       for (const key in columns) {
//         const column = columns[key]
//         await ColumnModel.findByIdAndUpdate(
//           column.id,
//           { $set: { position: key } }
//         )
//       }
  
//       res.status(200).json('deleted')
//     } catch (err) {
//       res.status(500).json(err)
//     }
//   }