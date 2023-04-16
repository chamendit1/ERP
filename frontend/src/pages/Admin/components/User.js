import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Select, MenuItem, InputLabel, OutlinedInput, FormControl, FormGroup, FormControlLabel, Checkbox} from '@mui/material'

import { getProfile, updateProfile } from '../../../actions/profile';
import { update } from '../../../actions/auth';

const User = (props) => {
  const { onClose,  open, id, data } = props;
  const [userData, setUserData] = useState({ access: [], name: '', email: '', userId: []})
  const dispatch = useDispatch();
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);


  useEffect(() => {
    setUserData(data)
    setChecked1(data.access.CRM)
    setChecked2(data.access.Accounting)

  }, [data, dispatch]);

  // console.log(userData)
  // console.log()
  const handleClose = () => {
    onClose();
  };
  const handleSubmitUser =(e)=> {
    e.preventDefault()
    if(id) {
      // console.log(userData)
      dispatch(updateProfile(id, userData))
      dispatch(update(id, userData))
    } 
    // clear()
    handleClose()
  }

  const handleChange1 = (e) => {
    setChecked1(e.target.checked);
    setUserData({...userData, access: {...userData.access, CRM : e.target.checked}})
  };

  const handleAccess2 = (e) => {
    setChecked2(e.target.checked);
    setUserData({...userData, access: {...userData.access, Accounting : e.target.checked}})
  };

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

            <Typography>Module Access</Typography>
            <FormGroup sx={{ m: 2, width: '100%' }}>

              <FormControlLabel name='access' 
                onChange={handleChange1}
                control={<Checkbox value={'CRM'} />} 
                checked={checked1}
                label="CRM" 
              />
              <FormControlLabel name='access' 
                onChange={handleAccess2}
                control={<Checkbox value={'Accounting'} />} 
                checked={checked2}
                label="Accounting" 
              />
            </FormGroup>

            <FormControlLabel name='status' 
                onChange={(e) => setUserData({...userData, active :  e.target.value })}
                control={<Checkbox value={true} />} 
                label="Active" 
              />

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