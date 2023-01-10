import React,  { useEffect, useState }  from 'react'
import { useNavigate, Link, Navigate, useLocation } from 'react-router-dom'
import { Avatar, Button, Grid, Typography, Box, Select, MenuItem, InputLabel, OutlinedInput, FormControl, FormGroup, FormControlLabel, Checkbox} from '@mui/material'
import AddTransaction from './components/AddTransaction'
import { useDispatch, useSelector } from 'react-redux'
import { getTransactions } from '../../actions/transactionActions'
import Table from './components/Table'
const headCells = [

  {
    id: 'Date',
    type: 'main',
    numeric: false,
    label: 'Date',
  },
  {
    id: 'Description',
    type: 'main',
    numeric: false,
    label: 'Description',
  },
  {
    id: 'Amount',
    type: 'main',
    numeric: true,
    label: 'Amount',
  },
  {
    id: 'Payment',
    type: 'main',
    numeric: true,
    label: 'Payment',
  },
  {
    id: 'Category',
    type: 'main',
    numeric: true,
    label: 'Category',
  },
  {
    id: 'edit',
    type: '',
    label: 'Edit',
  },
  {
    id: 'delete',
    type: '',
    label: 'Delete',
  },
];
const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const { transactions } = useSelector((state) => state.transactions)
  // console.log(useSelector((state) => state.transactions))

  useEffect(() => {
    dispatch(getTransactions());
  },[location, dispatch])


  return (
    <Grid container>
      {/* <Grid item xs={12} height={'10vh'}>
      </Grid> */}
      <AddTransaction setOpen={setOpen} open={open} />
      <Grid item xs={12} >
        <Button variant="outlined" onClick={() => setOpen((prev) => !prev) }> Add AddTransaction</Button>
        <Table
          rows={transactions}
          head={headCells}
        />
      </Grid>
      <Grid item xs={12} >
        {/* components */}

      </Grid>

  </Grid>
  )
}

export default Index