// import moment from 'moment'
import React, { useState, useEffect} from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Avatar, Box, Container, Grid} from '@material-ui/core';
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
        <Grid container rowspacing={2}>
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

    <div>
    <Container style={{width: '90%'}} >
      <Grid container spacing={2}>
        <Grid item xs={4}>
        <Box sx={{m: 3}}>
          <Paper>
              <Grid container>
                <Grid>
                  <Box sx={{m: 2}}>
                    <Avatar sx={{ width: 56, height: 56 }}></Avatar>
                    <Typography variant="h6">{ClientData?.name}</Typography>
                  </Box>
                </Grid>         
              </Grid>
            <Dropdown title="Client Details" data={ClientDetails}/>
            <Dropdown title="Notes"/>
          </Paper>
        </Box>
        </Grid>
        <Grid item xs={8}>
          <Box sx={{m: 3}}>
            <Paper>
              <Dropdown title="Stats" />
            </Paper>
          </Box>
          <Box sx={{m: 3}}>
            <Paper>
              <Dropdown title="Orders" data={<CustomerInvoices id={id} />}>
              </Dropdown>
            </Paper>
          </Box>

          <Box sx={{m: 3}}>
            <Paper>
              <Dropdown title="Transactions" data={<Transactions id={id} />}>
              </Dropdown>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  </div>
  );
}

export default Client