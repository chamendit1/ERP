import React, { useState, useEffect} from 'react'
import { Card, Grid, Box, Avatar, Typography, IconButton } from '@mui/material'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import HomeIcon from '@mui/icons-material/Home';
const ClientCard = ({ClientData}) => {
    // const [open, setOpen] = useState(false)
    // const editClient= (id) => {
    //   setOpen((prev) => !prev)
    // }

  const Profile = ({ icon, data }) => (
    <Grid container>
      <Grid item xs>{icon}</Grid>
      <Grid item xs={10}>
        <Typography variant="subtitle2">{data}</Typography>
      </Grid>
    </Grid>
  )


  return (
    <>
          <Grid container >
            <Grid item >
              <Avatar variant="rounded" sx={{ height: '100%', width: '80px' }}></Avatar>
            </Grid>
            <Grid item sx={{pt: 1}}>
              <Profile icon={<EmailIcon sx={{ verticalAlign:"middle", fontSize: 15 }}/>} data={ClientData?.email}/>
              <Profile icon={<LocalPhoneIcon sx={{ verticalAlign:"middle", fontSize: 15 }}/>} data={ClientData?.phone}/>
              <Profile icon={<HomeIcon sx={{ verticalAlign:"middle", fontSize: 15 }}/>} data={ClientData?.address}/>
            
              
            
            </Grid>
          </Grid>
    </>
  )
}

export default ClientCard