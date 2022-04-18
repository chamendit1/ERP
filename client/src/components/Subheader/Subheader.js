import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'
import './Subheader.css'

import { makeStyles } from '@material-ui/core/styles';

import Breadcrumb from '../Breadcrumb/Breadcrumb'



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));



const Subheader = () => {
    const dispatch = useDispatch()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const history = useHistory()
    const location = useLocation()


    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])


    const logout =() => {
        dispatch({ type: 'LOGOUT' })
        history.push('/')
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





  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event ) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };


  const openLink =(link) => {
      history.push(`/${link}`)
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
        <div className='header2'>
         <img style={{width: '160px', cursor: 'pointer'}} onClick={()=> history.push('/')} src="https://i.postimg.cc/C5fxh51H/Arc-Invoice-Logo2.png" alt="arc-invoice" />
        <button onClick={()=> history.push('/login')} className='login'>Get started</button>
        </div>
    )
    return (
      <div className='item5'>
        <div className='header'>
          <Breadcrumb/>
        </div>
      </div>
    )
}

export default Subheader
