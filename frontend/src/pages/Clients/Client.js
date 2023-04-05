import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { clientState } from '../../initialState'
import { getClient } from '../../actions/clientActions'
import { Card, Grid, Box, Avatar, Typography, IconButton } from '@mui/material'

import { getInvoicesByClient } from '../../actions/invoiceActions'

import OrderTable from '../Orders/components/OrderTable'
import AddClient from './components/AddClient'
import AddCircleOutline from '@mui/icons-material/AddCircleOutline'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
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
  },[id])

  useEffect(() => {
    dispatch(getInvoicesByClient(id));
  },[id])

  // console.log(ClientData)

  const editClient= (id) => {
    setOpen((prev) => !prev)
  }

  useEffect(() => {
      if(client) {
          setClientData(client)
      }
  }, [client])

  const data = [
    {
      text: <Typography variant="subtitle2" sx={{fontWeight: 'bold'}}>Profile</Typography>,
    },
    {
      text: <Typography variant="subtitle2" sx={{fontWeight: 'bold'}}>Transactions</Typography>,
    },
    {
      text: <Typography variant="subtitle2" sx={{fontWeight: 'bold'}}>Invoices</Typography>,
    },
  ]

  return (
    <>
    <AddClient setOpen={setOpen} open={open} />
    <Box sx={{ flexGrow: 1 }}>
      <Grid className='ClientContainer' container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 6, md: 6, lg:12 }}>

        <Grid className='ClientItem' item xs={2} sm={6} md={6} lg={6}>
          <Card style={{borderRadius: 10, boxShadow: 3}} sx={{p: 2}}>
          <Grid container>
            <Grid item >
              <Avatar variant="rounded" sx={{ height: '100%', width: '80px' }}></Avatar>
            </Grid>
            <Grid item xs sx={{p: 1}}>
              <Typography variant="h6">{ClientData?.name}</Typography>
              <Typography variant="subtitle2">{ClientData?.email}</Typography>
              <Typography variant="subtitle2">{ClientData?.phone}</Typography>
              <Typography variant="subtitle2">{ClientData?.address}</Typography>

            </Grid>
            <Grid item >
              <IconButton onClick={() => editClient()}>
                <ModeEditIcon/>
              </IconButton>
            </Grid>
          </Grid>
          </Card>
        </Grid>

        {data.map((dat, index) => (
          <Grid className="" item xs={2} sm={6} md={6} key={index}>
            <Card style={{borderRadius: 10, boxShadow: 3}} sx={{p: 2}}>
              {dat.text}
            </Card>
          </Grid>
        ))}


        <Grid item xs sm xl>
          <Card style={{borderRadius: 10, boxShadow: 3}}>
            <OrderTable
              rows={rows}
              head={headCells}
              title='Orders'
            />
          </Card>
        </Grid>

        {/* <Grid item xs sm xl>
          <Card style={{borderRadius: 10, boxShadow: 3}} sx={{p: 2}}>
              <Typography variant="subtitle2" sx={{fontWeight: 'bold'}}>Bill</Typography>
          </Card>
        </Grid> */}


      </Grid>
    </Box>
    </>
  )
}

export default Client