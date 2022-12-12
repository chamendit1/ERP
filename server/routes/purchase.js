import express from 'express'
import { getPurchasesByClient, getPurchases, createPurchase, updatePurchase, deletePurchase, getPurchase } from '../controllers/purchase.js'

const router = express.Router()

router.get('/:id', getPurchase)
// router.get('/creator', getInvoicesByUser);
router.get('/', getPurchases)
//router.get('/', getInvoicesByUser)
router.get('/purchases/:id', getPurchasesByClient)
router.post('/', createPurchase)
router.patch('/:id', updatePurchase)
router.delete('/:id', deletePurchase)


export default router