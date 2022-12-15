import React from 'react'
// import { Box, Container, Grid, Paper} from '@material-ui/core';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
// import Header from '../Header/Header';

const LayoutNav = ({children}) => {
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
            padding: "0rem 2rem",
            minHeight: '100vh'
            }}>
              <Navbar />
              {children}
          </Box>
          </Grid>
        </Grid>
      </Box>
    )
}

export default LayoutNav
