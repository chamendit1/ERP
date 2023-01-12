import { Box, Button, ButtonGroup, Grid, Input, InputLabel, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { getBoard, updateBoard } from '../../actions/board'
import Kanban from './kanban/Kanban'

const Board = () => {
	const {id} = useParams()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const board = useSelector(state => state.board.board)
	const [title, setTitle] = useState('s')

	useEffect(() => {
		dispatch(getBoard(id));
	}, [dispatch, id]);

	useEffect(() => {
		setTitle(board.label)
	}, [board, title]);


	
  return (
	<>
		<Grid container>
			<Grid item xs={12} border={'1px solid green'} style={{padding:'1rem'}}>
				<Input
					// defaultValue={title}
					placeholder={title}
					disableUnderline={true}
					onChange={(e) => dispatch(updateBoard(id, {...board, label: e.target.value}))}
					style={{color:'black', fontSize:'30px', fontWeight: 'bold'}}
        />
				<Typography variant='subtitle2'>This is poop.</Typography>
				<ButtonGroup>
					<Button onClick={() => navigate(`/Board/${id}/Kanban`)}>Kanban</Button>
				</ButtonGroup>
			</Grid>


			<Grid item xs={12} border={'1px solid green'}>
				  <Routes>
            <Route path="/Kanban" element={<Kanban/>} />
          </Routes>
			</Grid>
			
		</Grid>
	

	</>
  )
}

export default Board