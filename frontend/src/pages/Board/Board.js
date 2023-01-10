import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'
import { getBoard } from '../../actions/board'
import { Box, Button, Typography, Divider, Grid } from '@mui/material';
import { createColumn, getColumns } from '../../actions/column';
import { getInvoice, getInvoices, updateInvoice } from '../../actions/invoiceActions';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


const Board = () => {
  const { id } = useParams()
	const dispatch = useDispatch()

  const [boardData, setBoardData] = useState({ id: '0', label:'Main Board'})
	const [columnData, setColumnData] = useState({ id: '0', label:'col 1', board: id})
	const [columnsData, setColumnsData] = useState([])
	const [invoicesData, setInvoicesData] = useState([{_id: 0, invoiceNumber: 1}])
	const [invoiceData, setInvoiceData] = useState([{_id: 0, invoiceNumber: 1}])

	const board = useSelector(state => state.board.board)
	const columns = useSelector(state => state.column.columns)
	const orders = useSelector(state => state.invoices.invoices)
	const order = useSelector(state => state.invoices.invoice)
	console.log(invoiceData)
	// console.log(useSelector(state => state.invoices.invoices))
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
		if(columns !== undefined && columns !== []) {
			setColumnsData(columns)
		}
		setBoardData(board)
		if(orders !== undefined && orders.length !== 0) {
			setInvoicesData(orders)
		}
		if(order !== undefined && order.length !== 0) {
			setInvoiceData(order)
		}
  }, [board, columns,orders]);


	const handleSubmit =(e)=> {
    e.preventDefault()
      dispatch(createColumn(columnData))
  }

	const DragCard = ({data}) => {
		// console.log(data)
		return (
			<Box className='dragCard' >
				{/* <Typography>{data.title}</Typography> */}
				<Typography># {data.invoiceNumber}</Typography>
				<Typography>{data._id}</Typography>
				<Typography>Status: {data.orderStatus}</Typography>
				<Typography>{data.status}</Typography>
				<Typography>${data.total}</Typography>
			</Box>
		)
	}


	const onDragEnd = (result) => {
		console.log(result)
		const { destination, source, draggableId } = result;
    // if the user drags and drops back in the same position
    // console.log(result)
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // // If the user moves from one column to another
    if(destination.droppableId !== source.droppableId) {
      dispatch(getInvoice(draggableId))
      dispatch(updateInvoice(draggableId,{...order, orderStatus: destination.droppableId}))
      
    }

	}

	// console.log(invoiceData)

  return (
    <>
			<Button variant="contained" onClick={handleSubmit}>Create Column</Button>

			<DragDropContext  onDragEnd={onDragEnd}>
			
			
			<Grid container>

				<Grid item>
					<Grid container>
						<Grid item xs={12}>
							<Typography>Main</Typography>
						</Grid>
						<Grid item xs={12}>
							<Droppable droppableId={String('main')}>
											{(droppableProvided, droppableSnapshot) => (
												<Grid className="droppableGrid"  {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
													{invoicesData.map((invoice, index) => {
														if(invoice.orderStatus === '0') {
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



				{columnsData.map((column,index) => {
					const order = invoicesData.filter((invoice) => {
						if(invoice.orderStatus === String(column._id)) {
							return invoice._id
						}
					})

					if(id === column.board){
						return (
							<Grid item xs key={index} style={{border: '1px solid black'}}>
								<Grid container>
									<Grid item xs={12}>
										<Typography>Title: {column._id} {column.label}</Typography>
									</Grid>

									<Grid item xs={12}>
										<Droppable droppableId={String(column._id)}>
										{(droppableProvided, droppableSnapshot) => (
											<Grid className="droppableGrid"  {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
												{order.map((invoice) => (
													// console.log(invoice._id)
													<Draggable key={invoice._id} draggableId={invoice._id} index={index}>
														{(draggableProvided, draggableSnapshot) => (
															<div ref={draggableProvided.innerRef} {...draggableProvided.draggableProps} {...draggableProvided.dragHandleProps}>
																<DragCard data={invoice} />
															</div>
														)}
													</Draggable>
												))}
											</Grid>
									)}
										</Droppable>
									</Grid>
								</Grid>
								{/* <Button variant="contained">Create Task</Button> */}
							</Grid>
						)
					}
				})}
			</Grid>
			</DragDropContext>
		</>
  )
}

export default Board

// {tasks.map((task, index) => {
// 	return (
// 		<Draggable key={task._id} draggableId={task._id} index={index}>
// 			{(draggableProvided, draggableSnapshot) => (
// 				<div ref={draggableProvided.innerRef} {...draggableProvided.draggableProps} {...draggableProvided.dragHandleProps}>
// 						{/* <DragCard data={task} /> */}
// 				</div>
// 			)}
// 		</Draggable>
// 	);
// })}

// if(invoice.orderStatus === column._id) {
// 	return invoice._id
// }