import { Avatar, Box, Card, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'

const Employee = () => {

    const data = 
        { 
            id: 2131,
            firstName: 'Chandra',
            lastName: 'Aditya',
            birthDate: '',
            address: 'Taman Surya 3 F3/25',
            email:'chandra23b@indoplastik.com',
            mobile: '0812 3971 9485',
            gender: '',
            position: 'Big Boss',
            hireDate: '',
            access: [],
            salary: 0,
        }
    

  return (
    <>
    
    {/* <AddClient setOpen={setOpen} open={open} /> */}
    <Box sx={{ flexGrow: 1 }}>
      <Grid className='ClientContainer' container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 6, md: 6, lg:12 }}>

        <Grid className='ClientItem' item xs={2} sm={6} md={6} lg={6}>
          <Card style={{borderRadius: 10, boxShadow: 3}} sx={{p: 2}}>
          <Grid container>
            <Grid item >
              <Avatar variant="rounded" sx={{ height: '100%', width: '100px' }}></Avatar>
            </Grid>
            <Grid item xs sx={{p: 1}}>
              <Typography variant="subtitle1">{data.firstName} {data.lastName}</Typography>
              <Typography variant="body2">{data.email}</Typography>
              <Typography variant="body2">{data.mobile}</Typography>
              <Typography variant="body2">{data.address}</Typography>

            </Grid>
            <Grid item >
              <IconButton onClick={() => {}}>
                {/* <ModeEditIcon/> */}
              </IconButton>
            </Grid>
          </Grid>
          </Card>
        </Grid>

        {/* {data.map((dat, index) => (
          <Grid className="" item xs={2} sm={6} md={6} key={index}>
            <Card style={{borderRadius: 10, boxShadow: 3}} sx={{p: 2}}>
              {dat.text}
            </Card>
          </Grid>
        ))} */}

        <Grid item xs sm xl>
          <Card style={{borderRadius: 10, boxShadow: 3}} sx={{p: 2}}>
              <Typography variant="subtitle2" sx={{fontWeight: 'bold'}}>Bill</Typography>
          </Card>
        </Grid>


      </Grid>
    </Box>
    </>
  )
}

export default Employee