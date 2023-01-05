import { Box, Typography, Grid, Button, MenuItem, Menu, MenuList, Tooltip, IconButton, Avatar, SwipeableDrawer, Drawer, Icon } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ArticleIcon from '@mui/icons-material/Article';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import '../../css/sidebar.css'
import ReceiptIcon from '@mui/icons-material/Receipt';
// import Receipt from '@mui/icons-material/Receipt';
import { useDispatch } from 'react-redux'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';



const Sidebar = (props) => {
  const {openDrawer, handleDrawerClose} = props;
  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const logout =() => {
    dispatch({ type: 'LOGOUT' })
    navigate('/')
    setUser(null)
  }  

  const openLink =(link) => {
    navigate(`/${link}`)
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if(!user) return null

  const iconsize = 'small'

    const Data = () => (
        <Box className='sidebar' boxShadow={1} >
          <Box style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}>

            <Box className='sidebar-data' component={Link} to="/Dashboard">
              <Grid container justifyContent="center" alignItems='center'>
                <Grid item className='sidebar-logo'>
                  <DashboardIcon fontSize={iconsize}/>
                </Grid>
                  <p className='sidebar-text'>Dashboard</p>
              </Grid>
            </Box>
            <Box className='sidebar-data' component={Link} to="/CRM">
              <Grid container justifyContent="center" alignItems='center'>
                <Grid item xs={12} className='sidebar-logo' >
                    <PeopleAltIcon fontSize={iconsize}/>
                </Grid>
                  <p className='sidebar-text'>CRM</p>
              </Grid>
            </Box>
            <Box className='sidebar-data' component={Link} to="/Admin">
              <Grid container justifyContent="center" alignItems='center'>
                <Grid item className='sidebar-logo' >
                    <PeopleAltIcon fontSize={iconsize}/>
                </Grid>
                  <p className='sidebar-text'>Admin</p>
              </Grid>
            </Box>

            <Box>
              {/* <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} >
                  <MenuItem onClick={() => openLink('settings') }>{(user?.result?.name).split(" ")[0]}</MenuItem>
                  <MenuItem onClick={()=> logout()} >Logout</MenuItem>
                </MenuList>
              </Menu> */}
            </Box>
          </Box>
        </Box>
    )


    
    console.log(openDrawer)
    return (
      <>
      {/* <Grid item xs={1} display={openDrawer.display}> */}
        <SwipeableDrawer
          open={openDrawer.open}
          onClose={handleDrawerClose}
          // onOpen={toggleDrawer(anchor, true)}
        >
          <Data/>
        </SwipeableDrawer>
        <Data/>
        {/* </Grid> */}
      </>
    )
}

export default Sidebar