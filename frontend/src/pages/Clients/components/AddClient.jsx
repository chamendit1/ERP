 /* eslint-disable */
 import React, { useState, useEffect} from 'react';
 import { useLocation } from 'react-router-dom';
//  import { withStyles } from '@mui/styles';
 import Button from '@mui/material/Button';
 import Dialog from '@mui/material/Dialog';

 import IconButton from '@mui/material/IconButton';
 import CloseIcon from '@mui/icons-material/Close'; 
 import Typography from '@mui/material/Typography';
 import { DialogTitle, DialogContent , DialogActions } from '@mui/material';

 import { TextField } from '@mui/material';
 
 import { useDispatch, useSelector } from 'react-redux'
 import { createClient, updateClient } from '../../../actions/clientActions'
 import { getClient } from '../../../actions/clientActions';

 import { useParams } from 'react-router-dom'
 
 const DTitle = (props) => {
   const { children, classes, onClose, ...other } = props;
   return (
     <DialogTitle disableTypography {...other} style={{padding: '1rem 2rem'}}>
       <Typography variant="h6">{children}</Typography>
       {onClose ? (
         <IconButton aria-label="close" onClick={onClose} style={{position:'absolute', right: '1rem', top: '13px' }}>
           <CloseIcon />
         </IconButton>
       ) : null}
     </DialogTitle>
   );
 }
 
 
 const AddClient = ({ setOpen, open, currentId, setCurrentId }) => {
     const location = useLocation()
     const [clientData, setClientData] = useState({ name: '', email: '', phone: '', address: '', userId: ''})
     const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
     const dispatch = useDispatch()
     const client = useSelector((state)=> state.clients.client)
     const { id } = useParams()
     
     

     useEffect(() => {
      if (id) {
        dispatch(getClient(id));
      }
    }, [id]);
 
     useEffect(() => {
       if(client) {
         setClientData(client)
       }
     }, [client])
 
    //  useEffect(() => {
    //    setUser(JSON.parse(localStorage.getItem('profile')))
    //   //  setClientData({...clientData, userId: user?.result?._id})
    //  },[location])
 
 
    //  useEffect(() => {
    //    var checkId = user?.result?._id
    //    if(checkId !== undefined) {
    //      setClientData({...clientData, userId: [checkId]})
    //    } else {
    //      setClientData({...clientData, userId: [user?.result?.googleId]})
    //    }
       
    //  },[location])
 
    const handleSubmitClient =(e)=> {
        e.preventDefault()
        if(id) {
          dispatch(updateClient(id, clientData))
        } else {
          dispatch(createClient(clientData))
        }
        clear()
        handleClose()
    }
 
    const clear =() => {
      setClientData({ name: '', email: '', phone: '', address: '', userId: [] })
    }
      
    const handleClose = () => {
      setOpen(false);
    };

   return (
     <>
         <form >
       <Dialog onClose={handleClose} open={open} fullWidth  PaperProps={{ borderRadius: 100 }}>
             <DTitle id="customized-dialog-title" onClose={handleClose} >
             {currentId? 'Edit Customer' : 'New Customer'}
             </DTitle>
             <DialogContent dividers>
              <div className="customInputs">
                Title
                First Name
                Last Name
                PP
                <Typography variant='body2' sx={{fontWeight: 'bold'}}>Company Name</Typography>
                  <TextField fullWidth
                      id="fullWidth" 
                      margin="dense"
                      variant="outlined"
                      onChange={(e) => setClientData({...clientData, name: e.target.value})}
                      value={clientData.name}
                  />
                  <Typography variant='body2' sx={{fontWeight: 'bold'}}>Email</Typography>
                  <TextField 
                      id="outlined-basic" 
                      margin="dense"
                      variant="outlined"
                      onChange={(e) => setClientData({...clientData, email: e.target.value})}
                      value={clientData.email} 
                  />
                  <Typography variant='body2' sx={{fontWeight: 'bold'}}>Phone Number</Typography>
                  <TextField 
                      id="outlined-basic" 
                      margin="dense" 
                      variant="outlined"
                      onChange={(e) => setClientData({...clientData, phone: e.target.value})}
                      value={clientData.phone} 
                  />
                  <Typography variant='body2' sx={{fontWeight: 'bold'}}>Address</Typography>
                  <TextField 
                      id="outlined-basic" 
                      margin="dense"
                      variant="outlined"
                      onChange={(e) => setClientData({...clientData, address: e.target.value})}
                      value={clientData.address} 
                  />
              </div>
             </DialogContent>
             <DialogActions>
             <Button  onClick={handleSubmitClient}  variant="contained" style={{marginRight: '25px'}} >
                 Save Customer
             </Button>
             </DialogActions>
       </Dialog>
         </form>
     </>
   );
 }
 
 export default AddClient