import { Box, Button, Typography, Divider } from '@mui/material';
import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getInvoices } from '../../../../actions/invoiceActions';

import DragPage from './DragPage';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { getBoards, createBoard, updateBoard} from '../../../../actions/board'
import { getColumn, createColumn, updateColumn } from '../../../../actions/column';
import Boards from '../../../Board/Boards'

const Kanban = () => {

  const dispatch = useDispatch()
  const rows = useSelector(state => state.board.boards)
  const [boardData, setBoardData] = useState({ id: '0', label:'col 1', taskId: []})

  // const isLoading = useSelector(state => state.invoices.isLoading)


  const handleSubmit =(e)=> {
    e.preventDefault()
      dispatch(createColumn(boardData))
      console.log(boardData)
  }
  const handleCreate =(e)=> {
    e.preventDefault()
    dispatch(updateColumn(rows[0]._id, {...rows[0], taskId: [...rows[0].taskId, 3]}))
    // console.log({...rows[0], taskId: [...rows[0].taskId, 3]})
  }

  // if(!user) {
  //   navigate('/login')
  // }
  // console.log(useSelector(state => state))

  return (
    <Box className='kanban-container'>
      <Divider/>
      <Box className='kanban'>
        <Boards />
      </Box>
    </Box>
  )
}

export default Kanban