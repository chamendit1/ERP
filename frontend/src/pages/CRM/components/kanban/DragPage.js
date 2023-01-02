import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import DragGrids from './DragGrids';
import { Card, Grid, Box, Avatar, Typography } from '@mui/material'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { updateInvoice } from '../../../../actions/invoiceActions';
import { getInvoices } from '../../../../actions/invoiceActions';


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

const initialData = {
  tasks: [0,1,2],
  columns: {
    "0": {
      id: "0",
      title: "Progress",
      taskIds: [],
    },
    "1": {
      id: "1",
      title: "Manufacturing Order",
      taskIds: [],
    },
    "2": {
      id: "2",
      title: "Delivery",
      taskIds: [],
    },
    "3": {
      id: "3",
      title: "Order Delivered",
      taskIds: [],
    },
    "4": {
      id: "4",
      title: "Tagih",
      taskIds: [],
    },
  },
  columnOrder: ["0", "1", "2", "3", "4"],
};


const DragPage = (  ) => {
  const [state, setState] = useState(initialData);
  const dat = useSelector(state => state.invoices.invoices)
  const dispatch = useDispatch()

  
  useEffect(() => {
    dispatch(getInvoices());
  }, [dispatch]);

  useEffect(() => { 
      state.tasks = []
      state.tasks = dat
    // })
  }, [dat, dispatch, state]);
  // console.log(state)

  useEffect(() => { 
    state.columnOrder.map((columnId) => {
      state.columns[columnId].taskIds = []
      dat.map((dt)=> {
        let id = parseInt(columnId) 
        if(dt.orderStatus === id) {
          state.columns[id].taskIds.push(dt._id)
        }
      })
    })
  }, [dat]);

  

  const onDragEnd = (result) => {
    const { destination, source } = result;

    // If user tries to drop in an unknown destination
    if (!destination) return;

    // if the user drags and drops back in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If the user drops within the same column but in a different positoin
    const sourceCol = state.columns[source.droppableId];
    const destinationCol = state.columns[destination.droppableId]
  
    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );
  
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }
  
    // If the user moves from one column to another
    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };
    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);

    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };
  
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };
    let id = removed
    let oldorderStatus = sourceCol.id
    let news = destinationCol.id
    // console.log(result)

      // setOrderStatus(destinationCol.id)
      // setOrderId(id)
      setState(newState);
      dispatch(updateInvoice(id, { orderStatus: news } ));
    };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container spacing={2} display={'flex'} >
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId]
          const length = state.tasks.length
          console.log(state.columns[columnId])
          const tasks = column.taskIds.map((taskId) => 
          {
            for (let i = 0; i < length; i++) { 
            if(state.tasks[i]._id === taskId) {
              return state.tasks[i]
            }
           }
          }
          );

          return <DragGrids key={column.id} column={column} tasks={tasks} />;
        })}
      </Grid>
    </DragDropContext>
  )
}

export default DragPage