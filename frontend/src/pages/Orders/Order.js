// import moment from 'moment'
import React, { useState, useEffect} from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
// import { toCommas } from '../../utils/utils'


import { Avatar, Box, Card, Container, Grid} from '@mui/material';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import moment from 'moment'

// import Dropdown from '../../components/Dropdown/Dropdown';

import { initialState } from '../../initialState'
import { getInvoice, updateInvoice } from '../../actions/invoiceActions'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InputBase from '@mui/material/InputBase';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import Modal from '../../components/Payments/Modal'
import axios from 'axios';
// import { saveAs } from 'file-saver';
// import AddOrder from './AddOrder'
import PaymentHistory from './components/PaymentHistory'
// import Morder from '../Morder';
// import Invoice from '../Invoice';
// import Dorder from '../Dorder';
// import { useSnackbar } from 'react-simple-snackbar'

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const toCommas = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const Order = () => {
  
    const dispatch = useDispatch()
    //const user = JSON.parse(localStorage.getItem('profile'))
    const { id } = useParams()
    const [invoiceData, setInvoiceData] = useState(initialState)
    const { invoice } = useSelector((state) => state.invoices)
    const [currency, setCurrency] = useState('')
    const [subTotal, setSubTotal] = useState(0)
    const [rates, setRates] = useState(0)
    const [vat, setVat] = useState(0)
    const [client, setClient] = useState([])
    const [type, setType] = React.useState('')
    const [orderOpen, setOrderOpen] = useState(false)
    const navigate = useNavigate()
    const [status, setStatus ] = useState('')
    const [orderStatus, setOrderStatus ] = useState(0)
    const [total, setTotal] = useState(0)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [downloadStatus, setDownloadStatus] = useState(null)
    const [company, setCompany] = useState({})
    const [open, setOpen ] = useState(false)
    const [morderOpen, setMOrderOpen] = useState(false)
    const [dorderOpen, setDOrderOpen] = useState(false)
    const [invoiceOpen, setInvoiceOpen] = useState(false)
    // const [openSnackbar, closeSnackbar] = useSnackbar()

console.log(useSelector((state) => state.invoices))
    
    useEffect(() => {
        dispatch(getInvoice(id));
    },[id])

    useEffect(() => {
        if(invoice) {
          setInvoiceData(invoice)
          setRates(invoice.rates)
          setClient(invoice.client)
          setType(invoice.type)
          setStatus(invoice.status)
          setSelectedDate(invoice.dueDate)
          setVat(invoice.vat)
          setCurrency(invoice.currency)
          setSubTotal(invoice.subTotal)
          setTotal(invoice.total)
          setCompany(invoice?.businessDetails?.data?.data)
          setOrderStatus(invoice.orderStatus)
        }
    }, [invoice])

    const createAndDownloadPdf = () => {
      setDownloadStatus('loading')
      axios.post(`${process.env.REACT_APP_API}/create-pdf`, 
      { name: invoice.client.name,
        address: invoice.client.address,
        phone: invoice.client.phone,
        email: invoice.client.email,
        dueDate: invoice.dueDate,
        date: invoice.createdAt,
        id: invoice.invoiceNumber,
        notes: invoice.notes,
        subTotal: toCommas(invoice.subTotal),
        total: toCommas(invoice.total),
        type: invoice.type,
        vat: invoice.vat,
        items: invoice.items,
        status: invoice.status,
        totalAmountReceived: toCommas(totalAmountReceived),
        balanceDue: toCommas(total - totalAmountReceived),
        company: company,
    })
        .then(() => axios.get(`${process.env.REACT_APP_API}/fetch-pdf`, { responseType: 'blob' }))
        .then((res) => {
          const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
  
          // saveAs(pdfBlob, 'invoice.pdf')
        }).then(() =>  setDownloadStatus('success'))
    }

    let totalAmountReceived = 0
    for(var i = 0; i < invoice?.paymentRecords?.length; i++) {
        totalAmountReceived += Number(invoice?.paymentRecords[i]?.amountPaid)
    }

    function checkStatus() {
        return totalAmountReceived >= total ? "green"
             : status === "Partial" ? "#1976d2"
             : status === "Paid" ? "green"
             : status === "Unpaid" ? "red"
             : "red";
    }



    const Generate = () => {
      return(
        <ButtonGroup orientation="horizontal" variant="contained" size="small" fullWidth={true}>
          <Button onClick={() => goMorder(invoiceData._id)}>Manufacturing Order</Button>
          <Button onClick={() => goInvoice(invoiceData._id)}>Invoice</Button>
          <Button onClick={() => goDorder(invoiceData._id)}>Surat Jalan</Button>
          <Button>Kwitansi</Button>
          <Button onClick={createAndDownloadPdf}>Generate Invoice</Button>
          <Button onClick={() => setOpen((prev) => !prev)}>Record Payment</Button>
          <Button onClick={() => editInvoice(invoiceData._id)}>Edit Order</Button>
        </ButtonGroup>
      )
    }


    const steps = [
      'Quotation',
      'Purchase Order',
      'Manufacturing Order',
      'Delivery',
      'Bill',
      'Selesai',
    ];

    const Steps = () => {
      return (
        <Box sx={{ width: '100%' }}>
        <Stepper activeStep={orderStatus} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel optional={
                index === 5 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null}
              >
                <Typography variant="subtitle2" style={{fontWeight: 'bold'}}>{label}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      )
    }

    const editInvoice = (id) => {
      // navigate(`/edit/order/${id}`)
      setOrderOpen((prev) => !prev)
    }
    const goInvoice = (id) => {
      setInvoiceOpen((prev) => !prev)
    }

    const goMorder = (id) => {
      setMOrderOpen((prev) => !prev)
    }

    const goDorder = (id) => {
      setDOrderOpen((prev) => !prev)
    }

    const processOrder = () => {
      setOrderStatus(orderStatus+1);
      updateOrder();
    }
    const redoOrder = () => {
      if( orderStatus > 0)
      setOrderStatus(orderStatus-1);
      updateOrder();
    }

    const updateOrder = () => {
      dispatch(updateInvoice( invoice._id, {
        ...invoiceData, 
        orderStatus: orderStatus 
       })) 
    }
    console.log(orderStatus)
    function checkOrderStatus() {
      return orderStatus === 0 ? "Quotation"
            : orderStatus === 1 ? "PO"
            : orderStatus === 2 ? "MO"
            : orderStatus === 3 ? "Delivery"
            : orderStatus === 4 ? "Bill"
            : orderStatus === 5 ? "Selesai"
            : "Error";
    }

    console.log(invoiceData)

  return (
    <Box>
    {/* <AddOrder setOpen={setOrderOpen} open={orderOpen} />
    <Morder setOpen={setMOrderOpen} open={morderOpen} />
    <Dorder setOpen={setDOrderOpen} open={dorderOpen} />
    <Invoice setOpen={setInvoiceOpen} open={invoiceOpen} /> */}
     <Modal open={open} setOpen={setOpen} invoice={invoiceData}/>
     <Grid container>
      <Grid item xs={3} spacing={2}>
          <Box sx={{m: 1}}>
          <Typography variant="h4" style={{fontWeight: 'bold'}}>Order #{invoiceData.invoiceNumber}</Typography>
          </Box>
      </Grid>
      <Grid item xs={9}>
          <Box sx={{m: 1}}>
            <Generate />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>

        
        {/* Left Grid */}
        <Grid item xs={9}>
            <Grid container spacing={2}>
              {/* Order Details */}
              <Grid item xs={12}>
              <Card style={{borderRadius: 10, boxShadow: 3}}>
                <Box sx={{m: 2}}>
                  <Typography variant="subtitle2" >Order Date: {moment(invoiceData.createdAt).format("Do MMM YYYY")}</Typography>
                  <Typography variant="subtitle2" style={{color: 'gray'}}>Payment Status</Typography>
                  <Typography variant="subtitle2" style={{color: checkStatus()}}>{totalAmountReceived >= total ? 'Paid':status}</Typography>
                  <Typography variant="subtitle2" style={{color: 'gray'}}>Due Date</Typography>
                  <Typography variant="subtitle2" >{selectedDate? moment(selectedDate).format("MMM Do YYYY") : '27th Sep 2021'}</Typography>
                </Box>
                
                <Box sx={{m: 2}}><Button> Invoice </Button></Box>
              </Card>
              </Grid>
              {/* Table */}
              <Grid item xs={12}>
                <Card style={{borderRadius: 10, boxShadow: 3}}>
                  <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell >Qty</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell >Disc(%)</TableCell>
                            <TableCell >Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                      {invoiceData?.items?.map((itemField, index) => (
                        <TableRow key={index}>
                            <TableCell  scope="row" style={{width: '30%' }}> {itemField.itemName}</TableCell>
                            <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="quantity" value={itemField?.quantity} placeholder="0" readOnly /> </TableCell>
                            <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="unitPrice" value={itemField?.unitPrice} placeholder="0" readOnly /> </TableCell>
                            <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="discount"  value={itemField?.discount} readOnly /> </TableCell>
                            <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="amount"  value={((itemField?.quantity * itemField.unitPrice) - (itemField.quantity * itemField.unitPrice) * itemField.discount / 100)} readOnly /> </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </Grid>



              <Grid item xs={12}>
                <Card style={{borderRadius: 10, boxShadow: 3}}>
                <Box sx={{m: 2}}>
                <Typography variant="h6" style={{fontWeight: 'bold'}}> Payment History</Typography>
                </Box>
                  {invoice?.paymentRecords.length !== 0 && (
                    <PaymentHistory paymentRecords={invoiceData?.paymentRecords} subtotal={subTotal} createdAt={invoiceData.createdAt}/>
                  )}
                </Card>
              </Grid>
            </Grid>
        </Grid>

        {/* Right Grid */}
        <Grid item xs={3}>
          <Grid container spacing={2}>
            {/* invoice Summary */}
            <Grid item xs={12}>
              <Card style={{borderRadius: 10, boxShadow: 3}} sx={{p:2}}>
                <Box>
                  <Typography variant="h6" style={{fontWeight: 'bold'}} gutterBottom>Invoice Summary</Typography>
                </Box>
                <Grid container>
                  <Grid item xs>
                    <Box>
                      <Typography variant="subtitle2" style={{color: 'gray'}}>Subtotal:</Typography>
                      <Typography variant="subtitle2" style={{color: 'gray'}}>{`VAT(${rates}%):`} </Typography>
                      <Typography variant="subtitle2" style={{color: 'gray'}}>Total : </Typography>
                      <Typography variant="subtitle2" style={{color: 'gray'}}>Paid: </Typography>
                      <Typography variant="subtitle2" style={{color: 'gray'}}>Balance : </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs>
                    <Box>
                      <Typography  variant="subtitle2" style={{fontWeight: 'bold'}}>{subTotal}</Typography>
                      <Typography  variant="subtitle2" style={{fontWeight: 'bold'}}>{vat}</Typography>
                      <Typography  variant="subtitle2" style={{fontWeight: 'bold'}}>{currency} {toCommas(total)}</Typography>
                      <Typography  variant="subtitle2" style={{fontWeight: 'bold'}}>{currency} {toCommas(totalAmountReceived)}</Typography>
                      <Typography  variant="subtitle2" style={{fontWeight: 'bold'}}>{currency} {Math.round((total - totalAmountReceived)*100)/100}</Typography>
                    </Box>
                    </Grid>
                </Grid>
              </Card>
            </Grid>
            {/* Track Order */}
            <Grid item>
            <Card style={{borderRadius: 10, boxShadow: 3}}>
            <Box sx={{p: 2}}>
              <Box display='flex' justifyContent='space-between' >
                <Typography variant="h6" style={{fontWeight: 'bold'}} gutterBottom>Track Order</Typography>
                {/* <Button onClick={() => processOrder()}>{checkOrderStatus()}</Button>
                <Button onClick={() => redoOrder()}>Redo</Button> */}
              </Box>
              <Box display='flex' justifyContent='space-between' >
                {/* <Typography>Admin</Typography> */}
                <Button onClick={() => processOrder()}>{checkOrderStatus()}</Button>
                <Button onClick={() => redoOrder()}>Redo</Button>
              </Box>
              <Steps/>
            </Box>
            </Card>
            </Grid>

          </Grid>
        </Grid>

      </Grid>
    </Box>
  );
}

export default Order