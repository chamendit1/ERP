import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { createBoard, getBoards } from '../../actions/board';
import { Box, Button, Typography, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Boards = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const boards = useSelector(state => state.board.boards)

  const [boardData, setBoardData] = useState({ id: '0', label:'Main Board'})
  const [boardsData, setBoardsData] = useState([])
    
  useEffect(() => {
      dispatch(getBoards());
    }, [dispatch]);

  useEffect(() => {
    if(boards !== undefined && boards !== null) {
      setBoardsData(boards)
    }
    }, [boards]);

  const handleSubmit =()=> {
    dispatch(createBoard(boardData))
  }

  console.log(boardsData)
  const openBoard = (id) => {
    navigate(`/Board/${id}`)
  }

  return (
    <>
      <Button variant="contained" onClick={handleSubmit}>              
        <Typography>New Column</Typography>
      </Button>

      {boardsData.map((board) =>
      {
        return (
          <>
            <Button variant="contained" onClick={() => openBoard(board._id)}>{board.label}</Button>
          </>
        )
      }
      )}
    </>
  )
}

export default Boards