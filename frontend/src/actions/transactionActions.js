
import * as api from '../api/index'

import { ADD_NEW, UPDATE, DELETE, GET_TRANSACTION, START_LOADING, END_LOADING, FETCH_ALL } from './constants'

 export const getTransactions = () => async (dispatch)=> {
     try {
         dispatch({ type: START_LOADING })
         const { data } = await api.fetchTransactions()
         console.log(data)
         dispatch({ type: FETCH_ALL, payload: data });
         dispatch({ type: END_LOADING })
     } catch (error) {
         console.log(error)
     }
 }

 export const getTransactionsByClient = (id) => async (dispatch)=> {
    console.log(id)
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchTransactionsByClient(id)
        console.log(data)
        dispatch({ type: FETCH_ALL, payload: data}); //Need Check
        dispatch({ type: END_LOADING })
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

/*
export const getTransactionsByClient =(searchQuery) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING })
      const  { data: { data } } = await api.fetchTransactionsByClient(searchQuery)
      dispatch({ type: FETCH_Transaction_BY_CLIENT, payload: data });
      dispatch({ type: END_LOADING })
      console.log("Getting Transaction by Client")
      console.log(data)
    } catch (error) {
      console.log(error.response)
      
    }
  }


export const getTransactionsByUser =(searchQuery) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING })
      const  { data: { data } } = await api.fetchTransactionsByUser(searchQuery)
      dispatch({ type: FETCH_Transaction_BY_USER, payload: data });
      dispatch({ type: END_LOADING })
    } catch (error) {
      console.log(error.response)
      
    }
  }

*/
export const getTransaction = (id) => async (dispatch)=> {

    const user = JSON.parse(localStorage.getItem('profile'))

    try {
        const { data } = await api.fetchTransaction(id)
        const businessDetails = await api.fetchProfilesByUser({search: user?.result?._id || user?.result?.googleId})
        const TransactionData = {...data, businessDetails}
        dispatch({ type: GET_TRANSACTION, payload: TransactionData  })
    } catch (error) {
        console.log(error)
    }
}

export const createTransaction =(Transaction) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.addTransaction(Transaction)
        dispatch({ type: ADD_NEW, payload: data })
        // history.push(`/Transaction/${data._id}`)
        dispatch({ type: END_LOADING })
        // openSnackbar("Created successfull")

    } catch (error) {
        console.log(error)
    }
}

export const updateTransaction =(id, Transaction, openSnackbar) => async (dispatch) => {

    try {
        const { data } = await api.updateTransaction(id, Transaction)
        dispatch({ type: UPDATE, payload: data })
        openSnackbar("Update successfull")

        
    } catch (error) {
        console.log(error)
    }
}

export const deleteTransaction =(id, openSnackbar) => async (dispatch) => {
    try {
        await api.deleteTransaction(id)

        dispatch({type: DELETE, payload: id})
        openSnackbar("Transaction deleted successfully")
    } catch (error) {
        console.log(error.response)
    }
}