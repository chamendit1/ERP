 /* eslint-disable */
import React, { useState, useEffect} from 'react'
import { getClientsByUser } from '../../actions/clientActions'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import NoData from '../../components/svgIcons/NoData'
import Spinner from '../../components/Spinner/Spinner'
import { Box, Container, Grid, Paper} from '@material-ui/core';
import Table from '../../components/Table/Table'
//import clients from  '../clients.json'

  const headCells = [

    {
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: 'Full Name',
    },
    {
      id: 'email',
      numeric: false,
      disablePadding: false,
      label: 'Email',
    },
    {
      id: 'phonenumber',
      numeric: true,
      disablePadding: false,
      label: 'Phone Number',
    },
    {
      id: 'status',
      numeric: false,
      disablePadding: false,
      label: 'Status',
    },
  ];


 const Clients = () => {
 
  const history = useHistory()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [currentId, setCurrentId] = useState(null)
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  const isLoading = useSelector(state => state.clients.isLoading)
  //Get Clients from Backend
  const {clients} = useSelector((state) => state.clients)
 
 useEffect(() => {
     dispatch(getClientsByUser({ search: user?.result?._id || user?.result?.googleId }));
   },[location, dispatch])
 
   if(!user) {
     history.push('/login')
   }

   console.log(clients)
 
 
   if(clients.length === 0) {
     return  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px', margin: '80px'}}>
       <NoData />
     <p style={{padding: '40px', color: 'gray', textAlign: 'center'}}>No customers yet. Click the plus icon to add customer</p>
   
     </div>
   }
 
     return (
              <div>
                <Container style={{width: '85%'}}>
                  <Box sx={{m: 2}}>
                    <Paper>
                    </Paper>
                  </Box>
                </Container>

                <Table
                    open={open} 
                    setOpen={setOpen}
                    currentId={currentId}
                    setCurrentId={setCurrentId}
                    rows={clients}
                    head={headCells}
                />
              </div>
     )
 }
 
 export default Clients
