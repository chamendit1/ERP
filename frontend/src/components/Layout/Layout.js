import React, { useState, useEffect } from 'react'
// import { Box, Container, Grid, Paper} from '@material-ui/core';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Navbar from '../Navbar'
import Sidebar from '../Sidebar/Sidebar'
import SubNav from '../SubNav';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Dashboard from '@mui/icons-material/Dashboard';
import PeopleAlt from '@mui/icons-material/PeopleAlt';
// import Header from '../Header/Header';

const Layout = ({children}) => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const [openDrawer, setOpenDrawer] = useState({open: false, display: 'none'});
  // const [size, setSize]= useState(12);
  // console.log(user)
  const handleDrawer = () => {
    setOpenDrawer({open: true, display: ''})
  }

  const handleDrawerClose = () => {
    setOpenDrawer({open: false, display: 'none'})
  }
  const iconsize = 'small'

  

    return (
      <>
        <Grid container>

          { user && <Sidebar openDrawer={openDrawer} onClose={handleDrawerClose} onOpen={handleDrawer}/>}
          
          <Grid item xs={12} sm={12} md={12} style={{
            padding: "1rem 2rem",
            maxHeight: '100vh',
            minHeight: '1000px',
            minWidth: '400px',
            border: '1px solid black'
            }}>
            <Box height={'5%'}><SubNav handleDrawer={handleDrawer} /></Box>
            <Box marginTop={'5%'} height={'90%'}>{children}</Box> 
          </Grid>

 
        </Grid>
      </>
    )
}

export default Layout
