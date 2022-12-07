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
//  import { useSnackbar } from 'react-simple-snackbar'
 import { getClient } from '../../../actions/clientActions';

 import { useParams } from 'react-router-dom'
 
 const styles = (theme) => ({
   root: {
     margin: 0,
     padding: theme.spacing(2),
     backgroundColor: '#1976D2',
     marginLeft: 0,
   },
   closeButton: {
     position: 'absolute',
     right: theme.spacing(1),
     top: theme.spacing(1),
     color: 'white',
   },
 });
 
 const DTitle = () => {
   const { children, classes, onClose, ...other } = props;
   return (
     <DialogTitle disableTypography className={classes.root} {...other}>
       <Typography variant="h6">{children}</Typography>
       {onClose ? (
         <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
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
     const client = useSelector((state)=> currentId ? state.clients.clients.find((c) => c._id === currentId) : null)
     // eslint-disable-next-line 
    //  const [openSnackbar, closeSnackbar] = useSnackbar()
     const { id } = useParams()

     
     useEffect(() => {
      dispatch(getClient(id));
      // eslint-disable-next-line
    }, [id]);
 
     useEffect(() => {
       if(client) {
         setClientData(client)
       }
     }, [client])
 
     useEffect(() => {
       setUser(JSON.parse(localStorage.getItem('profile')))
       // setClientData({...clientData, userId: user?.result?._id})
     },[location])
 
 
     useEffect(() => {
       var checkId = user?.result?._id
       if(checkId !== undefined) {
         setClientData({...clientData, userId: [checkId]})
       } else {
         setClientData({...clientData, userId: [user?.result?.googleId]})
       }
       
     },[location])
 
 
     const handleSubmitClient =(e)=> {
         e.preventDefault()
         if(currentId) {
           dispatch(updateClient(currentId, clientData))
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
 
   const inputStyle = {
     display: "block",
     padding: "1.4rem 0.75rem",
     width: "100%",
     fontSize: "0.8rem",
     lineHeight: 1.25,
     color: "#55595c",
     backgroundColor: "#fff",
     backgroundImage: "none",
     backgroundClip: "padding-box",
     borderTop: "0",
     borderRight: "0",
     borderBottom: "1px solid #eee",
     borderLeft: "0",
     borderRadius: "3px",
     transition: "all 0.25s cubic-bezier(0.4, 0, 1, 1)"
 }
 
 
   return (
     <div>
         <form >
       <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth>
             <DTitle id="customized-dialog-title" onClose={handleClose} style={{paddingLeft: '20px', color: 'white'}}>
             {currentId? 'Edit Customer' : 'Add new Client'}
             </DTitle>
             <DialogContent dividers>
 
 
             <div className="customInputs">
                <TextField fullWidth
                    id="fullWidth" 
                    margin="dense"
                    label="Full Name" 
                    variant="outlined"
                    onChange={(e) => setClientData({...clientData, name: e.target.value})}
                    value={clientData.name}
                />
                <TextField 
                    id="outlined-basic" 
                    margin="dense"
                    label="Email" 
                    variant="outlined"
                    onChange={(e) => setClientData({...clientData, email: e.target.value})}
                    value={clientData.email} 
                />
                <TextField 
                    id="outlined-basic" 
                    margin="dense"
                    label="Phone Number" 
                    variant="outlined"
                    onChange={(e) => setClientData({...clientData, phone: e.target.value})}
                    value={clientData.phone} 
                />
                <TextField 
                    id="outlined-basic" 
                    margin="dense"
                    label="Address" 
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
     </div>
   );
 }
 
 export default AddClient