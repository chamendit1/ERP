import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Box } from '@material-ui/core';

import { getInvoices } from '../../actions/invoiceActions';
import OrderTable from '../../components/Table/OrderTable';


const Orders = () => {
    
  const dispatch = useDispatch()
  const history = useHistory()
  const user = JSON.parse(localStorage.getItem('profile'))
  const rows = useSelector(state => state.invoices.invoices)

  useEffect(() => {
      dispatch(getInvoices());
  }, [dispatch]);

  if(!user) {
    history.push('/login')
  }

  return (
    <Box py={3}>
    <Box mb={3}>
      <OrderTable data={rows}/>
    </Box>
  </Box>
  );
}

export default Orders