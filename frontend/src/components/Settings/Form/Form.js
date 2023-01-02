 /* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Avatar, Button, Paper, Grid, Container } from '@mui/material';
import Uploader from './Uploader';
import { getProfilesByUser, updateProfile } from '../../../actions/profile';
import Input from './Input';



const Settings = ({user}) => {

  // const user = JSON.parse(localStorage.getItem('profile'))
  const initialState = { 
  name: '', 
  email: '',
  phoneNumber: '',
  businessName: '',
  contactAddress: '', 
  logo: ''
};

  const [form, setForm] = useState(initialState);
  const location = useLocation()
  const dispatch = useDispatch();
  // const classes = useStyles();
  const { profiles } = useSelector((state) => state.profiles)
 const [switchEdit, setSwitchEdit] = useState(0)

  // eslint-disable-next-line 
  // const [openSnackbar, closeSnackbar] = useSnackbar()


  useEffect(() => {
    if(switchEdit === 1) {
      setForm(profiles)
    }
  },[switchEdit])

  useEffect(() => {
    dispatch(getProfilesByUser({ search: user?.result?._id || user?.result.googleId}))
  },[location, switchEdit])
  
  const handleSubmit = (e) => {
    e.preventDefault();
      dispatch(updateProfile(profiles?._id, form));
      setSwitchEdit(0)

  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  console.log(profiles)
  return (
    <div>
     {switchEdit === 0 && (
       <Container component="main" maxWidth="sm">
       <Paper elevation={2} >
       <Avatar style={{width: '100px', height: '100px', margin: '30px'}} src={profiles?.logo} alt="" >
         </Avatar>
         <p>{profiles?.businessName}</p>
         <p>{profiles?.role}</p>
         <p>{profiles?.contactAddress}</p>
         <p>{profiles?.phoneNumber}</p>
         <p>{profiles?.email}</p>
         <p>Access: {profiles?.access}</p>
         <Button variant="outlined" style={{margin: '30px', padding: '15px 30px'}} onClick={() => setSwitchEdit(1)}>Edit Profile</Button>
       </Paper>
       </Container>
     )}

    {switchEdit === 1 && (
      <Container component="main" maxWidth="sm">
      <Paper elevation={1} >
      <Avatar style={{width: '100px', height: '100px'}} src={profiles?.logo} alt="">
         </Avatar>
        <form  onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Uploader form={form} setForm={setForm} />
            <Input name="businessName" label="Business Name" handleChange={handleChange} type="text" value={form?.businessName}/>
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" half value={form?.email} />
            <Input name="phoneNumber" label="Phone Number" handleChange={handleChange} type="text" half value={form?.phoneNumber}/>
            <Input name="contactAddress" label="Contact Address" handleChange={handleChange} type="text" value={form?.contactAddress} />
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" >
           Update Settings
          </Button>
          <Grid container justifyContent="flex-end">
          </Grid>
        </form>
      </Paper>
    </Container>
    )}
    </div>
  );
};

export default Settings;
