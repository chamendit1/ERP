import express from 'express'
import { getInvoicesByClient, getInvoices, createInvoice, updateInvoice, deleteInvoice, getInvoice } from '../controllers/invoices.js'

const router = express.Router()

router.get('/:id', getInvoice)
// router.get('/creator', getInvoicesByUser);
router.get('/', getInvoices)
//router.get('/', getInvoicesByUser)
router.get('/clients/:id', getInvoicesByClient)
router.post('/', createInvoice)
router.patch('/:id', updateInvoice)
router.delete('/:id', deleteInvoice)


export default router