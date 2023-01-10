import * as api from '../api/index'

import { ADD_NEW_COLUMN, UPDATE_COLUMN, DELETE_COLUMN,  FETCH_COLUMN,FETCH_COLUMNS, START_LOADING, END_LOADING } from './constants'


export const getColumn= (id) => async (dispatch) => {
  try {
    // console.log('Starting a')
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchColumn(id);
    dispatch({ type: FETCH_COLUMN, payload: { client: data } });
    dispatch({ type: END_LOADING });

  } catch (error) {
    console.log(error);
  }
};


export const getColumns= () => async (dispatch) => {
  try {
    // console.log('Starting a')
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchColumns();
    dispatch({ type: FETCH_COLUMNS, payload: { client: data } });
    dispatch({ type: END_LOADING });

  } catch (error) {
    console.log(error);
  }
};

export const getColumnsbyId= (id) => async (dispatch) => {
  try {
    // console.log('Starting a')
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchColumns();
    dispatch({ type: FETCH_COLUMNS, payload: { client: data } });
    dispatch({ type: END_LOADING });

  } catch (error) {
    console.log(error);
  }
};


export const createColumn =(client, openSnackbar) => async (dispatch) => {
  console.log(client)

    try {
        const { data } = await api.addColumn(client)
        console.log(data)
        dispatch({ type: ADD_NEW_COLUMN, payload: data })
        openSnackbar("Customer added successfully")

    } catch (error) {
        console.log(error)
    }
}


export const updateColumn =(id, client) => async (dispatch) => {
  console.log(id,client)

    const { data } = await api.updateColumn(id, client)
    dispatch({ type: UPDATE_COLUMN, payload: data })
    // openSnackbar("Customer updated successfully")
    try {
        
    } catch (error) {
        console.log(error)
    }
}

export const deleteColumn =(id, openSnackbar) => async (dispatch) => {
    try {
        await api.deleteColumn(id)

        dispatch({type: DELETE_COLUMN, payload: id})
        openSnackbar("Customer deleted successfully")
    } catch (error) {
        console.log(error)
    }
}

