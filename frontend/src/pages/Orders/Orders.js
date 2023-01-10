import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Box } from '@mui/material';

import { getInvoices } from '../../actions/invoiceActions';
import OrderTable from './components/OrderTable';
import CircularProgress from '@mui/material/CircularProgress';
import { getBoards, updateBoard } from '../../actions/board';

const headCells = [
  // {
  //   id: 'ID',
  //   numeric: false,
  //   label: 'ID',
  // },
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
  // {
  //   label: 'Edit',
  // },
  // {
  //   label: 'Delete',
  // },
];

const Orders = () => {
    
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('profile'))
  const rows = useSelector(state => state.invoices.invoices)
  const isLoading = useSelector(state => state.invoices.isLoading)
  const boards = useSelector(state => state.board.boards)

  console.log(boards)

  useEffect(() => {
      dispatch(getInvoices());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getBoards());
  }, []);

  if(!user) {
    navigate('/login')
  }
  console.log(rows)

  if(isLoading) {
    return  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px'}}>
        <CircularProgress />
      </div>
  }

  return (
    <>
      <OrderTable 
        rows={rows}
        head={headCells}
        boards={boards}
      />
    </>
  );
}

export default Orders