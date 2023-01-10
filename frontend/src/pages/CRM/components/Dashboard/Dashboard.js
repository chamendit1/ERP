import { Box, Grid, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import AssessmentIcon from '@mui/icons-material/Assessment';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import '../../crm.css'

const Dashboard = () => {

  const data = [
    {
      id: 0,
      icon: <AssessmentIcon className='dashboardIcon' fontSize='large'/>,
      text: <Typography>Pipeline</Typography>,
      to: '/CRM/Pipeline',
    },
    {
      id: 1,
      icon: <DescriptionIcon className='dashboardIcon' fontSize='large'/>,
      text: <Typography>Order Module</Typography>,
      to: '/CRM/Orders',
    },
    {
      id: 2,
      icon: <PeopleAltIcon className='dashboardIcon' fontSize='large'/>,
      text: <Typography>Client Module</Typography>,
      to: '/CRM/Clients',
    },
    {
      id: 3,
      icon: <AttachMoneyIcon className='dashboardIcon' fontSize='large'/>,
      text: <Typography>Accounting</Typography>,
      to: '/Accounting',
    },
  ]

  function Container1(props) {
    const value = props.value;
    return value.map((dat, index) => (
        <Grid display={'flex'} className="CrmDashboardItem" item xs={2} sm={4} md={4} key={index} component={Link} to={dat.to}>
          <Box className='CrmDashboardBox' style={{display: 'flex',flexDirection:  'column', alignItems: 'center', justifyContent: 'center'}}>
            {dat.icon}
            {dat.text}
          </Box>
        </Grid>
      ))}
  
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container alignItems={"stretch"} className='CrmDashboardContainer' spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 12, md: 12 }} >
          <Container1 value={data}/>
          {/* {Array.from(Array(6)).map((_, index) => (
            <Grid className="CrmDashboardItem" item xs={2} sm={4} md={4} key={index}>
              <Box className='CrmDashboardBox'>
              </Box>
            </Grid>
          ))} */}

        </Grid>
      </Box>
    </>
  )
}

export default Dashboard