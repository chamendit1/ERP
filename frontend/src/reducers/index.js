import { combineReducers } from 'redux'

import invoices from './invoices'
import clients from './clients'
import auth from './auth'
import profiles from './profiles'
import orders from './orders'
import inventories from './inventories'
import products from './products'
import transactions from './transactions'
import board from './board'
import column from './column'

export default combineReducers({ 
    transactions, 
    invoices, 
    clients, 
    auth, 
    profiles, 
    orders, 
    inventories, 
    products,
    board,
    column,
 })