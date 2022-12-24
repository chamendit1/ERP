import React from 'react'
// import { Box, Container, Grid, Paper} from '@material-ui/core';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
// import Header from '../Header/Header';

const Layout = ({children}) => {
  const user = JSON.parse(localStorage.getItem('profile'))
    return (
      <>
        <Navbar />
        <Grid container>
          <Grid item border={'1px solid black'}>
            {user && <Sidebar/>}
          </Grid>
          <Grid item xs>
          <Box style={{
            padding: "0rem 2rem",
            minHeight: '100vh'
            }}>
              {children}
          </Box>
          </Grid>
        </Grid>
      </>
    )
}

export default Layout
