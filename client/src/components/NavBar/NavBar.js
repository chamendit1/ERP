import { Box, Divider, IconButton, List, Paper, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'


import DashboardIcon from '@mui/icons-material/Dashboard';
import NavigateBefore from '@mui/icons-material/NavigateBefore';

const NavBar = () => {

  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const [width, setWidth]= useState("15%")

  console.log(width)

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  function hanldeWidthChange() {
    // you can set width to any value you want
    setWidth("100px")
 }

    if(!user) return null


    return (
      <Box className='navbar'>
        <Box style={{
          listStyle: 'none',
          padding: '0',
          margin: '0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100vh',
          border: '1px solid black'
          }}>
          <Box component={Link} to="/" display="flex" alignItems="center" style={{height: '5rem'}}>
            <Typography sx={{ textDecoration: 'underline' }}>
              Enterprise
            </Typography>
          </Box>
          <Box component={Link} to="/dashboard" boxShadow={3} display="flex" alignItems="center" sx={{
            height: '3rem',
            backgroundColor: 'white',
            borderRadius: 5,
            padding: '1rem 1rem',
            marginTop: '1rem'
            }}>
              <DashboardIcon/>    
          </Box>
          <Box component={Link} to="/clients" boxShadow={3} display="flex" alignItems="center" sx={{
            height: '3rem',
            backgroundColor: 'white',
            borderRadius: 5,
            padding: '1rem 1rem',
            marginTop: '1rem'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </Box>
          <Box component={Link} to="/orders" boxShadow={3} display="flex" alignItems="center" sx={{
            height: '3rem',
            backgroundColor: 'white',
            borderRadius: 5,
            padding: '1rem 1rem',
            marginTop: '1rem'
            }}>            
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
          </Box>



          <Box component={Link} to="/orders" boxShadow={3} display="flex" alignItems="center" sx={{
            height: '3rem',
            backgroundColor: 'white',
            borderRadius: 5,
            padding: '1rem 1rem',
            marginTop: '1rem'
            }}>              
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
          </Box>
          <Box component={Link} to="/orders" boxShadow={3} display="flex" alignItems="center" sx={{
            height: '3rem',
            backgroundColor: 'white',
            borderRadius: 5,
            padding: '1rem 1rem',
            marginTop: '1rem'
            }}>              
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </Box>
        </Box>
      </Box>
    )
}

export default NavBar