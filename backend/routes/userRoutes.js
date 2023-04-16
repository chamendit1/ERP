import express from 'express'
import { signin, signup, forgotPassword, resetPassword, updateUser, getUsers } from '../controllers/user.js'

const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.post('/:id', updateUser)
router.post('/forgot', forgotPassword);
router.post('/reset', resetPassword);
router.get('/users', getUsers );

export default router