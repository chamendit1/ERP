import React from 'react'
import Navbar from '../../components/Navbar'
import { Button, Box, MenuItem, Menu } from '@mui/material'
import { useLocation, Link, Routes, Route, useNavigate } from 'react-router-dom'
import Clients from '../Clients/Clients'
import Orders from '../Orders/Orders'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ArticleIcon from '@mui/icons-material/Article';
import Kanban from './components/kanban/Kanban'

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (nav) => {
    // navigate(`${nav}`)
    // navigate('/crm/sales')
  };

  return (
    
    <div>
      <Navbar>
      {navItems.map((item) => (
        <Box className='navbar-link' component={Link} to={item.link} >
          <Button onClick={handleClick} sx={{ color: 'black' }}>{item.logo}{item.name}</Button>
          {/* <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose(item.link)}>Profile</MenuItem>
            <MenuItem onClick={handleClose(item.link)}>My account</MenuItem>
            <MenuItem onClick={handleClose(item.link)}>Logout</MenuItem>
          </Menu> */}
        </Box>
      ))}
      </Navbar>
      <Routes>
        <Route path="/" element={<Kanban />}/>
        <Route path="/client-list" element={<Clients/>}/>
        <Route path="/order-list" element={<Orders/>}/>
      </Routes>
    </div>
  )
}

export default CRM