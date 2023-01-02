import React from 'react'
// import { Box, Container, Grid, Paper} from '@material-ui/core';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import SubNav from '../SubNav';
// import Header from '../Header/Header';

const Layout = ({children}) => {
  const user = JSON.parse(localStorage.getItem('profile'))
    return (
      <>
        <Navbar />
        <Grid container>
          <Grid item>
            {user && <Sidebar/>}
          </Grid>

          <Grid item xs style={{
              padding: "0rem 2rem",
              maxHeight: '100vh',
              overflow: 'scroll',
              overflowY: 'hidden',
              }}>
                <SubNav/>
                {children}
          </Grid>
        </Grid>
      </>
    )
}

export default Layout
