import React from 'react'
import Navbar from '../../components/Navbar'
import { Button, Box, MenuItem, Menu, MenuList } from '@mui/material'
import { useLocation, Link, Routes, Route, useNavigate } from 'react-router-dom'
import Clients from '../Clients/Clients'
import Orders from '../Orders/Orders'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ArticleIcon from '@mui/icons-material/Article';
import Kanban from './components/kanban/Kanban'
import SubNav from '../../components/SubNav'

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
  }
]

const CRM = () => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavClientList = () => {
    navigate('/crm/client-list')
  };
  const handleNavOrderList = () => {
    navigate('/crm/order-list')
  };
  const handleNavPipeline = () => {
    navigate('/crm')
  };


  return (
    <>
      <SubNav>
        <Box>
          <Button onClick={handleClick}>Sales</Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleNavPipeline}>Pipeline</MenuItem>
            <MenuItem onClick={handleNavClientList}>Customers</MenuItem>
            {/* <MenuItem onClick={handleNavClientList}>Quotations</MenuItem> */}
            <MenuItem onClick={handleNavOrderList}>Orders</MenuItem>
          </Menu>
        </Box>
        <Box  >
          <Button onClick={handleClick}>Reporting</Button>
          {/* <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Pipeline</MenuItem>
            <MenuItem onClick={handleClose}>Customers</MenuItem>
            <MenuItem onClick={handleNav}>Quotations</MenuItem>
            <MenuItem onClick={handleClose}>Orders</MenuItem>
          </Menu> */}
        </Box>
      </SubNav>

      <Routes>
        <Route path="/client-list" element={<Clients/>}/>
        <Route path="/order-list" element={<Orders/>}/>
        <Route path="/pipeline" element={<Kanban/>}/>
      </Routes>
    </>
  )
}

export default CRM