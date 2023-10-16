import { Box, Checkbox, FormControlLabel, Grid, InputLabel, TextField, Typography } from '@mui/material'
 /* eslint-disable */
 import React, { useState, useEffect} from 'react';
 import { useLocation } from 'react-router-dom';
//  import { withStyles } from '@mui/styles';
 import Button from '@mui/material/Button';
 import Dialog from '@mui/material/Dialog';

 import IconButton from '@mui/material/IconButton';
 import CloseIcon from '@mui/icons-material/Close'; 
 import { DialogTitle, DialogContent , DialogActions } from '@mui/material';
 
 import { useDispatch, useSelector } from 'react-redux'
 import { createClient, updateClient } from '../../../actions/clientActions'
 import { getClient } from '../../../actions/clientActions';

 import { useParams } from 'react-router-dom'
import { clientState } from '../../../initialState';

const ClientDetails = ({ client }) => {
    const location = useLocation()
    const [clientData, setClientData] = useState(clientState)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    // const client = useSelector((state)=> state.clients.client)
    const { id } = useParams()

    // useEffect(() => {
    //     if (id) {
    //       dispatch(getClient(id));
    //     }
    // }, [id,dispatch]);
   
    useEffect(() => {
        if(client) {
            setClientData(client)
        }
    }, [client])

    const handleSubmitClient =(e)=> {
        e.preventDefault()
        if(id) {
          dispatch(updateClient(id, clientData))
        } 
        window.location.reload();

    }
    const handleChange = (e) => { 
        setClientData({ ...clientData, [e.target.name]: e.target.value })
        console.log(clientData)
    };


    return (
    <>
        <Box component="form"  sx={{ m: 2 }}>
            <Grid container spacing={3}>
                <FormField name='name' onChange={handleChange} value={clientData.name}/>
                <FormField name='email' onChange={handleChange} value={clientData.email}/>
                <FormField name='phone' onChange={handleChange} value={clientData.phone}/>
                {/* <FormField2 name='address1' onChange={handleChange} label='Address line 1' value={clientData.address1}/>
                <FormField2 name='address2' onChange={handleChange} label='Address line 2' value={clientData.address2}/>
                <FormField2 name='city' label='City' value={clientData.city}/>
                <FormField2 name='state' label='State' value={clientData.state}/>
                <FormField2 name='zip' label='Zip' value={clientData.zip}/>
                <FormField2 name='country' label='Country' value={clientData.country}/> */}
                <Grid item xs={12} sm={12}>
                    <Button 
                        onClick={handleSubmitClient}  
                        variant="contained"
                    >
                        Save Customer
                    </Button>
                </Grid>

            </Grid>
          </Box>
    </>
  )
}

export default ClientDetails

const FormField = ({name, value, onChange}) => (
    <Grid item xs={12} sm={12}>
         <InputLabel>{name}</InputLabel>
        <TextField required
            fullWidth
            name={name}
            value={value}
            onChange={onChange}
            variant="outlined"
            size="small"
        />
    </Grid>
)

const FormField2 = ({name, value, label, onChange}) => (
    <Grid item xs={12} sm={12}>
        {/* <InputLabel>{name}</InputLabel> */}
        <TextField required
            fullWidth
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            variant="outlined"
            size="small"
        />
    </Grid>
)