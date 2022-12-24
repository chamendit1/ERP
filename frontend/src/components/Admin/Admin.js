import useAuth from '../../hooks/useAuth'
import Login from '../Auth/Login/Login'
import React, { useState } from 'react'
import Field from '../Auth/Login/Field'
import { useNavigate, Link } from 'react-router-dom'
import { Avatar, Button, Card, Grid, Typography, Box, Select, MenuItem, InputLabel, OutlinedInput, FormControl, FormGroup, FormControlLabel, Checkbox} from '@mui/material'
import { updateProfile } from '../../actions/profile'
import { useDispatch, useSelector } from 'react-redux'

const initialState ={ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', profilePicture: '', role: '', access: []}

const Admin = () => {

  // const {clients} = useSelector((state) => state.clients)
  console.log(useSelector((state) => state))


  return (
    <div>

    </div>
  )
}

export default Admin