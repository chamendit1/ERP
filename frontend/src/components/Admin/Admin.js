import useAuth from '../../hooks/useAuth'
import Login from '../Auth/Login/Login'
import React, { useState } from 'react'
import Field from '../Auth/Login/Field'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Avatar, Button, Card, Grid, Typography, Box, Select, MenuItem, InputLabel, OutlinedInput, FormControl, FormGroup, FormControlLabel, Checkbox} from '@mui/material'
import { updateProfile } from '../../actions/profile'

const initialState ={ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', profilePicture: '', role: '', access: []}

const Admin = () => {
  const { email, role, access, isManager, isAdmin, status } = useAuth()
  console.log(role)
  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isSignup, setIsSignup] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  const handleChange =(e)=> {
    setFormData( {...formData, [e.target.name] : e.target.value} )
  }
  const handleAccess =(e)=> {
    setFormData( {...formData, 
      [e.target.name] : [...formData.access , e.target.value] } )
  }
  const handleSubmit =(e) => {
    e.preventDefault()
    dispatch(updateProfile(formData))
  }

  const switchMode =() => {
    setIsSignup((prevState) => !prevState)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{mt:1,mb:3}}>
              {/* <Field name="email" label="Email Address" handleChange={handleChange} type="email" />
              <Field name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} />
              <Field value={role} name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />  */}
              <FormControl >
                <InputLabel id="demo-multiple-name-label">Role</InputLabel>
                <Select  
                  labelId="demo-multiple-name-label"
                  label="Role"
                  name='role'
                  value={role}
                  onChange={handleChange}
                >
                  <MenuItem value={'Manager'}>Manager</MenuItem>
                  <MenuItem value={'Accountant'}>Accountant</MenuItem>
                  <MenuItem value={'Employee'}>Employee</MenuItem>
                </Select>
              </FormControl>
              <FormGroup sx={{ m: 2, width: '100%' }}>
                <FormControlLabel name='access' onChange={handleAccess} control={<Checkbox value={'CRM'} />} label="CRM" />
                <FormControlLabel name='access' onChange={handleAccess} control={<Checkbox value={'Accounting'} />} label="Accounting" />
              </FormGroup>
            </Grid>

            <Grid container justifyContent="center">
              <Button fullWidth variant="contained" type="submit">{'Sign Up' }</Button>
            </Grid>
            
            {/* <Grid container justifyContent="center" alignItems='center'>
              <Typography variant='body2'> { isSignup ? 'Already have an account?' : "Don't have an account?" }</Typography>
              <Button onClick={switchMode}>
              <Typography variant='body2' textTransform='none'>{ "Sign Up" }</Typography> 
              </Button>
            </Grid> */}

          {/* <Link to="forgot"><p style={{textAlign: 'center', color: '#1d7dd6', marginTop: '20px'}}>Forgotten Password?</p></Link> */}
          </form>
    </div>
  )
}

export default Admin