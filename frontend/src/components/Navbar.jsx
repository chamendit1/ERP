import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'

// import Button from '@material-ui/core/Button';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import Grow from '@material-ui/core/Grow';
// import Paper from '@material-ui/core/Paper';
// import Popper from '@material-ui/core/Popper';
import { 
  MenuItem, 
  MenuList, 
  Avatar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  Tooltip,
  Card,
  Grid,
  Button,
  Typography,
  Paper,
} from '@mui/material';
// import { makeStyles } from '@material-ui/core/styles';
// import axios from 'axios'

// import AppBar from '@mui/material/AppBar';
// import Typography from '@mui/material/Typography';

// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';

// import AdbIcon from '@mui/icons-material/Adb';
// import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

// Do not delete
// import Breadcrumb from './Breadcrumb/Breadcrumb'

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const Navbar = ({children}) => {
    const dispatch = useDispatch()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const navigate = useNavigate()
    const location = useLocation()


    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])


    const logout =() => {
        dispatch({ type: 'LOGOUT' })
        navigate('/')
        setUser(null)
    }  

    useEffect(()=> {
        const token = user?.token
        // setUser(JSON.parse(localStorage.getItem('profile')))
        //If token expires, logout the user
        if(token) {
            const decodedToken = decode(token)
            if(decodedToken.exp * 1000 < new Date().getTime()) logout()
        }
        // eslint-disable-next-line
    }, [location, user]) //when location changes, set the user

    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

  const openLink =(link) => {
      navigate(`/${link}`)
      setOpen(false);
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

    if(!user) return (
        <Card style={{borderRadius: 10, boxShadow: 3}}>
          <Grid container justifyContent="space-between" alignItems='center'style={{padding: '0 1.5rem', height:'3rem'}}>
            <Grid item>
              {/* <img style={{width: '50px', cursor: 'pointer'}} onClick={()=> navigate('/')} src="" alt="ERP" /> */}
              <Typography>ERP</Typography>
            </Grid>
            <Grid item>
            <Button onClick={()=> navigate('/login')}>Get started</Button>
            </Grid>
          </Grid>
        </Card>
    )
    return ( 
      <Paper style={{padding: '0 1rem'}}>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none'}}}>
            {children}
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex'} }}>
            {children}
          </Box>
          

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} >
                <MenuItem onClick={() => openLink('settings') }>{(user?.result?.name).split(" ")[0]}</MenuItem>
                <MenuItem onClick={()=> logout()} >Logout</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Toolbar>
      </Paper>
    )
}

export default Navbar