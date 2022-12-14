import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import DragGrids from './components/DragGrids';
import { Card, Grid, Box, Avatar, Typography } from '@mui/material'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { updateInvoice, getInvoice } from '../../actions/invoiceActions';

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

const sizes ={
  xsm: 3,
  sm: 4,
  med: 6,
  lar: 8,
  xlr: 12
}


const initialData = {
  tasks: {
    1: { id: 1, content: "dwq" },
    2: { id: 2, content: "Configure Next.js and tailwind " },
    3: { id: 3, content: "Create sidebar navigation menu" },
    4: { id: 4, content: "Create page footer" },
    5: { id: 5, content: "Create page navigation menu" },
    6: { id: 6, content: "Create page layout" },
    data: [ 
      {id: 0, orderStatus: 1, content: "Create page layout"}, 
      {id: 1, orderStatus: 2, content: "Create page layout"}, 
      {id: 2, orderStatus: 3, content: "Create page layout"},
    ]
  },
  columns: {
    "0": {
      id: "0",
      title: "Progress",
      taskIds: [],
    },
    "1": {
      id: "1",
      title: "Making",
      taskIds: [],
    },
    "2": {
      id: "2",
      title: "Deliv",
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ["0", "1", "2"],
};


const Dashboard = ( dat ) => {
  const [state, setState] = useState(initialData);
  // const { order } = useSelector((state) => state.invoices)
  // const [orderStatus, setOrderStatus ] = useState('')
  // const [orderId, setOrderId ] = useState('')
  // const [invoiceData, setInvoiceData] = useState('')
  const dispatch = useDispatch()

  // console.log(orderId)
  // console.log(orderStatus)

  // const dispatch = useDispatch()
  
  // useEffect(() => { 
    
  // }, [orderId]);
//   console.log(useSelector((state) => state.invoices))
//   useEffect(() => {
//     if(order) {
//       setInvoiceData(order)
//       setOrderStatus(order.orderStatus)
//     }
// }, [order])
// console.log(order)
// console.log(invoiceData)

  useEffect(() => { 
    state.columnOrder.map((columnId) => {
      dat.data.map((dt)=> {
        let id = parseInt(columnId) 
        if(dt.orderStatus === id) {
          state.columns[id].taskIds.push(dt._id)
          loadData(dat)
        }
      })
    })
    // setOrderStatus(order.orderStatus)
  }, [dispatch, dat]);



  const loadData = (dat) => {
    const data = dat.data
    const newState = {
      ...state,
      tasks: {
        ...state.tasks,
        data
      },
    };
    setState(newState)
  }



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
      <Grid container spacing={0} >
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId]
          const length = state.tasks.data.length
          const tasks = column.taskIds.map((taskId) => 

          {
            for (let i = 0; i < length; i++) { 
            if(state.tasks.data[i]._id === taskId) {
              return state.tasks.data[i]
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

export default Dashboard