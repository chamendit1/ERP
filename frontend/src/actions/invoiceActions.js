
import * as api from '../api/index'

import { ADD_NEW, UPDATE, DELETE, GET_INVOICE, START_LOADING, END_LOADING, FETCH_ALL } from './constants'

 export const getInvoices = () => async (dispatch)=> {
     try {
         dispatch({ type: START_LOADING })
         const { data } = await api.fetchInvoices()
         console.log(data)
         dispatch({ type: FETCH_ALL, payload: data });
         dispatch({ type: END_LOADING })
     } catch (error) {
         console.log(error)
     }
 }

 export const getInvoicesByClient = (id) => async (dispatch)=> {
    console.log(id)
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchInvoicesByClient(id)
        dispatch({ type: FETCH_ALL, payload: data}); //Need Check
        dispatch({ type: END_LOADING })
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

/*
export const getInvoicesByClient =(searchQuery) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING })
      const  { data: { data } } = await api.fetchInvoicesByClient(searchQuery)
      dispatch({ type: FETCH_INVOICE_BY_CLIENT, payload: data });
      dispatch({ type: END_LOADING })
      console.log("Getting Invoice by Client")
      console.log(data)
    } catch (error) {
      console.log(error.response)
      
    }
  }


export const getInvoicesByUser =(searchQuery) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING })
      const  { data: { data } } = await api.fetchInvoicesByUser(searchQuery)
      dispatch({ type: FETCH_INVOICE_BY_USER, payload: data });
      dispatch({ type: END_LOADING })
    } catch (error) {
      console.log(error.response)
      
    }
  }

*/
export const getInvoice = (id) => async (dispatch)=> {

    const user = JSON.parse(localStorage.getItem('profile'))

    try {
        const { data } = await api.fetchInvoice(id)
        const businessDetails = await api.fetchProfilesByUser({search: user?.result?._id || user?.result?.googleId})
        const invoiceData = {...data, businessDetails}
        dispatch({ type: GET_INVOICE, payload: invoiceData  })
    } catch (error) {
        console.log(error)
    }
}

export const createInvoice =(invoice, history, openSnackbar) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.addInvoice(invoice)
        dispatch({ type: ADD_NEW, payload: data })
        history.push(`/invoice/${data._id}`)
        dispatch({ type: END_LOADING })
        openSnackbar("Created successfull")

    } catch (error) {
        console.log(error)
    }
}

export const updateInvoice =(id, invoice, openSnackbar) => async (dispatch) => {

    try {
        const { data } = await api.updateInvoice(id, invoice)
        dispatch({ type: UPDATE, payload: data })
        openSnackbar("Update successfull")

        
    } catch (error) {
        console.log(error)
    }
}

export const deleteInvoice =(id, openSnackbar) => async (dispatch) => {
    try {
        await api.deleteInvoice(id)

        dispatch({type: DELETE, payload: id})
        openSnackbar("Invoice deleted successfully")
    } catch (error) {
        console.log(error.response)
    }
}