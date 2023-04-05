import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Box } from '@mui/material';

import { getInvoices } from '../../actions/invoiceActions';
import OrderTablee from './components/OrderTable';
import CircularProgress from '@mui/material/CircularProgress';

const headCells = [

  {
    id: 'Date',
    numeric: true,
    label: 'Date',
  },
  {
    id: 'status',
    numeric: true,
    label: 'Status',
  },
  {
    id: 'name',
    numeric: false,
    label: 'Customer',
  },
  {
    id: 'due',
    numeric: true,
    label: 'Due Date',
  },
  {
    id: 'amount',
    numeric: true,
    label: 'Amount',
  },
];

const Orders = () => {
    
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('profile'))
  // const [boardsData, setBoardsData] = useState([]) 

  const rows = useSelector(state => state.invoices.invoices)
  const isLoading = useSelector(state => state.invoices.isLoading)
  // const boards = useSelector(state => state.board.boards)

  // console.log(boards)

  useEffect(() => {
      dispatch(getInvoices());
  }, [dispatch]);

  // useEffect(() => {
  //   setBoardsData(boards)
  // }, [boards]);
  
  // useEffect(() => {
  //   dispatch(getBoards());
  // }, []);
  console.log(rows)
  if(!user) {
    navigate('/login')
  }

  // if(isLoading) {
  //   return  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px'}}>
  //       <CircularProgress />
  //     </div>
  // }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        
        <OrderTablee 
          rows={rows}
          head={headCells}
          // boards={boardsData}
        />
      </Box>
    </>
  );
}

export default Orders