import express from 'express'
import { createFeasibility, getFeasibility } from '../controllers/feasibility.js'

const router = express.Router()

router.get('/:id', getFeasibility)
router.post('/', createFeasibility)



export default router