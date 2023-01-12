import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createBoard, updateBoard } from '../../../actions/board';

const AddBoard= (props) => {
  const { setOpen, open } = props
	const dispatch = useDispatch()
    const [boardData, setBoardData] = useState({id: null, label: ''})
    const board = useSelector(state => state.board.board)

	useEffect(() => {
		setBoardData(board)
	}, [board]);
	const handleSubmit =(e)=> {
		e.preventDefault()
		// console.log(boardData.id)
		if(board.id) {
			dispatch(updateBoard(board._id, boardData))
		} else {
			dispatch(createBoard(boardData))
		}
		handleClose()
    }

	const handleClose = () => {
		setOpen(false);
	};
    // console.log(boardData)
  return (
    <>
		<form>
			<Dialog onClose={handleClose} open={open}>
				<DialogTitle>
					<Typography>Create Board</Typography>
				</DialogTitle>
				<DialogContent dividers>
					<Typography>Label</Typography>
					<TextField fullWidth
						id="fullWidth" 
						margin="dense"
						variant="outlined"
						value={boardData.label}
						onChange={(e) => setBoardData({...boardData, label: e.target.value})}
					/>

					<Typography>ID</Typography>
					<TextField fullWidth
						id="fullWidth" 
						margin="dense"
						variant="outlined"
						value={boardData.id}
						onChange={(e) => setBoardData({...boardData, id: e.target.value})}
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={handleSubmit} variant="contained">
						Create
					</Button>
				</DialogActions>
			</Dialog>
		</form>
	</>
  )
}

export default AddBoard