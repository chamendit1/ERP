import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Box } from '@mui/material';

import { getInvoices } from '../../actions/invoiceActions';
import OrderTable from './components/OrderTable';

const headCells = [

  {
    id: 'name',
    numeric: false,
    label: 'Name',
  },
  {
    id: 'email',
    numeric: false,
    label: 'Email',
  },
  {
    id: 'amount',
    numeric: true,
    label: 'Amount',
  },
  {
    id: 'due',
    numeric: true,
    label: 'Due Date',
  },
  {
    id: 'status',
    numeric: true,
    label: 'Status',
  },
  {
    label: 'Edit',
  },
  {
    label: 'Delete',
  },
];

const Orders = () => {
    
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('profile'))
  const rows = useSelector(state => state.invoices.invoices)

  useEffect(() => {
      dispatch(getInvoices());
  }, [dispatch]);

  if(!user) {
    navigate('/login')
  }

  return (
    <>
      <OrderTable 
        rows={rows}
        head={headCells}
      />
    </>
  );
}

export default Orders