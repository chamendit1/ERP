import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import DragGrids from './DragGrids';
import { Card, Grid, Box, Avatar, Typography } from '@mui/material'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { getInvoice, updateInvoice } from '../../../../actions/invoiceActions';
import { getInvoices } from '../../../../actions/invoiceActions';
import { KanbanColumn, Task }from '../../../../Data'
import { getBoards, createBoard, updateBoard, getBoard} from '../../../../actions/board'
import { getColumns } from '../../../../actions/column';


const reorderColumnList = (sourceCol, startIndex, endIndex) => {
  const newTaskIds = Array.from(sourceCol.taskIds);
  const [removed] = newTaskIds.splice(startIndex, 1);
  newTaskIds.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    taskIds: newTaskIds,
  };

  return newColumn;
};



const DragPage = () => {
  // const { column } = props
  const [boardState, setBoardState] = useState([{taskId: [1]}]);
  const [columnState, setColumnState] = useState([{taskId: [1]}]);
  const [dataState, setDataState] = useState([{_id: 0, invoiceNumber: 1}, {_id: 1, invoiceNumber: 2}]);
  
  const data = useSelector(state => state.invoices.invoices)
  const rows = useSelector(state => state.column.columns)
  const column = useSelector(state => state.column.column)
  console.log(useSelector(state => state))

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getInvoices());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getColumns());
  }, [dispatch]);

  useEffect(() => {
    if(rows !== undefined) {
      setColumnState(rows)
    }
  }, [rows]);
  useEffect(() => {
    if(data !== undefined && data.length !== 0) {
      // console.log(dat)
      setDataState(data)
    }
  }, [data]);

  
  // console.log(useSelector(state => state))
  // console.log(dataState)





  const onDragEnd = (result) => {
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
      dispatch(updateInvoice(draggableId,{...column, orderStatus: destination.droppableId}))
      
    }
  
    // dispatch(updateBoard(destination.droppableId, {...rows[0], taskId: [...rows[0].taskId, draggableId]}))

    // // If the user moves from one column to another
    // dispatch(updateBoard(destination.droppableId, {...boards[0], taskId: [...boards[0].taskId, invoiceData.invoiceNumber]}))
 

    // const sourceCol = state.columns[source.droppableId];
    // const destinationCol = state.columns[destination.droppableId]
    // const startTaskIds = Array.from(sourceCol.taskIds);
    // const [removed] = startTaskIds.splice(source.index, 1);
    // // If user tries to drop in an unknown destination
    // if (!destination) return;



    // // If the user drops within the same column but in a different positoin
    // const sourceCol = state.columns[source.droppableId];
    // const destinationCol = state.columns[destination.droppableId]
  
    if (source.droppableId === destination.droppableId) {
      // const newColumn = reorderColumnList(
      //   sourceCol,
      //   source.index,
      //   destination.index
      // );
  
      // const newState = {
      //   ...state,
      //   columns: {
      //     ...state.columns,
      //     [newColumn.id]: newColumn,
      //   },
      // };
      // setState(newState);
      // return;
    }
  
    // // If the user moves from one column to another
    // const startTaskIds = Array.from(sourceCol.taskIds);
    // const [removed] = startTaskIds.splice(source.index, 1);
    // const newStartCol = {
    //   ...sourceCol,
    //   taskIds: startTaskIds,
    // };
    // const endTaskIds = Array.from(destinationCol.taskIds);
    // endTaskIds.splice(destination.index, 0, removed);

    // const newEndCol = {
    //   ...destinationCol,
    //   taskIds: endTaskIds,
    // };
  
    // const newState = {
    //   ...state,
    //   columns: {
    //     ...state.columns,
    //     [newStartCol.id]: newStartCol,
    //     [newEndCol.id]: newEndCol,
    //   },
    // };
    // let id = removed
    // let oldorderStatus = sourceCol.id
    // let news = destinationCol.id
    //   setState(newState);
    //   dispatch(updateInvoice(id, { orderStatus: news } ));
    };
    // console.log(state)

  return (
    <DragDropContext  onDragEnd={onDragEnd}>
      <Box className='gridCo'>
      <Grid className='gridContainer' container spacing={6}>
        {columnState.map((columnId) => {
          const column = columnId

          // const taskz = columns.taskId.map((data) => {
          //   const task = dataState.filter((task) => {
          //     if (task.invoiceNumber === data )
          //     return task
          //   })
          //   return task
          // });

          const taskz = dataState.filter((data) => {
            // console.log(data.orderStatus)
            // console.log(columns.id)

            if(data.orderStatus === String(column.id)){
              return data
            } 
          })

          // console.log(taskz)
          // console.log(dataState)
          // console.log(column)

          return <DragGrids key={boardState._id} column={column} tasks={taskz} />;

        })}
      </Grid>
      </Box>
    </DragDropContext>
  )
}

export default DragPage