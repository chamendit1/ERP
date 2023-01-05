import express from 'express'
import { getTransactionsByClient, getTransactions, createTransaction, updateTransaction, deleteTransaction, getTransaction } from '../controllers/transaction.js'

const router = express.Router()

router.get('/:id', getTransaction)
// router.get('/creator', getInvoicesByUser);
router.get('/', getTransactions)
//router.get('/', getInvoicesByUser)
router.get('/transactions/:id', getTransactionsByClient)
router.post('/', createTransaction)
router.patch('/:id', updateTransaction)
router.delete('/:id', deleteTransaction)


export default router