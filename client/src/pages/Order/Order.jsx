// import moment from 'moment'
import React, { useState, useEffect} from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { toCommas } from '../../utils/utils'


import { Avatar, Box, Container, Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import moment from 'moment'

import Dropdown from '../../components/Dropdown/Dropdown';

import { initialState } from '../../initialState'
import { getInvoice, updateInvoice } from '../../actions/invoiceActions'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import InputBase from '@material-ui/core/InputBase';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import Modal from '../../components/Payments/Modal'
import axios from 'axios';
import { saveAs } from 'file-saver';
import AddOrder from './AddOrder'
import PaymentHistory from '../../components/InvoiceDetails/PaymentHistory'
import Morder from '../Morder';
import Invoice from '../Invoice';
import Dorder from '../Dorder';
import { useSnackbar } from 'react-simple-snackbar'

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


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
    const history = useHistory()
    const [status, setStatus ] = useState('')
    const [orderStatus, setOrderStatus ] = useState(0)
    const [total, setTotal] = useState(0)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [downloadStatus, setDownloadStatus] = useState(null)
    const [company, setCompany] = useState({})

    const [morderOpen, setMOrderOpen] = useState(false)
    const [dorderOpen, setDOrderOpen] = useState(false)
    const [invoiceOpen, setInvoiceOpen] = useState(false)
    const [openSnackbar, closeSnackbar] = useSnackbar()


    
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
  
          saveAs(pdfBlob, 'invoice.pdf')
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
        <ButtonGroup orientation="vertical" variant="contained" aria-label="outlined primary button group">
          <Button onClick={() => goMorder(invoiceData._id)}>Manufacturing Order</Button>
          <Button onClick={() => goInvoice(invoiceData._id)}>Invoice</Button>
          <Button onClick={() => goDorder(invoiceData._id)}>Surat Jalan</Button>
          <Button>Kwitansi</Button>
        </ButtonGroup>
      )
    }

    const steps = [
      'New',
      'Pabrik',
      'Delivery',
      'Arrived',
      'Tagih',
      'Selesai',
    ];

    const Steps = () => {
      return (
        <Box sx={{ width: '100%' }}>
        <Stepper activeStep={orderStatus} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      )
    }
    const [open, setOpen ] = useState(false)
    const editInvoice = (id) => {
      // history.push(`/edit/order/${id}`)
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
       }, openSnackbar)) 
    }
    console.log(orderStatus)
    function checkOrderStatus() {
      return orderStatus === 0 ? "Proses Order"
            : orderStatus === 1 ? "Kirim"
            : orderStatus === 2 ? "Arrived"
            : orderStatus === 3 ? "Tagih"
            : orderStatus === 4 ? "Selesai"
            : "Error";
    }



  return (
    <div>
    <AddOrder setOpen={setOrderOpen} open={orderOpen} />
    <Morder setOpen={setMOrderOpen} open={morderOpen} />
    <Dorder setOpen={setDOrderOpen} open={dorderOpen} />
    <Invoice setOpen={setInvoiceOpen} open={invoiceOpen} />
    <Container style={{width: '90%'}} >
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box sx={{m: 3}}>
            <Paper>
                <Grid container>
                    <Box sx={{m: 2}}>
                      <Typography variant="h6">Order ID: {invoiceData.invoiceNumber}</Typography>
                      <Typography variant="subtitle2" >Order Date: {moment(invoiceData.createdAt).format("Do MMM YYYY")}</Typography>
                      <Typography variant="subtitle2" style={{color: 'gray'}}>Payment Status</Typography>
                      <Typography variant="subtitle2" style={{color: checkStatus()}}>{totalAmountReceived >= total ? 'Paid':status}</Typography>
                      <Typography variant="subtitle2" style={{color: 'gray'}}>Due Date</Typography>
                      <Typography variant="subtitle2" >{selectedDate? moment(selectedDate).format("MMM Do YYYY") : '27th Sep 2021'}</Typography>
                    </Box>        
                </Grid>
            </Paper>
          </Box>

          <Box sx={{m: 3}}>
              <Generate />
          </Box>

          <Box sx={{m: 3}}>
            <ButtonGroup orientation="vertical" variant="contained" aria-label="outlined primary button group">
              <Button onClick={createAndDownloadPdf}>Generate Invoice</Button>
              <Button onClick={() => setOpen((prev) => !prev)}>Record Payment</Button>
              <Button onClick={() => editInvoice(invoiceData._id)}>Edit Order</Button>
              <Button onClick={() => goInvoice(invoiceData._id)}>Invoice</Button>
            </ButtonGroup>
          </Box>
          

        </Grid>
        
        <Grid item xs={8}>

        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button onClick={() => processOrder()}>{checkOrderStatus()}</Button>
          <Button onClick={() => redoOrder()}>Redo (Admin)</Button>
        </ButtonGroup>


          <Box sx={{m: 3}}>
            <Paper>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell >Qty</TableCell>
                        <TableCell>Price</TableCell>
                        {/* <TableCell >Disc(%)</TableCell> */}
                        <TableCell >Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {invoiceData?.items?.map((itemField, index) => (
                    <TableRow key={index}>
                        <TableCell  scope="row" style={{width: '40%' }}> {itemField.itemName}</TableCell>
                        <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="quantity" value={itemField?.quantity} placeholder="0" readOnly /> </TableCell>
                        <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="unitPrice" value={itemField?.unitPrice} placeholder="0" readOnly /> </TableCell>
                        {/* <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="discount"  value={itemField?.discount} readOnly /> </TableCell> */}
                        <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="amount"  value={((itemField?.quantity * itemField.unitPrice) - (itemField.quantity * itemField.unitPrice) * itemField.discount / 100)} readOnly /> </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
            </Paper>
          </Box>

          {/* <Box sx={{m: 3}}>
            <Paper>
              <Typography>Manfacturing Order</Typography>
            </Paper>
          </Box>

          <Box sx={{m: 3}}>
            <Paper>
              <Grid container>
                <Box sx={{m: 2}}>
                  <Typography variant="h6" gutterBottom>Invoice Summary</Typography>
                  <Typography variant="subtitle2" >Subtotal: {subTotal}</Typography>
                  <Typography variant="subtitle2" >{`VAT(${rates}%):`} {vat}</Typography>
                  <Typography variant="subtitle2" >Total : {currency} {toCommas(total)}</Typography>
                  <Typography variant="subtitle2" >Paid: {currency} {toCommas(totalAmountReceived)}</Typography>
                  <Typography variant="subtitle2" >Balance : {currency} {toCommas(total - totalAmountReceived)}</Typography>
                </Box>
              </Grid>
            </Paper>
          </Box> */}

          <Box sx={{m: 3}}>
            <Paper>
              {invoice?.paymentRecords.length !== 0 && (
                <PaymentHistory paymentRecords={invoiceData?.paymentRecords} subtotal={subTotal} createdAt={invoiceData.createdAt}/>
              )}
            </Paper>
          </Box>

          <Box sx={{m: 3}}>
            <Paper>
                <Grid container>
                    <Box sx={{m: 2}}>
                      <Typography variant="h6">Manufacturing Order</Typography>
                      <Typography variant="subtitle2" >Order Date: {moment(invoiceData.createdAt).format("Do MMM YYYY")}</Typography>
                      <Typography variant="subtitle2" style={{color: 'gray'}}>Order Status</Typography>
                      <Steps/>
                      <Typography variant="subtitle2" style={{color: 'gray'}}>Due Date</Typography>
                      <Typography variant="subtitle2" >{selectedDate? moment(selectedDate).format("MMM Do YYYY") : '27th Sep 2021'}</Typography>
                    </Box>        
                </Grid>
            </Paper>
          </Box>
          
        </Grid>
      </Grid>
      <Modal open={open} setOpen={setOpen} invoice={invoiceData}/>
    </Container>
  </div>
  );
}

export default Order