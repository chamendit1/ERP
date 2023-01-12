import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { createBoard, getBoards } from '../../actions/board';
import { Box, Button, Typography, Divider, Grid, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
// import AddBoard from './AddBoard';


const Boards = () => {
  const dispatch = useDispatch();
  const [boardData, setBoardData] = useState({id: '0', label: 'untitled'})
  const boards = useSelector(state => state.board.boards)
  const [boardsData, setBoardsData] = useState([])

  const handleSubmit =(e)=> {
    e.preventDefault()
    dispatch(createBoard(boardData))
  }

    
  useEffect(() => {
      dispatch(getBoards());
    }, [dispatch, boards]);

  useEffect(() => {
    if(boards !== undefined && boards !== null) {
      setBoardsData(boards)
    }
    }, [boards]);


  return (
    <>
      <Grid container>
        <Grid item xs={12} style={{padding:'1rem'}} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>Boards</Typography>
          <IconButton color="blue" onClick={handleSubmit}>
            <AddIcon fontSize='small'/>
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
          {boardsData.map((board) =>
            {
              return (
                <Grid item xs={12} style={{backgroundColor:'beige', paddingLeft:'1.5rem', paddingTop:'1rem', paddingBottom:'1rem'}}>
                  <Box component={Link} to={`/Board/${board._id}`} style={{textDecoration: 'none',}}>
                    <Typography style={{ textDecoration: 'none', color: '#000' }}>{board.label}</Typography>
                  </Box>
                </Grid>
              )
            }
          )}
          </Grid>
        </Grid>
      </Grid>
    	
    </>
  )
}

export default Boards