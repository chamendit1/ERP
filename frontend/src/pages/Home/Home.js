import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'


const Home = () => {

  const navigate = useNavigate()

  return (
    <>
    <Grid container sx={{ height: '100%' }}>
      <Grid item xs={12} 
        display={'flex'} 
        alignItems={'center'} 
        justifyContent={'space-between'} 
        // border={'1px solid black'}
        >
        ERP
        <Button onClick={()=> navigate('/login')}>Get started</Button>
      </Grid>
      <Grid item xs={12} 
        display={'flex'} 
        alignItems={'center'} 
        justifyContent={'space-between'} 
        // border={'1px solid black'}
        >
          <Typography variant='h1'>Hello!</Typography>

      </Grid>
    </Grid>




    </>
  )
}

export default Home