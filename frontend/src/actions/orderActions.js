
import * as api from '../api/index'

import { ADD_NEW, UPDATE, DELETE, GET_ORDER, START_LOADING, END_LOADING, FETCH_ALL } from './constants'

 export const getOrders = () => async (dispatch)=> {
     try {
         dispatch({ type: START_LOADING })
         const { data } = await api.fetchOrders()
         console.log(data)
         dispatch({ type: FETCH_ALL, payload: data });
         dispatch({ type: END_LOADING })
         
     } catch (error) {
         console.log(error)
     }
 }

//  export const getOrdersByClient = (id) => async (dispatch)=> {
//      console.log(id)

//     try {
//         dispatch({ type: START_LOADING })
//         const { data } = await api.fetchOrdersByClient(id)
//         dispatch({ type: FETCH_ALL, payload: data}); //Need Check
//         dispatch({ type: END_LOADING })
//         console.log(data)
//     } catch (error) {
//         console.log(error)
//     }
// }

export const getOrder = (id) => async (dispatch)=> {
    try {
        const { data } = await api.fetchOrder(id)
        console.log( data )
        dispatch({ type: GET_ORDER, payload: data  })
    } catch (error) {
        console.log(error)
    }
}

export const createOrder =(order, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        console.log(order)
        const { data } = await api.addOrder(order)
        console.log(data)
        dispatch({ type: ADD_NEW, payload: data })
        // history.push(`/order/${data._id}`)
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error)
    }
}

// export const updateOrder =(id, invoice) => async (dispatch) => {

//     try {
//         const { data } = await api.updateOrder(id, invoice)
//         dispatch({ type: UPDATE, payload: data })
        
//     } catch (error) {
//         console.log(error)
//     }
// }

// export const deleteOrder =(id, openSnackbar) => async (dispatch) => {
//     try {
//         await api.deleteOrder(id)

//         dispatch({type: DELETE, payload: id})
//         openSnackbar("Invoice deleted successfully")
//     } catch (error) {
//         console.log(error.response)
//     }
// }