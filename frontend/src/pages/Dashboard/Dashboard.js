import { Grid, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getInvoices } from '../../actions/invoiceActions';
import { Typography } from '@mui/material';
import './Dashboard.css'
import AddDashboard from './components/AddDashboard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import Clients from '../Clients/Clients';
import Orders from '../Orders/Orders'
const Dashboard = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('profile'))
  const invoices = useSelector(state => state.invoices.invoices)
  const isLoading = useSelector(state => state.invoices.isLoading)
  const [open, setOpen] = useState(false)

  useEffect(() => {
      dispatch(getInvoices());
  }, [dispatch]);

  if(!user) {
    navigate('/login')
  }

  const rows = [
    {
      id: 0,
      data: <Clients/>,
      size: {xs:2,sm:6,md:6}
    },
    {
      id: 0,
      data: <Orders/>,
      size: {xs:2,sm:6,md:6}
    },
  ]

  // console.log()

  return (
    <>
    {/* <AddDashboard setOpen={setOpen} open={open}/>  */}
    {/* <IconButton onClick={() => setOpen((prev) => !prev) }>
      <AddCircleOutlineIcon />
    </IconButton> */}
    <Box sx={{ flexGrow: 1 }}>
      <Grid container className='DashboardMain' 
        spacing={{ xs: 2, md: 3 }} 
        columns={{ xs: 2, sm: 6, md: 12 }} >
        {rows.map((row, index) => (
          <Grid className="items" item xs={row.size.xs} sm={row.size.sm} md={row.size.md} key={index}>
            <Box className='data'>
              {row.data}
            </Box>
          </Grid>
        ))}

      </Grid>
    </Box>
    </>
  )
}

export default Dashboard        
