import express from 'express'
import { createBoard, getAllBoard, updateBoard, getBoard } from '../controllers/board.js'

const router = express.Router()

router.get('/', getAllBoard);
router.get('/:id', getBoard)
//router.get('/user', getClientsByUser);
router.post('/', createBoard)
router.patch('/:id', updateBoard)
// router.delete('/:id', deleteClient)

export default router