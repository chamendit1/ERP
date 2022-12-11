import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Box } from '@mui/material';

import { getInvoices } from '../../actions/invoiceActions';
import OrderTable from './components/OrderTable';

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

  useEffect(() => {
      dispatch(getInvoices());
  }, [dispatch]);

  if(!user) {
    navigate('/login')
  }

  console.log(rows)

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