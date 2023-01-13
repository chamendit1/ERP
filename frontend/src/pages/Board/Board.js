import { Box, Button, ButtonGroup, Grid, Input, InputLabel, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { getBoard, updateBoard } from '../../actions/board'
import Kanban from './Components/kanban/Kanban'
import Table from './Components/table/Table'
import AddPage from './Pages/AddPage'

const Board = () => {
	const {id} = useParams()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const board = useSelector(state => state.board.board)
	const [boardData, setBoardData] = useState({pages:[]})
	const [title, setTitle] = useState('s')
	const [openAddPage, setAddPage] = useState(false)

	useEffect(() => {
		dispatch(getBoard(id));
	}, [dispatch, id]);
	useEffect(() => {
		if(Object.keys(board).length !== 0) {
			setBoardData(board)
		}
	}, [board]);

	useEffect(() => {
		setTitle(board.label)
	}, [board, title]);

	const handleAddPage =()=> {
		setAddPage((prev) => !prev)
 	}

	// console.log(boardData)

	const pages =  [
		{
			page: 'Kanban',
			link: <Kanban/>,
		},
		{
			page: 'Table',
			link: <Table/>,
		}
	]

	// console.log(pages[0].link)
  return (
	<>
		<Grid container>
			<Grid item xs={12} style={{padding:'1rem'}}>
				<Input
					// defaultValue={title}
					placeholder={title}
					disableUnderline={true}
					onChange={(e) => dispatch(updateBoard(id, {...board, label: e.target.value}))}
					style={{color:'black', fontSize:'30px', fontWeight: 'bold'}}
        />
				<Typography variant='subtitle2'>This is poop.</Typography>

				<ButtonGroup>
					{boardData.pages.map((page, index) => (
						<Button key={index} onClick={() => navigate(`/Board/${id}/${page}`)} >{page}</Button>
					))}
					<Button onClick={handleAddPage}>+</Button>
				</ButtonGroup>
			</Grid>


			<Grid item xs={12}  height={'60vh'}>
				<Routes>
            		<Route path="/Kanban" element={<Kanban/>} />
					<Route path="/Table" element={<Table/>} />
          		</Routes>
			</Grid>
			
		</Grid>

		<AddPage open={openAddPage} setOpen={setAddPage} boardId={id} 
		/>

	</>
  )
}

export default Board