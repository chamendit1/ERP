import express from 'express'
import { getOrdersByClient, getOrders, createOrder, updateOrder, deleteOrder, getOrder } from '../controllers/invoices.js'

const router = express.Router()

router.get('/:id', getOrder)
// router.get('/creator', getInvoicesByUser);
router.get('/', getOrders)
//router.get('/', getInvoicesByUser)
router.get('/clients/:id', getOrdersByClient)
router.post('/', createOrder)
router.patch('/:id', updateOrder)
router.delete('/:id', deleteOrder)


export default router