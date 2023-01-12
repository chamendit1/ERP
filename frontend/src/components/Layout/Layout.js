import React, { useState, useEffect } from 'react'
// import { Box, Container, Grid, Paper} from '@material-ui/core';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Navbar from '../Navbar'
import Sidebar from '../Sidebar/Sidebar'
import SubNav from '../SubNav';
import { Button } from '@mui/material';
// import Header from '../Header/Header';

const Layout = ({children}) => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const [openDrawer, setOpenDrawer] = useState({open: false, display: 'none'});
  // const [size, setSize]= useState(12);
  
  const handleDrawer = () => {
    setOpenDrawer({open: true, display: ''})
  }

  const handleDrawerClose = () => {
    setOpenDrawer({open: false, display: 'none'})
  }

    return (
      <>
        <Navbar />
        <Grid container>
          { user && <Sidebar openDrawer={openDrawer} onClose={handleDrawerClose} onOpen={handleDrawer}/>}
          <Grid item xs={12} style={{
            padding: "1rem 2rem",
            maxHeight: '100vh',
            // border: '1px solid black'
            }}>
            {user && <SubNav handleDrawer={handleDrawer} />} 
            <Box>
              {children}
            </Box> 
          </Grid>
        </Grid>
      </>
    )
}

export default Layout
