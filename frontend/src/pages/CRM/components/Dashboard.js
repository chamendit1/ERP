import { Box, Grid, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import AssessmentIcon from '@mui/icons-material/Assessment';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import '../../../css/crm.css'

const Dashboard = () => {
  return (
    <Box style={{padding: '5rem'}}>
      <Grid container spacing={8}>
        <Grid item xs component={Link} to="/CRM/Pipeline">
          <Box className='dashboardBox' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Box style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              <AssessmentIcon fontSize='large'/>
              <Typography>Pipeline</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs component={Link} to="/CRM/Orders">
          <Box className='dashboardBox' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Box style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <DescriptionIcon fontSize='large'/>
            <Typography>Order List</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs component={Link} to="/CRM/Clients"> 
          <Box className='dashboardBox' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Box style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <PeopleAltIcon fontSize='large'/>
            <ListItemText>
              Client List
            </ListItemText>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard