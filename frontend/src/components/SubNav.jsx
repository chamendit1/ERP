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


const SubNav = ({children}) => {
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

  // const openLink =(link) => {
  //     navigate(`/${link}`)
  //     setOpen(false);
  // }

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

    return ( 
      <Box style={{padding: '0 1rem'}}>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none'}}}>
            {children}
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex'} }}>
            {children}
          </Box>
        </Toolbar>
      </Box>
    )
}

export default SubNav