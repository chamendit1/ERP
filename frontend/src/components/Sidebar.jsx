import { Box, Typography, Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'


import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ArticleIcon from '@mui/icons-material/Article';

const Sidebar = () => {

  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])
  
//   const [width, setWidth]= useState("15%")
//   function hanldeWidthChange() {
//     // you can set width to any value you want
//     setWidth("100px")
//  }

    if(!user) return null


    return (
      <Box className='sidebar' boxShadow={3} >
        <Box style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100vh'
          }}>
          <Box component={Link} to="/" display="flex" alignItems="center" style={{marginTop: '1.3rem' ,height: '5rem', textDecoration: 'none'}}>
            <Typography variant='h5' fontWeight='bold'>
              ERP
            </Typography>
          </Box>

          <Box className='sidebar-data' component={Link} to="/dashboard">
            <Grid container justifyContent="center" alignItems='center'>
              <Box className='sidebar-logo'>
                  <DashboardIcon fontSize="large"/>
              </Box>
              <Typography className='sidebar-text'>Dashboard</Typography>
            </Grid>
          </Box>

          <Box className='sidebar-data' component={Link} to="/client-list">
            <Grid container justifyContent="center" alignItems='center'>
              <Box className='sidebar-logo' >
                  <PeopleAltIcon fontSize="large"/>
              </Box>
              <Typography className='sidebar-text'>Clients</Typography>
            </Grid>
          </Box>

          <Box className='sidebar-data' component={Link} to="/order-list">
            <Grid container justifyContent="center" alignItems='center'>
              <Box className='sidebar-logo'>
                <ArticleIcon fontSize="large"/>
              </Box>
              <Typography className='sidebar-text'>Orders</Typography>
            </Grid>
          </Box>

          
          

          {/* <Box component={Link} to="/orders"  display="flex" alignItems="center" sx={{
            backgroundColor: 'white',
            borderRadius: 5,
            padding: '1rem 1rem',
            marginTop: '1rem'
            }}>              
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
          </Box>
          <Box component={Link} to="/orders"  display="flex" alignItems="center" sx={{
            backgroundColor: 'white',
            borderRadius: 5,
            padding: '1rem 1rem',
            marginTop: '1rem'
            }}>              
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </Box> */}
        </Box>
      </Box>
    )
}

export default Sidebar