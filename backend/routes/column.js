import express from 'express'
import { createColumn, getAllColumn, updateColumn, getColumn } from '../controllers/column.js'

const router = express.Router()

router.get('/', getAllColumn);
router.get('/:id', getColumn)
//router.get('/user', getClientsByUser);
router.post('/', createColumn)
router.patch('/:id', updateColumn)
// router.delete('/:id', deleteClient)

export default router