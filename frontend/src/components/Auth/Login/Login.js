import React, { useState } from 'react'
import Field from './Field'
// import useStyles from './styles'
// import styles from './Login.module.css'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { signup, signin } from '../../../actions/auth'

// import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import ProgressButton from 'react-progress-button'
// import LoadingButton from '@mui/lab/LoadingButton';
// import { createProfile } from '../../actions/profile'

import '../Auth.css'

import { Avatar, Button, Card, Grid, Typography, Box, Select, MenuItem, InputLabel, OutlinedInput, FormControl, FormGroup, FormControlLabel, Checkbox} from '@mui/material'

const initialState ={ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', profilePicture: '', role: '', access: []}

const Login = () => {

    // // const classes = useStyles();
    const [formData, setFormData] = useState(initialState)
    const [isSignup, setIsSignup] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    //  // eslint-disable-next-line 
    const user = JSON.parse(localStorage.getItem('profile'))
    
    const handleShowPassword = () => setShowPassword(!showPassword);
    const handleChange =(e)=> {
        setFormData( {...formData, [e.target.name] : e.target.value} )
    }
    const handleAccess =(e)=> {
      setFormData( {...formData, 
        [e.target.name] : [...formData.access , e.target.value] } )
  }

    const handleSubmit =(e) => {
        e.preventDefault()
        console.log('Submit')
        if(isSignup) {
            dispatch(signup(formData))
        } else {
            dispatch(signin(formData))
        }
    }

    const switchMode =() => {
        setIsSignup((prevState) => !prevState)
    }

    if(user) {
      navigate('/CRM')
    }

    console.log(formData)

    return (
      <Grid container justifyContent="center" alignItems='center' style={{height: '70vh'}}>
        <Box className='login' sx={{m: 2}} >
          <Typography variant="h6" sx={{fontWeight: 'bold'}} >{ isSignup ? 'Sign Up' : 'Sign In' }</Typography>
          <Typography variant='body2' color='grey'>Enter your email and password to sign in</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{mt:1,mb:3}}>
              
              { isSignup && (
              <>
                <Field name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Field name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
              )}

              <Field name="email" label="Email Address" handleChange={handleChange} type="email" />
              <Field name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
              
              { isSignup && (
              <>
                <Field name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> 
                <FormControl >
                  <InputLabel id="demo-multiple-name-label">Role</InputLabel>
                  <Select  
                    labelId="demo-multiple-name-label"
                    label="Role"
                    name='role'
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
              
              </>
              )
              }
            </Grid>

            <Grid container justifyContent="center">
              <Button fullWidth variant="contained" type="submit">{ isSignup ? 'Sign Up' : 'Sign In' }</Button>
            </Grid>
            
            <Grid container justifyContent="center" alignItems='center'>
              <Typography variant='body2'> { isSignup ? 'Already have an account?' : "Don't have an account?" }</Typography>
              <Button onClick={switchMode}>
              <Typography variant='body2' textTransform='none'>{ isSignup ? 'Sign in' : "Sign Up" }</Typography> 
              </Button>
            </Grid>

          {/* <Link to="forgot"><p style={{textAlign: 'center', color: '#1d7dd6', marginTop: '20px'}}>Forgotten Password?</p></Link> */}
          </form>
        </Box>
      </Grid>
    )
}

export default Login