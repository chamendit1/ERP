import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Select, MenuItem, InputLabel, OutlinedInput, FormControl, FormGroup, FormControlLabel, Checkbox} from '@mui/material'

import { getProfile, updateProfile } from '../../../actions/profile';

const User = (props) => {
  const { onClose,  open, id, data } = props;
  const [userData, setUserData] = useState({ access: [], name: '', email: '', phone: '', address: '', userId: []})
  // const { profile } = useSelector((state) => state.profiles)
  // const location = useLocation()
  const dispatch = useDispatch();

  //  useEffect(() => {
  //   dispatch(getProfile(id));
  //   // eslint-disable-next-line
  // }, [id, location]);


  useEffect(() => {
    setUserData(data)
  }, [data, dispatch]);

  console.log(userData)
  // console.log()
  const handleClose = () => {
    onClose();
  };
  const handleSubmitUser =(e)=> {
    e.preventDefault()
    if(id) {
      // console.log(userData)
      dispatch(updateProfile(id, userData))
    } 
    // clear()
    handleClose()
  }


  return (
    <>
      <form>
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <Typography>Name</Typography>
            <TextField fullWidth
              id="fullWidth" 
              margin="dense"
              variant="outlined"
              value={userData.name}
              onChange={(e) => setUserData({...userData, name: e.target.value})}
            />
          
            <Typography>Role</Typography>
            <FormControl >
              <Select  
                name='role'
                value={userData.role}
                onChange={(e) => setUserData({...userData, role: e.target.value})}
                >
                <MenuItem value={'Manager'}>Manager</MenuItem>
                <MenuItem value={'Accountant'}>Accountant</MenuItem>
                <MenuItem value={'Employee'}>Employee</MenuItem>
              </Select>
            </FormControl>

            <Typography>Email</Typography>
            <TextField fullWidth
              id="fullWidth" 
              margin="dense"
              variant="outlined"
              value={userData.email}
              onChange={(e) => setUserData({...userData, email: e.target.value})}
            />

            <FormGroup sx={{ m: 2, width: '100%' }}>
              <FormControlLabel name='access' 
                onChange={(e) => setUserData({...userData, access : [...userData.access , e.target.value]})}
                control={<Checkbox value={'CRM'} />} 
                label="CRM" 
              />
              <FormControlLabel name='access' 
                onChange={(e) => setUserData({...userData, access : [...userData.access , e.target.value]})}
                control={<Checkbox value={'Accounting'} />} 
                label="Accounting" 
              />
            </FormGroup>

            {/* <Typography>Access</Typography>
            <TextField fullWidth
              id="fullWidth" 
              margin="dense"
              variant="outlined"
              value={userData.role}
              onChange={(e) => setUserData({...userData, role: e.target.value})}
            /> */}
          </DialogContent>
          <DialogActions>
             <Button  onClick={handleSubmitUser}  variant="contained" style={{marginRight: '25px'}} >
                 Save Customer
             </Button>
             </DialogActions>
        </Dialog>
      </form>
    </>
  )
}

export default User