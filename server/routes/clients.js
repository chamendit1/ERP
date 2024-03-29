import express from 'express'
import {getClient, getClients, createClient, updateClient, deleteClient, getClientsByUser} from '../controllers/clients.js'

const router = express.Router()

router.get('/', getClientsByUser);
router.get('/:id', getClient)
//router.get('/user', getClientsByUser);
router.post('/', createClient)
router.patch('/:id', updateClient)
router.delete('/:id', deleteClient)

export default router