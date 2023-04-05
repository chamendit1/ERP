// import moment from 'moment'
import React, { useState, useEffect} from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'


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
import { saveAs } from 'file-saver';
import AddOrder from './components/AddOrder';
import PaymentHistory from './components/PaymentHistory'
// import Morder from '../Morder';
// import Invoice from '../Invoice';
// import Dorder from '../Dorder';
// import { useSnackbar } from 'react-simple-snackbar'

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import numberToText from 'number-to-text/converters/id'





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
    const [totalText, setTotalText] = useState('')
    const [totalFormat, setTotalFormat] = useState('')
    const [notes, setNotes] = useState('')
    const [morderOpen, setMOrderOpen] = useState(false)
    const [dorderOpen, setDOrderOpen] = useState(false)
    const [invoiceOpen, setInvoiceOpen] = useState(false)
    // const [openSnackbar, closeSnackbar] = useSnackbar()
    
    useEffect(() => {
        dispatch(getInvoice(id));
    },[id, orderOpen])

    const toCommas = (value) => {
      // console.log(value)
      return value.toString()
    }
    function currencyFormat(num) {
      return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
   }

    useEffect(() => {
      
        if(Object.keys(invoice).length !== 0) {
          // console.log(invoice)
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
          setTotalText(numberToText.convertToText(invoice.total))
          setTotalFormat(currencyFormat(invoice.total))
        }
    }, [invoice])

    let totalAmountReceived = 0
    for(var i = 0; i < invoice?.paymentRecords?.length; i++) {
        totalAmountReceived += Number(invoice?.paymentRecords[i]?.amountPaid)
    }
    // console.log(invoice.notes)

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
        totalText: totalText,
        totalFormat: totalFormat,
    })
        .then(() => axios.get(`${process.env.REACT_APP_API}/fetch-pdf`, { responseType: 'blob' }))
        .then((res) => {
          const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
          
          // saveAs(pdfBlob, 'invoice.pdf')
        }).then(() =>  { 
          window.open('http://www.localhost:5001/fetch-pdf') 
          setDownloadStatus('success')
        })
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
          {/* <Button onClick={() => goMorder(invoiceData._id)}>Manufacturing Order</Button> */}
          {/* <Button onClick={() => goInvoice(invoiceData._id)}>Invoice</Button> */}
          <Button onClick={() => goDorder(invoiceData._id)}>Faktur</Button>
          {/* <Button>Kwitansi</Button> */}
          <Button onClick={createAndDownloadPdf}>Surat Jalan</Button>
          {/* <Button onClick={() => setOpen((prev) => !prev)}>Record Payment</Button> */}
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

    function checkOrderStatus() {
      return orderStatus === 0 ? "Quotation"
            : orderStatus === 1 ? "PO"
            : orderStatus === 2 ? "MO"
            : orderStatus === 3 ? "Delivery"
            : orderStatus === 4 ? "Bill"
            : orderStatus === 5 ? "Selesai"
            : "Error";
    }

    const OrderDetails= () => {
      return (
        <Box sx={{m: 2}}>
          <Typography variant="h6" style={{fontWeight: 'bold'}}>Order #{invoiceData.invoiceNumber}</Typography>
          <Typography variant="subtitle2" >Order Date: {moment(invoiceData.createdAt).format("Do MMM YYYY")}</Typography>
          <Typography variant="subtitle2" style={{color: 'gray'}}>Payment Status</Typography>
          <Typography variant="subtitle2" style={{color: checkStatus()}}>{totalAmountReceived >= total ? 'Paid':status}</Typography>
          <Typography variant="subtitle2" style={{color: 'gray'}}>Due Date</Typography>
          <Typography variant="subtitle2" >{selectedDate? moment(selectedDate).format("MMM Do YYYY") : '27th Sep 2021'}</Typography>
        </Box>
      )
    }

    // console.log(invoiceData)
    const BillTo= () => {
      return (
        <Box sx={{m: 2}} >
          <Typography variant="h6" style={{fontWeight: 'bold'}}>Bill To:</Typography>
          <Typography variant="subtitle2" >{invoiceData.client.name}</Typography>
          <Typography variant="subtitle2" >{invoiceData.client.email}</Typography>
          <Typography variant="subtitle2" >{invoiceData.client.phone}</Typography>
          <Typography variant="subtitle2" >{invoiceData.client.address}</Typography>
        </Box>
      )
    }
    const OrderTable= () => {
      return (
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
                  <TableCell  scope="row" style={{width: '30%' }}> {itemField.itemName}</TableCell>
                  <TableCell align="left"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="quantity" value={itemField?.quantity} placeholder="0" readOnly /> </TableCell>
                  <TableCell align="left"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="unitPrice" value={itemField?.unitPrice} placeholder="0" readOnly /> </TableCell>
                  {/* <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="discount"  value={itemField?.discount} readOnly /> </TableCell> */}
                  <TableCell align="left"> Rp {currencyFormat((itemField?.quantity * itemField.unitPrice) - (itemField.quantity * itemField.unitPrice) * itemField.discount / 100)} </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
    }

    const InvoiceSummary = () => {
      return (
        <>
          <Grid container sx={{m: 2}}>
            <Grid item xs={12}>
              <Typography variant="h6" style={{fontWeight: 'bold'}} gutterBottom>Invoice Summary</Typography>
            </Grid>
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
                <Typography  variant="subtitle2" style={{fontWeight: 'bold'}}>{currency} {currencyFormat(subTotal)}</Typography>
                <Typography  variant="subtitle2" style={{fontWeight: 'bold'}}>{currency} {currencyFormat(vat)}</Typography>
                <Typography  variant="subtitle2" style={{fontWeight: 'bold'}}>{currency} {currencyFormat(total)}</Typography>
                <Typography  variant="subtitle2" style={{fontWeight: 'bold'}}>{currency} {currencyFormat(totalAmountReceived)}</Typography>
                <Typography  variant="subtitle2" style={{fontWeight: 'bold'}}>{currency} {currencyFormat(Math.round((total - totalAmountReceived)*100)/100)}</Typography>
              </Box>
              </Grid>
            </Grid>
        </>
      )
    }



    const data = [
      {
        data: <Generate/>,
        size: { xs:12 , sm:12, md:12 },
      },
      {
        data: <BillTo/>,
        size: { xs:2 , sm:8, md:8 },
      },
      {
        data: <OrderDetails/>,
        size: { xs:2 , sm:4, md:4 },
      },
      {
        data: <OrderTable/>,
        size: { xs:12 , sm:12, md:12 },
      },
      // {
      //   data: <PaymentHistorys/>,
      //   size: { xs:2 , sm:8, md:8 },
      // },
      {
        data: <InvoiceSummary/>,
        size: { xs:2 , sm:12 ,md:12 },
      },

    ]



    function Container1(props) {
      const value = props.value;
      return value.map((dat, index) => (
          <Grid display={'flex'} className="CrmDashboardItem" item xs={dat.size.xs} sm={dat.size.sm} md={dat.size.md} key={index}>
            <Box className='CrmDashboardBox' style={{display: 'flex',flexDirection:  'column', alignItems: 'left', justifyContent: 'center'}}>
              {dat.data}
            </Box>
          </Grid>
        ))}


  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container alignItems={"stretch"} spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 12, md: 12 }} >
          <Container1 value={data}/>
        </Grid>
      </Box>

      <AddOrder setOpen={setOrderOpen} open={orderOpen} />
      {/* <Morder setOpen={setMOrderOpen} open={morderOpen} />
      <Dorder setOpen={setDOrderOpen} open={dorderOpen} />
      <Invoice setOpen={setInvoiceOpen} open={invoiceOpen} /> */}
      <Modal open={open} setOpen={setOpen} invoice={invoiceData}/>
    </>
  );
}

export default Order



    // const TrackOrder = () => {
      // return (
      //   <>
      //     <Box sx={{p: 2}}>
      //       <Box display='flex' justifyContent='space-between' >
      //         <Typography variant="h6" style={{fontWeight: 'bold'}} gutterBottom>Track Order</Typography>
      //       </Box>
      //       <Box display='flex' justifyContent='space-between' >
      //         <Button onClick={() => processOrder()}>{checkOrderStatus()}</Button>
      //         <Button onClick={() => redoOrder()}>Redo</Button>
      //       </Box>
      //       <Steps/>
      //     </Box>
      //   </>
      // )
    // }



    // const PaymentHistorys = () => {
    //   return (
    //     <>
    //       <Typography>PaymentHistory</Typography>
    //       {/* {invoice?.paymentRecords.length !== 0 && (
    //         <PaymentHistory paymentRecords={invoiceData?.paymentRecords} subtotal={subTotal} createdAt={invoiceData.createdAt}/>
    //       )} */}
    //     </>
    //   )
    // }

    // const Steps = () => {
    //   return (
    //     <Box sx={{ width: '100%' }}>
    //     <Stepper activeStep={orderStatus} orientation="vertical">
    //       {steps.map((label, index) => (
    //         <Step key={label}>
    //           <StepLabel optional={
    //             index === 5 ? (
    //               <Typography variant="caption">Last step</Typography>
    //             ) : null}
    //           >
    //             <Typography variant="subtitle2" style={{fontWeight: 'bold'}}>{label}</Typography>
    //           </StepLabel>
    //         </Step>
    //       ))}
    //     </Stepper>
    //   </Box>
    //   )
    // }