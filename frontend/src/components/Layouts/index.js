import { Box, Grid, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { height } from '@mui/system'
// import React from 'react'
// import { Link } from 'react-router-dom'
// import AssessmentIcon from '@mui/icons-material/Assessment';
// import DescriptionIcon from '@mui/icons-material/Description';
// import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// const data = [
//     {
//       id: 0,
//       icon: <AssessmentIcon className='dashboardIcon' fontSize='large'/>,
//       text: <Typography>Pipeline</Typography>,
//       to: '/CRM/Pipeline',
//     },
//     {
//       id: 1,
//       icon: <DescriptionIcon className='dashboardIcon' fontSize='large'/>,
//       text: <Typography>Order Module</Typography>,
//       to: '/CRM/Orders',
//     },
//     {
//       id: 2,
//       icon: <PeopleAltIcon className='dashboardIcon' fontSize='large'/>,
//       text: <Typography>Client Module</Typography>,
//       to: '/CRM/Clients',
//     },
//   ]

// const index = () => {

//       function Container1(props) {
//         const value = props.value;
//         return value.map((dat, index) => (
//             <Grid display={'flex'} className="CrmDashboardItem" item xs={2} sm={4} md={4} key={index} component={Link} to={dat.to}>
//               <Box className='CrmDashboardBox' style={{display: 'flex',flexDirection:  'column', alignItems: 'center', justifyContent: 'center'}}>
//                 {dat.icon}
//                 {dat.text}
//               </Box>
//             </Grid>
//           ))}
      
//       return (
//         <>
//           <Box sx={{ flexGrow: 1 }}>
//             <Grid container alignItems={"stretch"} className='CrmDashboardContainer' spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 12, md: 12 }} >  
//               <Container1 value={data}/>
//               {/* {Array.from(Array(6)).map((_, index) => (
//                 <Grid className="CrmDashboardItem" item xs={2} sm={4} md={4} key={index}>
//                   <Box className='CrmDashboardBox'>
//                   </Box>
//                 </Grid>
//               ))} */}
    
//             </Grid>
//           </Box>
//         </>
//       )
//     }

// export default index


import React from 'react'

const index = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={6}>

          <Box border={'1px solid black'} style={{
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'center',
            height: '50vh',
            width: ' 20vh',
            alignItems: 'center'
          }}>
            <Box border={'1px solid black'} width={'100%'} height={'5%'} style={{display:'flex', justifyContent:'center'}}> Title</Box>
            <Box border={'1px solid black'} width={'100%'} height={'90%'} style={{display:'flex', justifyContent:'center'}}> Draggable </Box>
            <Box border={'1px solid black'} width={'100%'} height={'5%'} style={{display:'flex', justifyContent:'center'}}> Add</Box>
          </Box>

        </Grid>

        <Grid item xs={6}>

          <Grid container border={'1px solid black'} style={{
            width: '20vh',
            height: '50vh',
          }}>
            <Grid item xs={12} height={'5%'}  border={'1px solid black'} style={{display:'flex', justifyContent:'center'}}>
              title
            </Grid>
            <Grid item xs={12} height={'90%'} border={'1px solid black'} style={{display:'flex', justifyContent:'center'}}>
              Draggable
            </Grid>
            <Grid item xs={12} height={'5%'} border={'1px solid black'} style={{display:'flex', justifyContent:'center'}}>
              Add
            </Grid>
          </Grid>

        </Grid>

        <Grid container>
          <Grid item xs={1} border={'1px solid black'}>
            good
          </Grid>
          <Grid item xs border={'1px solid black'}>
            good
          </Grid>
        </Grid>
      </Grid>





    </>
  )
}

export default index