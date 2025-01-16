import express from 'express'
import { DeleteUser, getProfie, login, logout, register } from '../controller/customerrcontroller.js'
import { protectedCustomer } from '../middleware/protected.js'

const customerRouter = express.Router()

customerRouter.route('/register').post(register)
customerRouter.route('/login').post(login)
customerRouter.route('/profile').get(protectedCustomer, getProfie)
customerRouter.route('/logout').post(logout)
customerRouter.route('/delete/:id').delete(DeleteUser)
export default customerRouter