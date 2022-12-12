import express from 'express'
import { getInventoriesByClient, getInventories, createInventory, updateInventory, deleteInventory, getInventory } from '../controllers/inventories.js'

const router = express.Router()

router.get('/:id', getInventory)
// router.get('/creator', getInvoicesByUser);
router.get('/', getInventories)
//router.get('/', getInvoicesByUser)
router.get('/clients/:id', getInventoriesByClient)
router.post('/', createInventory)
router.patch('/:id', updateInventory)
router.delete('/:id', deleteInventory)


export default router