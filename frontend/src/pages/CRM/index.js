import React from 'react'
import { Button, Card, Box, MenuItem, Menu, MenuList, Grid, Divider, ButtonGroup, Typography } from '@mui/material'
import { useLocation, Link, Routes, Route, useNavigate } from 'react-router-dom'
import Clients from '../Clients/Clients'
import Orders from '../Orders/Orders'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ArticleIcon from '@mui/icons-material/Article';
import Kanban from './components/kanban/Kanban'
// import SubNav from '../../components/SubNav'
// import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import Dashboard from './components/Dashboard/Dashboard'
import './crm.css'
// import DescriptionIcon from '@mui/icons-material/Description';

// import AssessmentIcon from '@mui/icons-material/Assessment';
import './components/kanban/kanban.css'

const navItems = [
  {
    link: '/crm/client-list',
    name: 'Clients',
    logo: <PeopleAltIcon fontSize="small"/>
  },
  {
    link: '/crm/order-list',
    name: 'Orders',
    logo: <ArticleIcon fontSize="small"/>
  },
  {
    link: '/crm/sales',
    name: 'Sales',
    logo: <PeopleAltIcon fontSize="small"/>
  },
  {
    link: '/Board',
    name: 'Board',
    logo: <PeopleAltIcon fontSize="small"/>
  }
]

const CRM = () => {
  const navigate = useNavigate()
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const handleNavClientList = () => {
  //   navigate('/CRM/Clients')
  // };
  // const handleNavOrderList = () => {
  //   navigate('/CRM/Orders')
  // };
  // const handleNavPipeline = () => {
  //   navigate('/CRM/Pipeline')
  // };


  return (
    <>
      <Grid container>
        <Grid item xs={12} height={'90vh'} >
          <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/Clients" element={<Clients/>}/>
            <Route path="/Orders" element={<Orders/>}/>
            <Route path="/Pipeline" element={<Kanban/>}/>
          </Routes>
        </Grid>
      </Grid>
    </>
  )
}

export default CRM