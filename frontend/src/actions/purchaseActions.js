
import * as api from '../api/index'

import { ADD_NEW, UPDATE, DELETE, GET_Purchase, START_LOADING, END_LOADING, FETCH_ALL } from './constants'

 export const getPurchases = () => async (dispatch)=> {
     try {
         dispatch({ type: START_LOADING })
         const { data } = await api.fetchPurchases()
         console.log(data)
         dispatch({ type: FETCH_ALL, payload: data });
         dispatch({ type: END_LOADING })
     } catch (error) {
         console.log(error)
     }
 }

 export const getPurchasesByClient = (id) => async (dispatch)=> {
    console.log(id)
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPurchasesByClient(id)
        console.log(data)
        dispatch({ type: FETCH_ALL, payload: data}); //Need Check
        dispatch({ type: END_LOADING })
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

/*
export const getPurchasesByClient =(searchQuery) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING })
      const  { data: { data } } = await api.fetchPurchasesByClient(searchQuery)
      dispatch({ type: FETCH_Purchase_BY_CLIENT, payload: data });
      dispatch({ type: END_LOADING })
      console.log("Getting Purchase by Client")
      console.log(data)
    } catch (error) {
      console.log(error.response)
      
    }
  }


export const getPurchasesByUser =(searchQuery) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING })
      const  { data: { data } } = await api.fetchPurchasesByUser(searchQuery)
      dispatch({ type: FETCH_Purchase_BY_USER, payload: data });
      dispatch({ type: END_LOADING })
    } catch (error) {
      console.log(error.response)
      
    }
  }

*/
export const getPurchase = (id) => async (dispatch)=> {

    const user = JSON.parse(localStorage.getItem('profile'))

    try {
        const { data } = await api.fetchPurchase(id)
        const businessDetails = await api.fetchProfilesByUser({search: user?.result?._id || user?.result?.googleId})
        const PurchaseData = {...data, businessDetails}
        dispatch({ type: GET_Purchase, payload: PurchaseData  })
    } catch (error) {
        console.log(error)
    }
}

export const createPurchase =(Purchase, history, openSnackbar) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.addPurchase(Purchase)
        dispatch({ type: ADD_NEW, payload: data })
        history.push(`/Purchase/${data._id}`)
        dispatch({ type: END_LOADING })
        openSnackbar("Created successfull")

    } catch (error) {
        console.log(error)
    }
}

export const updatePurchase =(id, Purchase, openSnackbar) => async (dispatch) => {

    try {
        const { data } = await api.updatePurchase(id, Purchase)
        dispatch({ type: UPDATE, payload: data })
        openSnackbar("Update successfull")

        
    } catch (error) {
        console.log(error)
    }
}

export const deletePurchase =(id, openSnackbar) => async (dispatch) => {
    try {
        await api.deletePurchase(id)

        dispatch({type: DELETE, payload: id})
        openSnackbar("Purchase deleted successfully")
    } catch (error) {
        console.log(error.response)
    }
}