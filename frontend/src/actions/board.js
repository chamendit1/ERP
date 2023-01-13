import * as api from '../api/index'

import { ADD_NEW_BOARD, UPDATE_BOARD, DELETE_BOARD,  FETCH_BOARD,FETCH_BOARDS, START_LOADING, END_LOADING } from './constants'


export const getBoard= (id) => async (dispatch) => {
  try {
    // console.log('Starting a')
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchBoard(id);
    // console.log(data)
    dispatch({ type: FETCH_BOARD, payload: { client: data } });
    dispatch({ type: END_LOADING });

  } catch (error) {
    console.log(error);
  }
};


export const getBoards= () => async (dispatch) => {
  try {
    // console.log('Starting a')
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchBoards();
    dispatch({ type: FETCH_BOARDS, payload: { client: data } });
    dispatch({ type: END_LOADING });

  } catch (error) {
    console.log(error);
  }
};


export const createBoard =(client, openSnackbar) => async (dispatch) => {
  console.log(client)

    try {
        const { data } = await api.addBoard(client)
        console.log(data)
        dispatch({ type: ADD_NEW_BOARD, payload: data })
        openSnackbar("Customer added successfully")

    } catch (error) {
        console.log(error)
    }
}


export const updateBoard =(id, client) => async (dispatch) => {
  console.log(id,client)

    const { data } = await api.updateBoard(id, client)
    dispatch({ type: UPDATE_BOARD, payload: data })
    try {
        
    } catch (error) {
        console.log(error)
    }
}

export const deleteBoard =(id, openSnackbar) => async (dispatch) => {
    try {
        await api.deleteBoard(id)

        dispatch({type: DELETE_BOARD, payload: id})
        openSnackbar("Customer deleted successfully")
    } catch (error) {
        console.log(error)
    }
}

