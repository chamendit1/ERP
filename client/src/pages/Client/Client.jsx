// import moment from 'moment'
import React, { useState, useEffect} from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Avatar, Box, Card, Container, Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


import Dropdown from '../../components/Dropdown/Dropdown';

import { clientState } from '../../initialState'
import { getClient} from '../../actions/clientActions'


import CustomerInvoices from '../../components/Invoices/CustomerInvoices';
import Transactions from '../../components/Transactions/Transactions';



const Client = () => {
  
    const dispatch = useDispatch()
    //const user = JSON.parse(localStorage.getItem('profile'))
    const { id } = useParams()
    const [ClientData, setClientData] = useState(clientState)
    const {client} = useSelector((state) => state.clients)
    
    useEffect(() => {
        dispatch(getClient(id));
    },[id])
    console.log(client)

    useEffect(() => {
        if(client) {
            //Automatically set the default invoice values as the ones in the invoice to be updated
            setClientData(client)
        }
    }, [client])

    const ClientDetails = () => {
        <Grid container rowspacing={2} >
        <Grid item xs={6}>
          <Box sx={{m: 2}}>
            <Typography variant="body2">Name</Typography>
            <Typography variant="body2">Email</Typography>
            <Typography variant="body2">Phone</Typography>
            <Typography variant="body2">Address</Typography>
          </Box>
        </Grid>         
        <Grid item xs={6}>
        <Box sx={{m: 2}}>
          <Typography variant="body2">{ClientData?.name}</Typography>
          <Typography variant="body2" >{ClientData?.email}</Typography>
          <Typography variant="body2" >{ClientData?.phone}</Typography>
          <Typography variant="body2">{ClientData?.address}</Typography>
        </Box>
        </Grid>
      </Grid>
    }
  return (
    <Box py={3}>
      <Box mb={3}>
        <Grid container spacing={0} style={{border: '2px solid green'}}>
          
          <Grid item xs={12} sm={6} xl={3}>
            <Box sx={{m: 3}}>
              <Card style={{borderRadius: 10, boxShadow: 3}}>
                <Box sx={{m: 2}}>
                  <Avatar variant="rounded" sx={{ height: '70px', width: '70px' }}></Avatar>
                  <Typography variant="h6">{ClientData?.name}</Typography>
                </Box>
                <Box sx={{m: 2}}>
                  <Typography variant="subtitle2" style={{color: 'gray'}}>Email</Typography>
                  <Typography variant="body2" >{ClientData?.email}</Typography>
                  <Typography variant="subtitle2" style={{color: 'gray'}}>Phone</Typography>
                  <Typography variant="body2" >{ClientData?.phone}</Typography>
                  <Typography variant="subtitle2" style={{color: 'gray'}}>Address</Typography>
                  <Typography variant="body2">{ClientData?.address}</Typography>
                </Box>
              </Card>
            </Box>
            <Box sx={{m: 3}}>
              <Card style={{borderRadius: 10, boxShadow: 3}}>
                <Box sx={{m: 2}}>
                  <Typography
                      sx={{ flex: '1 1 100%' }}
                      variant="h6"
                      id="tableTitle"
                      component="div"
                    >Notes</Typography>
                </Box>
              </Card>
            </Box>
            
              
                
              
              
            
          </Grid>


          {/* Right Side */}
          <Grid item xs={12} sm={6}>
            <Box sx={{m: 3}}>
              <Card style={{borderRadius: 10, boxShadow: 3}}>
                <Box sx={{m: 2}}>
                  <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                  >Orders</Typography>
                </Box>
                <Box sx={{m: 2}}>
                  <CustomerInvoices id={id} />
                </Box>
              </Card>
            </Box>
            {/* <Box sx={{m: 3}}>
              <Card style={{borderRadius: 10, boxShadow: 3}}>
                <Box sx={{m: 2}}>
                  <Transactions id={id} />
                </Box>
              </Card>
            </Box> */}
            
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Client