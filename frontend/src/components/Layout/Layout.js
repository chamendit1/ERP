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
      <Box>
        <Grid container>
          <Grid item>
            <Box>
                {user && <Sidebar/>}
            </Box>
          </Grid>
          <Grid item xs>
          <Box style={{
            padding: "2rem 2rem",
            minHeight: '100vh'
            }}>
              <Navbar/>
              <Box py={3}>
                <Box mb={3}>
                  {children}
                </Box>
              </Box>
          </Box>
          </Grid>
        </Grid>
      </Box>
    )
}

export default Layout
