import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { getColumn, getColumns, updateColumn } from '../../../actions/column';

const EditBoard = (props) => {
  	const { setOpen, open, boardId } = props
	const dispatch = useDispatch() 
	const [columnData, setColumnData] = useState({ id: '', label:'', board: boardId})
	const [columnsData, setColumnsData] = useState([])
	const column = useSelector(state => state.column.column)
	const columns = useSelector(state => state.column.columns)
	const [onDrag, setOnDrag] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};
	useEffect(() => {
		dispatch(getColumns())
  }, [dispatch, onDrag]);

	useEffect(() => {
			setColumnData(column)
			setColumnsData(columns)
  }, [column, columns, dispatch]);

	const onDragStart = (result) => {
		console.log(result)
		setOnDrag(true)
	}

	const onDragEnd = (result) => {
		const { destination, source, draggableId } = result;
		const selected = columns[source.index]
		const removed = columns[destination.index]
		const droppedId = columns[destination.index]._id
		// console.log(columns[destination.index])
		if(destination.droppableId === source.droppableId) {
			// console.log(source.index, destination.index)
			dispatch(updateColumn(draggableId, {...selected, id: destination.index}))		
			dispatch(updateColumn(droppedId, {...removed, id: source.index}))		
			setOnDrag(false)
		}
	}
  return (
		<>
		<DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
			<form>
				<Dialog onClose={handleClose} open={open}>
					<DialogTitle>Edit Board</DialogTitle>
					<DialogContent>
						<Droppable droppableId={'1'}>
							{(droppableProvided, droppableSnapshot) => (
								<Grid container key={'1'} spacing={3} {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
									{columns
									.sort((a, b) => (a - b))
									.map((column, index) => (
										<Grid item xs={12}>
										<Draggable key={column._id} draggableId={column._id} index={index}>
											{(draggableProvided, draggableSnapshot) => (
												<div ref={draggableProvided.innerRef} {...draggableProvided.draggableProps} {...draggableProvided.dragHandleProps}>
														<Box boxShadow={4} borderRadius={2} padding={2}>
															<Typography>
																{/* index: {index} id:{column.id}  */}
																label:{column.label} id: {column._id}
																</Typography>
														</Box>
												</div>
											)}
										</Draggable>
										</Grid>
									))}
								</Grid>
							)}
						</Droppable>
					</DialogContent>
					<DialogActions>

					</DialogActions>
				</Dialog>
			</form>
			</DragDropContext>
		</>
  )
}

export default EditBoard