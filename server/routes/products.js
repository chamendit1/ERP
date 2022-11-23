import express from 'express'
import { getProductsByClient, getProducts, createProduct, updateProduct, deleteProduct, getProduct } from '../controllers/products.js'

const router = express.Router()

router.get('/:id', getProduct)
router.get('/', getProducts)
router.post('/', createProduct)
router.patch('/:id', updateProduct)
router.delete('/:id', deleteProduct)


export default router