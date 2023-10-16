import React, { useState, useEffect} from 'react'
import { Route, Routes, useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { clientState } from '../../initialState'
import { getClient } from '../../actions/clientActions'
import { Card, Grid, Box, Avatar, Typography, IconButton, ButtonGroup, Button } from '@mui/material'

import { getInvoicesByClient } from '../../actions/invoiceActions'

import OrderTable from '../Orders/components/OrderTable'
import AddClient from './components/AddClient'
import ClientCard from './components/ClientCard'
import ClientDetails from './components/ClientDetails'
// import AddCircleOutline from '@mui/icons-material/AddCircleOutline'

const headCells = [
  // {
  //   id: 'ID',
  //   numeric: false,
  //   label: 'ID',
  // },
  {
    id: 'Date',
    numeric: true,
    label: 'Date',
  },
  {
    id: 'status',
    numeric: true,
    label: 'Status',
  },
  {
    id: 'name',
    numeric: false,
    label: 'Customer',
  },
  {
    id: 'due',
    numeric: true,
    label: 'Due Date',
  },
  {
    id: 'amount',
    numeric: true,
    label: 'Amount',
  },
  // {
  //   label: 'Edit',
  // },
  // {
  //   label: 'Delete',
  // },
];

const Client = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  //const user = JSON.parse(localStorage.getItem('profile'))
  const [ClientData, setClientData] = useState(clientState)
  const {client} = useSelector((state) => state.clients)
  const [open, setOpen] = useState(false)
  const rows = useSelector(state => state.invoices.invoices)

  useEffect(() => {
    dispatch(getClient(id));
  },[id, dispatch])

  useEffect(() => {
    dispatch(getInvoicesByClient(id));
  },[id])

  useEffect(() => {
    if(client) {
      setClientData(client)
    }
  }, [client])


  return (
    <>
      <AddClient setOpen={setOpen} open={open} />


      
        <Grid container spacing={{ xs: 1, md: 1 }}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {/* Main */}
            <Typography variant="h6">{ClientData?.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={2}>
            <ClientCard ClientData={ClientData} />
          </Grid> 







          
          <Grid item xs={12} sm={9} md={9} lg={10}>
            <Grid container>
                <Card style={{backgroundColor: 'white', borderRadius: 10, boxShadow: 3}}>
                  <ButtonGroup variant="text" aria-label="text button group">
                    <Button component={Link} to="./">Details</Button>
                    <Button component={Link} to="./order">Orders</Button>
                  </ButtonGroup>

                  <Routes>
                    <Route 
                      path="/" 
                      element={<ClientDetails client={client}/>}
                    />
                    <Route path="/order" 
                      element={<OrderTable 
                      rows={rows} 
                      head={headCells}
                      title='Orders' />}/>
                  </Routes>
                  </Card>
            </Grid>
          </Grid>
        </Grid>
    </>
  )
}

export default Client

  // const data = [
  //   {
  //     text: <Typography variant="subtitle2" sx={{fontWeight: 'bold'}}>Profile</Typography>,
  //   },
  //   {
  //     text: <Typography variant="subtitle2" sx={{fontWeight: 'bold'}}>Transactions</Typography>,
  //   },
  //   {
  //     text: <Typography variant="subtitle2" sx={{fontWeight: 'bold'}}>Invoices</Typography>,
  //   },
  // ]

      {/* 
        {data.map((dat, index) => (
          <Grid className="" item xs={2} sm={6} md={6} key={index}>
            <Card style={{borderRadius: 10, boxShadow: 3}} sx={{p: 2}}>
              {dat.text}
            </Card>
          </Grid>
        ))} 
      */}

      {/* 
        <Grid item xs sm xl>
          <Card style={{borderRadius: 10, boxShadow: 3}} sx={{p: 2}}>
              <Typography variant="subtitle2" sx={{fontWeight: 'bold'}}>Bill</Typography>
          </Card>
        </Grid> 
      */}