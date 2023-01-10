import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getInvoices } from '../../actions/invoiceActions';
import './Dashboard.css'

// import Kanban from './Kanban'

const Dashboard = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('profile'))
  const rows = useSelector(state => state.invoices.invoices)
  const isLoading = useSelector(state => state.invoices.isLoading)

  useEffect(() => {
      dispatch(getInvoices());
  }, [dispatch]);

  if(!user) {
    navigate('/login')
  }

  const data = [
    {
      id: 0,
    }
  ]

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container className='DashboardMain' spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 6, md: 12 }} >
        
        {Array.from(Array(4)).map((_, index) => (
          <Grid className="items" item xs={2} sm={6} md={6} key={index}>
            <Box className='data'>
              
            </Box>
          </Grid>
        ))}

      </Grid>
    </Box>
    </>
  )
}

export default Dashboard