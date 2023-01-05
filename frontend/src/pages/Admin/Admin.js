import useAuth from '../../hooks/useAuth'
import Login from '../../components/Auth/Login/Login'
import React, { useEffect, useState } from 'react';
import Field from '../../components/Auth/Login/Field'
import { useNavigate, Link, Navigate, useLocation } from 'react-router-dom'
import { Avatar, Button, Grid, Typography, Box, Select, MenuItem, InputLabel, OutlinedInput, FormControl, FormGroup, FormControlLabel, Checkbox} from '@mui/material'
import { updateProfile } from '../../actions/profile'

import ProfileCard from '../../components/Card/ProfileCard'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import SubNav from '../../components/SubNav';

const initialState ={ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', profilePicture: '', role: '', access: []}

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();


  return (
    <>
      <Grid container>
      {/* <Grid item xs={12} height={'10vh'}>
      </Grid> */}

      <Grid item xs={12} height={'90vh'} >
        <Button variant="outlined" onClick={() => { navigate('/Users')}}> Users</Button>
        <Button variant="outlined" onClick={() => { navigate('/CRM/Clients')}}> Clients</Button>
        <Button variant="outlined" onClick={() => { navigate('/CRM/Orders')}}> Orders</Button>
        <Button variant="outlined" onClick={() => { navigate('/Accounting')}}> Accounting</Button>
      </Grid>
    </Grid>
    </>
  )
}

export default Admin