import thunk from 'redux-thunk'
import reducers from '../reducers/'
import {  createStore, applyMiddleware, compose } from 'redux'

export const store = createStore(reducers, compose(applyMiddleware(thunk)))