import { Box, Button, Typography, Divider } from '@mui/material';
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getInvoices } from '../../../../actions/invoiceActions';

import DragPage from './DragPage';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Kanban = () => {

  // const dispatch = useDispatch()
  // const navigate = useNavigate()
  // const user = JSON.parse(localStorage.getItem('profile'))
  // // const rows = useSelector(state => state.invoices.invoices)
  // const isLoading = useSelector(state => state.invoices.isLoading)

  // useEffect(() => {
  //     dispatch(getInvoices());
  // }, [dispatch]);

  // if(!user) {
  //   navigate('/login')
  // }
  // console.log(useSelector(state => state))

  return (
    <Box className='container'>
      <Divider/>
      <Box className='bar'>
        <Button variant="contained" startIcon={<AddCircleOutlineIcon />}>              
          <Typography>New Order</Typography>
        </Button>
      </Box>
      <Box className='box'>
        <Box className='kanban'>
          <DragPage />
        </Box>
      </Box>



    </Box>
  )
}

export default Kanban