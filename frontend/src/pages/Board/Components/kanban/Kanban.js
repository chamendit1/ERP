import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'
import { Box, Button, Typography, Divider, Grid } from '@mui/material';
import { createColumn, getColumns } from '../../../../actions/column';
import { getInvoice, getInvoices, updateInvoice } from '../../../../actions/invoiceActions';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddColumn from '../../Pages/AddColumn';
import EditBoard from '../../Pages/EditBoard';
import DragCard from './DragCard';
import DragGrid from './DragGrid';
import { getBoard } from '../../../../actions/board';

const Kanban = () => {
  	const { id } = useParams()
	const dispatch = useDispatch()
  	// const [boardData, setBoardData] = useState({ id: '0', label:'Main Board'})
	const [columnData, setColumnData] = useState(0)
	const [columnsData, setColumnsData] = useState([])
	const [invoicesData, setInvoicesData] = useState([{_id: 0, invoiceNumber: 1}])
	// const [invoiceData, setInvoiceData] = useState([{_id: 0, invoiceNumber: 1}])
	const [openCol, setColOpen] = useState(false)
	const [openEditBoard, setEditBoard] = useState(false)

	const board = useSelector(state => state.board.board)
	const columns = useSelector(state => state.column.columns)
	const orders = useSelector(state => state.invoices.invoices)
	const order = useSelector(state => state.invoices.invoice)

	// const orders = useSelector(state => state.invoice.invoices))
	useEffect(() => {
    dispatch(getBoard(id));
  }, [dispatch]);

	useEffect(() => {
    dispatch(getColumns());
  }, [dispatch]);

	useEffect(() => {
    dispatch(getInvoices());
  }, [dispatch]);

	useEffect(() => {
		setColumnsData(columns)
		// setBoardData(board)
		setInvoicesData(orders)
		// setInvoiceData(order)
  }, [board, columns, orders, dispatch]);

	const handleEditCol= (column)=> {
		setColumnData(column)
		setColOpen((prev) => !prev)
  }
	const handleNewCol =()=> {
		setColumnData({id: null, label:'', board: id})
		setColOpen((prev) => !prev)
  }

	const handleEditBoard =()=> {
		setEditBoard((prev) => !prev)
  }


	const onDragEnd = (result) => {
		const { destination, source, draggableId } = result;
		// if the user drags and drops back in the same position
		console.log(result)
		if (
		destination.droppableId === source.droppableId &&
		destination.index === source.index
		) {
		return;
		}
		// // If the user moves from one column to another
		if(destination.droppableId !== source.droppableId) {
			dispatch(getInvoice(draggableId))
			// console.log(updateInvoice(draggableId,{...order, orderStatus: destination.droppableId}))
			dispatch(updateInvoice(draggableId,{...order, orderStatus: destination.droppableId}))
		}
	}
	// console.log(useSelector(state => state.invoices.invoice))
	 console.log(order)

  return (
    <>
		<AddColumn setOpen={setColOpen} open={openCol} boardId={id} column={columnData}/>
		<EditBoard setOpen={setEditBoard} open={openEditBoard} boardId={id} columns={columnsData} />
		<Button variant="contained" onClick={handleNewCol}>Create Column</Button>
		<Button variant="contained" onClick={handleEditBoard}>Edit Board</Button>
		<DragDropContext onDragEnd={onDragEnd}>
			<Box className='gridCo'>
			<Grid className='gridContainer' wrap='nowrap' container spacing={2}	>
				
				
				
				<Grid item xs>
					<Grid container className="kanbanColumn" minWidth={'30vh'} direction="column">
						<Grid item className="kanbanTitleContainer" xs={0} padding={'1rem'}>
							<Typography>New Task</Typography>
						</Grid>
						<Grid item className="droppableContainer" xs>
							<Droppable droppableId={'0'}>
								{(droppableProvided, droppableSnapshot) => (
									<Grid className="droppableGrid" key={'1'} {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
										{invoicesData.map((invoice, index) => {
											console.log(invoice.orderStatus)
											if(invoice.orderStatus >= 0 ) {
												// console.log(invoice)
												return (													
												<Draggable key={invoice._id} draggableId={invoice._id} index={index}>
													{(draggableProvided, draggableSnapshot) => (
														<div ref={draggableProvided.innerRef} {...draggableProvided.draggableProps} {...draggableProvided.dragHandleProps}>
															<DragCard data={invoice} />
														</div>
													)}
												</Draggable>
											)}
										})}
									</Grid>
									)}
							</Droppable>
						</Grid>
					</Grid>
				</Grid>
				
				{columnsData
					.sort((a, b) => a.id-b.id)
					.map((column,index) => {
						const order = invoicesData.filter((invoice) => {
							if(invoice.orderStatus === column._id) {
								return invoice._id
							}
						})
						if(id === column.board){
							return (
								<DragGrid column={column} order={order} index={index} handleEditCol={handleEditCol} />
							)
						}
				})}
			</Grid>
			</Box>
		</DragDropContext>
		</>
  )
}

export default Kanban