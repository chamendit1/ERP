
import * as api from '../api/index'

import { ADD_NEW, UPDATE, DELETE, START_LOADING, END_LOADING, FETCH_ALL, GET_INVENTORY } from './constants'

 export const getInventories = () => async (dispatch)=> {
     try {
         dispatch({ type: START_LOADING })
         const { data } = await api.fetchInventories()
         dispatch({ type: FETCH_ALL, payload: data });
         dispatch({ type: END_LOADING })
         console.log(data)
     } catch (error) {
         console.log(error)
     }
 }

 export const getInventoriesByClient = (id) => async (dispatch)=> {
     console.log(id)

    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchInventoriesByClient(id)
        dispatch({ type: FETCH_ALL, payload: data}); //Need Check
        dispatch({ type: END_LOADING })
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

export const getInventory = (id) => async (dispatch)=> {

    const user = JSON.parse(localStorage.getItem('profile'))

    try {
        const { data } = await api.fetchInventory(id)
        const businessDetails = await api.fetchProfilesByUser({search: user?.result?._id || user?.result?.googleId})
        const inventoryData = {...data, businessDetails}
        dispatch({ type: GET_INVENTORY, payload: inventoryData  })
        console.log(inventoryData)
    } catch (error) {
        console.log(error)
    }
}

export const createInventory =(order, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        console.log(order)
        const { data } = await api.addInventory(order)
        console.log(data)
        dispatch({ type: ADD_NEW, payload: data })
        history.push(`/order/${data._id}`)
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error)
    }
}

export const updateInventory =(id, invoice) => async (dispatch) => {

    try {
        const { data } = await api.updateInventory(id, invoice)
        dispatch({ type: UPDATE, payload: data })
        
    } catch (error) {
        console.log(error)
    }
}

export const deleteInventory =(id, openSnackbar) => async (dispatch) => {
    try {
        await api.deleteInventory(id)

        dispatch({type: DELETE, payload: id})
        openSnackbar("Invoice deleted successfully")
    } catch (error) {
        console.log(error.response)
    }
}