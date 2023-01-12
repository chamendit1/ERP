import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { createColumn, updateColumn } from '../../actions/column';

const AddColumn = (props) => {
  const { setOpen, open, boardId, column } = props
	const dispatch = useDispatch()
	const [columnData, setColumnData] = useState({ id: '', label:'', board: boardId})

	useEffect(() => {
		setColumnData(column)
	}, [column]);

	const handleSubmit =(e)=> {
		e.preventDefault()
		if(column.id !== null) {
			dispatch(updateColumn(column._id, columnData))
		} else {
			dispatch(createColumn(columnData))
		}
		handleClose()
  }

	const handleClose = () => {
		setOpen(false);
	};
  return (
    <>
		<form>
			<Dialog onClose={handleClose} open={open}>
				<DialogTitle>
					<Typography>Create Column</Typography>
				</DialogTitle>
				<DialogContent dividers>
					<Typography>Label</Typography>
					<TextField fullWidth
						id="fullWidth" 
						margin="dense"
						variant="outlined"
						value={columnData.label}
						onChange={(e) => setColumnData({...columnData, label: e.target.value})}
					/>

					<Typography>Order</Typography>
					<TextField fullWidth
						id="fullWidth" 
						margin="dense"
						variant="outlined"
						value={columnData.id}
						onChange={(e) => setColumnData({...columnData, id: e.target.value})}
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

export default AddColumn