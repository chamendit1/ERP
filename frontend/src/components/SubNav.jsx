import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
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
  Icon,
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
import '../css/navbar.css'
import Breadcrumb from './Breadcrumb/Breadcrumb';

const SubNav = ( {handleDrawer, children}) => {
    const dispatch = useDispatch()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])
    // dispatch({ type: 'LOGOUT' })
    // navigate('/')
    // setUser(null)

    const handleLogout = () => {
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
            if(decodedToken.exp * 1000 < new Date().getTime()) handleLogout()
        }
        // eslint-disable-next-line
    }, [location, user]) //when location changes, set the user

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
  // console.log(user)

    if(!user) return (
        <Card>
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
    // console.log(user)


    return ( 
      <Box sx={{ flexGrow: 1 }}>
          <Grid container style={{height: '100%'}} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 12 }}>
            <Grid item display={'flex'} alignItems={'center'}>
                <IconButton onClick={handleDrawer}>
                  <MenuIcon/>
                </IconButton>
            </Grid>
            <Grid item xs={2} sm={8} md={4} display={'flex'} alignItems={'center'}>
                <Breadcrumb navigate={navigate} location={location}/>
            </Grid>
            <Grid item xs display={'flex'} justifyContent={'flex-end'}>
                {/* {user.result.access} <br/> */}
                {/* {user.result.role} <br/> */}
                {/* {user.result.email} */}
                <Button size='small' onClick={handleLogout}><LogoutIcon fontSize='small'/></Button>
            </Grid>
          </Grid>
      </Box>
    )
}

export default SubNav