import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Box } from '@mui/material';

import { getInvoices } from '../../actions/invoiceActions';
import OrderTable from './components/OrderTable';
import CircularProgress from '@mui/material/CircularProgress';
// import { getColumn, getColumns } from '../../actions/column';
import { getColumn, getColumns } from '../../actions/column';

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
  // const { client }= useSelector(state => state.clients)
  const [orderStatus, setOrderStatus ] = useState(0)
  const rows = useSelector(state => state.invoices.invoices)
  const columns = useSelector(state => state.column.columns)

  useEffect(() => {
    dispatch(getColumns());
  }, [dispatch]);

  useEffect(() => {
      dispatch(getInvoices());
  }, [dispatch]);

  // console.log(useSelector(state => state.invoices))



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
        
        <OrderTable
          rows={rows}
          columns={columns}
          head={headCells}
        />
      </Box>
    </>
  );
}

export default Orders

  // const boards = useSelector(state => state.board.boards)
  // const [boardsData, setBoardsData] = useState([]) 

  // console.log(boards)

    // useEffect(() => {
  //   setBoardsData(boards)
  // }, [boards]);
  
  // useEffect(() => {
  //   dispatch(getBoards());
  // }, []);
  // console.log(rows)