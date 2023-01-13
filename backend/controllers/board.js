import express from 'express'
import mongoose from 'mongoose'

import BoardModel from '../models/BoardModel.js'

export const getBoard = async (req, res) => {
  const { id } = req.params;

  try {
      const boards = await BoardModel.findById(id);
      res.status(200).json({ data: boards })
    } catch (err) {
      res.status(500).json(err)
    }
}

export const createBoard = async (req, res) => {
    try {
        const client = req.body
        console.log(client)
        const board = await BoardModel.create({...client, createdAt: new Date().toISOString() })
        await board.save()
        res.status(201).json(board)
      } catch (err) {
        res.status(500).json(err)
      }
}

export const getAllBoard = async (req, res) => {
    try {
        const boards = await BoardModel.find({}).sort({_id:-1})
        res.status(200).json({ data: boards })
      } catch (err) {
        res.status(500).json(err)
      }
}

export const updateBoard = async (req, res) => {
  const { id: _id } = req.params
  const client = req.body

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No client with that id')
  console.log(client)
  const updatedClient = await BoardModel.findByIdAndUpdate(_id, {...client, _id}, { new: true})
  console.log(updatedClient)
  res.json(updatedClient)
}

// export const deleteBoard = async (req, res) => {
//     const { boardId } = req.params
//     try {
//       const sections = await Section.find({ board: boardId })
//       for (const section of sections) {
//         await Task.deleteMany({ section: section.id })
//       }
//       await Section.deleteMany({ board: boardId })
  
//       const currentBoard = await BoardModel.findById(boardId)
  
//       if (currentBoardModel.favourite) {
//         const favourites = await BoardModel.find({
//           user: currentBoardModel.user,
//           favourite: true,
//           _id: { $ne: boardId }
//         }).sort('favouritePosition')
  
//         for (const key in favourites) {
//           const element = favourites[key]
//           await BoardModel.findByIdAndUpdate(
//             element.id,
//             { $set: { favouritePosition: key } }
//           )
//         }
//       }
  
//       await BoardModel.deleteOne({ _id: boardId })
  
//       const boards = await BoardModel.find().sort('position')
//       for (const key in boards) {
//         const board = boards[key]
//         await BoardModel.findByIdAndUpdate(
//           board.id,
//           { $set: { position: key } }
//         )
//       }
  
//       res.status(200).json('deleted')
//     } catch (err) {
//       res.status(500).json(err)
//     }
//   }