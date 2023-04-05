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
        >
          <Typography variant='h1'>Indo Plastik</Typography>

      </Grid>
    </Grid>


    </>
  )
}

export default Home