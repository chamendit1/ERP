
import * as api from '../api/index'

import { ADD_NEW, UPDATE, DELETE, START_LOADING, END_LOADING, FETCH_ALL, GET_PRODUCT } from './constants'

 export const getProducts = () => async (dispatch)=> {
     try {
         dispatch({ type: START_LOADING })
         const { data } = await api.fetchProducts()
         dispatch({ type: FETCH_ALL, payload: data });
         dispatch({ type: END_LOADING })
         console.log(data)
     } catch (error) {
         console.log(error)
     }
 }


export const getProduct = (id) => async (dispatch)=> {

    const user = JSON.parse(localStorage.getItem('profile'))

    try {
        const { data } = await api.fetchProduct(id)
        const businessDetails = await api.fetchProfilesByUser({search: user?.result?._id || user?.result?.googleId})
        const inventoryData = {...data, businessDetails}
        dispatch({ type: GET_PRODUCT, payload: inventoryData  })
        console.log(inventoryData)
    } catch (error) {
        console.log(error)
    }
}

export const createProduct =(order, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        console.log(order)
        const { data } = await api.addProduct(order)
        console.log(data)
        dispatch({ type: ADD_NEW, payload: data })
        history.push(`/order/${data._id}`)
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error)
    }
}

export const updateProduct =(id, invoice) => async (dispatch) => {

    try {
        const { data } = await api.updateProduct(id, invoice)
        dispatch({ type: UPDATE, payload: data })
        
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct =(id, openSnackbar) => async (dispatch) => {
    try {
        await api.deleteProduct(id)

        dispatch({type: DELETE, payload: id})
        openSnackbar("Invoice deleted successfully")
    } catch (error) {
        console.log(error.response)
    }
}