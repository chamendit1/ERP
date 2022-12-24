import { Box, Typography, Grid, Button, MenuItem, Menu, MenuList } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ArticleIcon from '@mui/icons-material/Article';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

import ReceiptIcon from '@mui/icons-material/Receipt';
// import Receipt from '@mui/icons-material/Receipt';

const Sidebar = () => {

  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNav = (e) => {
    navigate(`/crm/${e.target.id}`)
  };
  
  const handleNavClientList = () => {
    navigate('/crm/client-list')
  };
  const handleNavOrderList = () => {
    navigate('/crm/order-list')
  };
  const handleNavPipeline = () => {
    navigate('/crm')
  };

    if(!user) return null


    return (
      <Box className='sidebar' boxShadow={3} >
        <Box style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          }}>
          {/* <Box component={Link} to="/" display="flex" alignItems="center" style={{marginTop: '1.3rem' ,height: '5rem', textDecoration: 'none'}}>
            <Grid alignItems='center' style={{ display: 'inline-flex'}}>
              <DashboardIcon fontSize="large"/>
              <Typography variant='h6'>Dashboard</Typography>
            </Grid>
          </Box> */}

          <Box>
            <Button className='sidebar-data'>
            <Grid container justifyContent="center" alignItems='center'>
              <Box className='sidebar-logo'>
                  <DashboardIcon fontSize="large"/>
              </Box>
              <Typography className='sidebar-text'>Dashboard</Typography>
            </Grid>
            </Button>
          </Box>

          <Box>
            <Button className='sidebar-data' onClick={handleClick}>
            <Grid container justifyContent="center" alignItems='center'>
              <Box className='sidebar-logo' >
                  <PeopleAltIcon fontSize="large"/>
              </Box>
              <Typography className='sidebar-text'>CRM</Typography>
            </Grid>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem id='pipeline' onClick={handleNav}>Pipeline</MenuItem>
              <MenuItem id='client-list' onClick={handleNav}>Customers</MenuItem>
              {/* <MenuItem onClick={handleNavClientList}>Quotations</MenuItem> */}
              <MenuItem id='order-list' onClick={handleNav}>Orders</MenuItem>
            </Menu>
          </Box>

          <Box className='sidebar-data' component={Link} to="/admin">
            <Grid container justifyContent="center" alignItems='center'>
              <Box className='sidebar-logo' >
                  <PeopleAltIcon fontSize="large"/>
              </Box>
              <Typography className='sidebar-text'>ADMIN</Typography>
            </Grid>
          </Box>

          {/* <Box className='sidebar-data' component={Link} to="/order-list">
            <Grid container justifyContent="center" alignItems='center'>
              <Box className='sidebar-logo'>
                <ArticleIcon fontSize="large"/>
              </Box>
              <Typography className='sidebar-text'>Orders</Typography>
            </Grid>
          </Box> */}

          <Box className='sidebar-data' component={Link} to="/Accounting">
            <Grid container justifyContent="center" alignItems='center'>
              <Box className='sidebar-logo'>
                <AccountBalanceWalletIcon fontSize="large"/>
              </Box>
              <Typography className='sidebar-text'>Accounting</Typography>
            </Grid>
          </Box>

          <Box className='sidebar-data' component={Link} to="/Purchasing">
            <Grid container justifyContent="center" alignItems='center'>
              <Box className='sidebar-logo'>
                <ShoppingBagIcon fontSize="large" />
              </Box>
              <Typography className='sidebar-text'>Purchasing</Typography>
            </Grid>
          </Box>
          
          <Box className='sidebar-data' component={Link} to="/Sales">
            <Grid container justifyContent="center" alignItems='center'>
              <Box className='sidebar-logo'>
                <ReceiptIcon fontSize="large"/>
              </Box>
              <Typography className='sidebar-text'>Sales</Typography>
            </Grid>
          </Box>
        
        </Box>
      </Box>
    )
}

export default Sidebar