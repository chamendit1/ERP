import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { clientState } from '../../initialState'
import { getClient } from '../../actions/clientActions'
import { Card, Grid, Box, Avatar, Typography } from '@mui/material'

import { getInvoicesByClient } from '../../actions/invoiceActions'

import OrderTable from '../Orders/components/OrderTable'

const headCells = [

  {
    id: 'name',
    numeric: false,
    label: 'Name',
  },
  {
    id: 'email',
    numeric: false,
    label: 'Email',
  },
  {
    id: 'amount',
    numeric: true,
    label: 'Amount',
  },
  {
    id: 'due',
    numeric: true,
    label: 'Due Date',
  },
  {
    id: 'status',
    numeric: true,
    label: 'Status',
  },
  {
    label: 'Edit',
  },
  {
    label: 'Delete',
  },
];

const Client = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  //const user = JSON.parse(localStorage.getItem('profile'))
  const [ClientData, setClientData] = useState(clientState)
  const {client} = useSelector((state) => state.clients)
  const rows = useSelector(state => state.invoices.invoices)


  useEffect(() => {
    dispatch(getClient(id));
  },[id])

  useEffect(() => {
    dispatch(getInvoicesByClient(id));
  },[id])

  console.log(ClientData)

  useEffect(() => {
      if(client) {
          setClientData(client)
      }
  }, [client])

  return (
    <>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} xl={12}>
        <Card style={{borderRadius: 10, boxShadow: 3}} sx={{p: 2}}>
        <Grid container>
          <Grid item >
            <Avatar variant="rounded" sx={{ height: '100%', width: '80px' }}></Avatar>
          </Grid>
          <Grid item xs sx={{p: 1}}>
            <Typography variant="h6">{ClientData?.name}</Typography>
            <Typography variant="subtitle2">{ClientData?.email}</Typography>
            <Typography variant="subtitle2">{ClientData?.phone}</Typography>
          </Grid>
        </Grid>


        </Card>
      </Grid>

      <Grid item xs={12} sm={4} xl={4}>
        <Card style={{borderRadius: 10, boxShadow: 3}} sx={{p: 2}}>
          <Typography variant="subtitle2" sx={{fontWeight: 'bold'}}>Profile</Typography>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4} xl={4}>
        <Card style={{borderRadius: 10, boxShadow: 3}} sx={{p: 2}}>
          <Typography variant="subtitle2" sx={{fontWeight: 'bold'}}>Transactions</Typography>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4} xl={4}>
        <Card style={{borderRadius: 10, boxShadow: 3}} sx={{p: 2}}>
            <Typography variant="subtitle2" sx={{fontWeight: 'bold'}}>Invoices</Typography>
        </Card>
      </Grid>

      <Grid item xs sm xl>
        <Card style={{borderRadius: 10, boxShadow: 3}}>
          <Box sx={{m: 2}}>
            <Typography variant="subtitle2" sx={{fontWeight: 'bold'}}>Orders</Typography>
          </Box>
          <OrderTable
            rows={rows}
            head={headCells}
          />
        </Card>
      </Grid>
    </Grid>
    </>
  )
}

export default Client