import React, { useState, useEffect} from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { Container, Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import SaveIcon from '@material-ui/icons/Save';
import Chip from '@material-ui/core/Chip';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'react-simple-snackbar'
import { useParams, useHistory} from 'react-router-dom'
import { createInvoice, getInvoice, updateInvoice } from '../../actions/invoiceActions';
import { getClientsByUser } from '../../actions/clientActions'
import moment from 'moment'
import { toCommas } from '../../utils/utils'
import { initialState } from '../../initialState'
import currencies from '../../currencies.json'
import InvoiceType from '../../components/Invoice/InvoiceType'
import stylecss from './Order.module.css'
import AddClient from '../Client/AddClient'; // Need to cross check with original

 const styles = (theme) => ({
   root: {
     margin: 0,
     padding: theme.spacing(2),
     backgroundColor: '#1976D2',
     marginLeft: 0,
   },
   closeButton: {
     position: 'absolute',
     right: theme.spacing(1),
     top: theme.spacing(1),
     color: 'white',
   },
 });
 
 const DialogTitle = withStyles(styles)((props) => {
   const { children, classes, onClose, ...other } = props;
   return (
     <MuiDialogTitle disableTypography className={classes.root} {...other}>
       <Typography variant="h6">{children}</Typography>
       {onClose ? (
         <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
           <CloseIcon />
         </IconButton>
       ) : null}
     </MuiDialogTitle>
   );
 });
 
 const DialogContent = withStyles((theme) => ({
   root: {
     padding: theme.spacing(3),
   },
 }))(MuiDialogContent);
 
 const DialogActions = withStyles((theme) => ({
   root: {
     margin: 0,
     padding: theme.spacing(1),
   },
 }))(MuiDialogActions);


 // Add Invoice
 
 const AddOrder = ({ setOpen, open, currentId, setCurrentId }) => {
     const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
     const [ client, setClient] = useState(null)
     // eslint-disable-next-line 
     const [openSnackbar, closeSnackbar] = useSnackbar()


     const [invoiceData, setInvoiceData] = useState(initialState)
     const [ rates, setRates] = useState(0)
     const [vat, setVat] = useState(0)
     const [currency, setCurrency] = useState(currencies[0].value)
     const [subTotal, setSubTotal] = useState(0)
     const [total, setTotal] = useState(0)
     const today = new Date();
     const [selectedDate, setSelectedDate] = useState(today.getTime() + 7 * 24 * 60 * 60 * 1000);
     const [type, setType] = React.useState('Invoice')
     const [status, setStatus ] = useState('')
     const { id } = useParams()
     const clients = useSelector((state) => state.clients.clients)
     const { invoice } = useSelector((state) => state.invoices);
     const dispatch = useDispatch()
     const history = useHistory()
     const [orderStatus, setOrderStatus ] = useState('')

     useEffect(() => {
      dispatch(getInvoice(id));
      setCurrency('IDR')
      // eslint-disable-next-line
    }, [id]);
   
  useEffect(() => {
      dispatch(getClientsByUser({search: user?.result._id || user?.result?.googleId}));
      // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
      if(invoice) {
          //Automatically set the default invoice values as the ones in the invoice to be updated
          setInvoiceData(invoice)
          setRates(invoice.rates)
          setClient(invoice.client)
          setType(invoice.type)
          setStatus(invoice.status)
          setSelectedDate(invoice.dueDate)
          setOrderStatus(invoice.orderStatus)
      }
  }, [invoice])


  useEffect(() => {
      if(type === 'Receipt') {
          setStatus('Paid')
      } else {
          setStatus('Unpaid')
          setOrderStatus(0)
      }
  },[type])
  
  const defaultProps = {
      options: currencies,
      getOptionLabel: (option) => option.label
    };

  const clientsProps = {
      options: clients,
      getOptionLabel: (option) => option.name
    };
    
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

const handleRates =(e) => {
  setRates(e.target.value)
  setInvoiceData((prevState) => ({...prevState, tax: e.target.value}))
}

  // console.log(invoiceData)
  // Change handler for dynamically added input field
  const handleChange =(index, e) => {
      const values = [...invoiceData.items]
      values[index][e.target.name] = e.target.value
      setInvoiceData({...invoiceData, items: values})
      
  }

  useEffect(() => {
          //Get the subtotal
          const subTotal =()=> {
          var arr = document.getElementsByName("amount");
          var subtotal = 0;
          for(var i = 0; i < arr.length; i++) {
              if(arr[i].value) {
                  subtotal += +arr[i].value;
              }
              // document.getElementById("subtotal").value = subtotal;
              setSubTotal(subtotal)
          }
      }

      subTotal()
     
  }, [invoiceData])


  useEffect(() => {
      const total =() => {
          
          //Tax rate is calculated as (input / 100 ) * subtotal + subtotal 
          const overallSum = rates /100 * subTotal + subTotal
          //VAT is calculated as tax rates /100 * subtotal
          setVat(rates /100 * subTotal)
          setTotal(overallSum)


      }
      total()
  }, [invoiceData, rates, subTotal])
  

  const handleAddField = (e) => {
      e.preventDefault()
      setInvoiceData((prevState) => ({...prevState, items: [...prevState.items,  {itemName: '', unitPrice: '', quantity: '', discount: '', amount: '' }]}))
  }

  const handleRemoveField =(index) => {
      const values = invoiceData.items
      values.splice(index, 1)
      setInvoiceData((prevState) => ({...prevState, values}))
      // console.log(values)
  }
  
  const handleSubmit =  async (e ) => {
      e.preventDefault()
      if(invoice) {
       dispatch(updateInvoice( invoice._id, {
           ...invoiceData, 
           subTotal: subTotal, 
           total: total, 
           vat: vat, 
           rates: rates, 
           currency: currency, 
           dueDate: selectedDate, 
           client, 
           type: type, 
           status: status 
          }, openSnackbar)) 
       //history.push(`/invoice/${invoice._id}`)
       handleClose()
      } else {

      dispatch(createInvoice({
          ...invoiceData, 
          subTotal: subTotal, 
          total: total, 
          vat: vat, 
          rates: rates, 
          currency: currency, 
          dueDate: selectedDate, 
          client, 
          type: type, 
          status: status, 
          orderStatus: orderStatus,
          paymentRecords: [], 
          creator: [user?.result?._id || user?.result?.googleId],
          owner: client._id}, 
          history.
          openSnackbar
          ))
          handleClose()
      }

      // setInvoiceData(initialState)
  }

  const CustomPaper = (props) => {
      return <Paper elevation={3} {...props} />;
    };


    if(!user) {
      history.push('/login')
    }
 

   const handleClose = () => {
     setOpen(false);
   };

   const clear =() => {
    setCurrentId(null) 
    setInvoiceData({ initialState })
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mu-form">
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth='md' fullWidth>
        <DialogTitle id="customized-dialog-title" onClose={handleClose} style={{paddingLeft: '20px', color: 'white'}}>
          {currentId? 'Edit Customer' : 'New Order'}
        </DialogTitle>
             
        <DialogContent dividers>
          <Container >
            <Grid container justifyContent="space-between" >
              <Grid item>
                  <InvoiceType type={type} setType={setType} /> 
                  <Typography variant="overline" style={{color: 'gray'}} >Order #: </Typography>
                  <InputBase defaultValue={invoiceData.invoiceNumber}/>
              </Grid>
            </Grid >
          </Container>

          <Divider />

          <Container>
            <Grid container justifyContent="space-between" style={{marginTop: '40px'}} >
              <Grid item style={{width: '50%'}}>
                <Container>
                  <Typography variant="overline" style={{color: 'gray', paddingRight: '3px'}} gutterBottom>Bill to</Typography>
                  {client  && (
                      <>
                          <Typography variant="subtitle2" gutterBottom>{client.name}</Typography>
                          <Typography variant="body2" >{client.email}</Typography>
                          <Typography variant="body2" >{client.phone}</Typography>
                          <Typography variant="body2">{client.address}</Typography>
                          <Button color="primary" size="small" style={{textTransform: 'none'}} onClick={()=> setClient(null)}>Change</Button>
                      </>
                  )}
                  <div style={client? {display: 'none'} :  {display: 'block'}}>
                      <Autocomplete
                                  {...clientsProps}
                                  PaperComponent={CustomPaper}
                                      renderInput={(params) => <TextField {...params}
                                      required={!invoice && true} 
                                      label="Select Customer" 
                                      margin="normal" 
                                      variant="outlined"
                                      />}
                                  value={clients?.name}
                                  onChange={(event, value) => setClient(value)}       
                          />
                  </div>
                  {!client && 
                      <>
                      <Grid item style={{paddingBottom: '10px'}}>
                          <Chip
                              avatar={<Avatar>+</Avatar>}
                              label="New Customer"
                              onClick={() => setOpen(true)}
                              variant="outlined"
                          />
                      </Grid>
                      </>
                  }
                </Container>
              </Grid>
              <Grid item style={{width: '40%', marginRight: 20, textAlign: 'right'}}>
                  <Typography variant="overline" style={{color: 'gray'}} gutterBottom>Status</Typography>
                  <Typography variant="h6" gutterBottom style={{color: (type === 'Receipt' ? 'green' : 'red')}}>{(type === 'Receipt' ? 'Paid' : 'Unpaid')}</Typography>
                  <Typography variant="overline" style={{color: 'gray'}} gutterBottom>Date</Typography>
                  <Typography variant="body2" gutterBottom>{moment().format("MMM Do YYYY")}</Typography>
                  {/* <Typography variant="overline" style={{color: 'gray'}} gutterBottom>Due Date</Typography>
                  <Typography variant="body2" gutterBottom>{selectedDate? moment(selectedDate).format("MMM Do YYYY") : '27th Sep 2021'}</Typography> */}
                  <Typography variant="overline" gutterBottom>Amount</Typography>
                  <Typography variant="h6" gutterBottom>{currency} {toCommas(total)}</Typography>
              </Grid>
            </Grid>
          </Container>
            
            
          <div>
            <TableContainer component={Paper} className="tb-container">
              <Table aria-label="simple table" style={{width: '100%'}}>
                  <TableHead>
                    <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell >Qty</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell >Disc(%)</TableCell>
                        <TableCell >Amount</TableCell>
                        <TableCell >Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {invoiceData.items.map((itemField, index) => (
                    <TableRow key={index}>
                      <TableCell  scope="row" style={{width: '40%' }}> <InputBase style={{width: '100%'}} outline="none" sx={{ ml: 1, flex: 1 }} type="text" name="itemName" onChange={e => handleChange(index, e)} value={itemField.itemName} placeholder="Item name or description" /> </TableCell>
                      <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="quantity" onChange={e => handleChange(index, e)} value={itemField.quantity} placeholder="0" /> </TableCell>
                      <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="unitPrice" onChange={e => handleChange(index, e)} value={itemField.unitPrice} placeholder="0" /> </TableCell>
                      <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="discount"  onChange={e => handleChange(index, e)} value={itemField.discount} placeholder="0" /> </TableCell>
                      <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="amount" onChange={e => handleChange(index, e)}  value={(itemField.quantity * itemField.unitPrice) - (itemField.quantity * itemField.unitPrice) * itemField.discount / 100} disabled /> </TableCell>
                      <TableCell align="right"> 
                        <IconButton onClick={() =>handleRemoveField(index)}>
                          <DeleteOutlineRoundedIcon style={{width: '20px', height: '20px'}}/>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  </TableBody>
              </Table>
            </TableContainer>
            <div className={stylecss.addButton}>
                <button onClick={handleAddField}>+</button>
            </div>
        </div>


        <div className={stylecss.invoiceSummary}>
            <div className={stylecss.summary}>Invoice Summary</div>
            <div className={stylecss.summaryItem}>
                <p>Sub total:</p>
                <h4>{subTotal}</h4>
            </div>
            <div className={stylecss.summaryItem}>
                <p>VAT(%):</p>
                <h4>{vat}</h4>
            </div>
            <div className={stylecss.summaryItem}>
                <p>Total</p>
                <h4 style={{color: "black", fontSize: "18px", lineHeight: "8px"}}>{currency} {toCommas(total)}</h4>
            </div>
        </div>

        
        <div className={stylecss.toolBar}>
            <Container >
                <Grid container >
                    <Grid item style={{marginTop: '16px', marginRight: 10}}>
                        <TextField 
                            type="text" 
                            step="any" 
                            name="rates" 
                            id="rates" 
                            value={rates} 
                            onChange={handleRates} 
                            placeholder="e.g 10" 
                            label="Tax Rates(%)"
                        />
                    </Grid>
                    <Grid item style={{marginRight: 10}} >
                        
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Due date"
                                format="MM/dd/yyyy"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </ MuiPickersUtilsProvider>
                    </Grid>
                    {/* <Grid item style={{ width: 270, marginRight: 10 }}>
                        <Autocomplete
                                {...defaultProps}
                                id="debug"
                                debug
                                    renderInput={(params) => <TextField {...params} 
                                    label="Select currency" 
                                    margin="normal" 
                                    />}
                                value={currency.value}
                                onChange={(event, value) => setCurrency(value.value)}
                        />
                    </Grid> */}
                </Grid>
                
            </Container>
        </div>
            <div className={stylecss.note}>
                <h4>Notes/Terms</h4>
                <textarea 
                    placeholder="Provide additional details or terms of service"
                    onChange={(e) => setInvoiceData({...invoiceData, notes: e.target.value})}
                    value={invoiceData.notes}
                />
            </div>
             </DialogContent>
             <DialogActions>
             <Grid container justifyContent="center">
              <Button
                  variant="contained"
                  style={{justifyContentContent: 'center'}}
                  type="submit"
                  color="primary"
                  size="large"
                  startIcon={<SaveIcon />}
                  onClick={handleSubmit}
              >
                  Save and Continue
              </Button>
            </Grid>
             </DialogActions>
       </Dialog>
         </form>
     </div>
   );
 }
 
 export default AddOrder