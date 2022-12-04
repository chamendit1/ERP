import React from 'react'
import { Box, Container, Grid, Paper} from '@material-ui/core';
import NavBar from '../NavBar/NavBar';
import Header from '../Header/Header';

const Layout = ({children}) => {
  const user = JSON.parse(localStorage.getItem('profile'))
    return (
      <Box>
        <Grid container>
          <Grid item>
            <Box>
              {user && <NavBar />}
            </Box>
          </Grid>
          <Grid item xs>
          <Box style={{
            padding: "2rem 2rem",
            minHeight: '100vh'
            }}>
              <Header/>
              {children}
          </Box>
          </Grid>
        </Grid>
      </Box>
    )
}

export default Layout
