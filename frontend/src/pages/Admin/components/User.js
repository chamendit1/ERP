import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { getProfile, updateProfile } from '../../../actions/profile';

const User = (props) => {
  const { onClose,  open, id } = props;
  const [userData, setUserData] = useState({ access: [], name: '', email: '', phone: '', address: '', userId: []})
  const { profile } = useSelector((state) => state.profiles)
  // const location = useLocation()
  const dispatch = useDispatch();



   useEffect(() => {
    dispatch(getProfile(id));
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    setUserData(profile)
  }, [profile]);

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
              onChange={(e) => setUserData({...userData, name: e.target.value})}
            />

            <Typography>Name</Typography>
            <TextField fullWidth
              id="fullWidth" 
              margin="dense"
              variant="outlined"
              onChange={(e) => setUserData({...userData, name: e.target.value})}
            />
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