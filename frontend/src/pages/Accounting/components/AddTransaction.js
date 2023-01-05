 /* eslint-disable */
 import React, { useState, useEffect} from 'react';
 import Button from '@mui/material/Button';
 import Dialog from '@mui/material/Dialog';
 import IconButton from '@mui/material/IconButton';
 import CloseIcon from '@mui/icons-material/Close';
 import Typography from '@mui/material/Typography';
 import { TextField, Grid } from '@mui/material';
 import DatePicker from '../../../components/Payments/DatePicker'
 import Autocomplete from '@mui/material/Autocomplete';
 import { DialogTitle, DialogContent, DialogActions } from '@mui/material'
 import dayjs from 'dayjs';
 import { useDispatch } from 'react-redux'
import { createTransaction } from '../../../actions/transactionActions';
//  import { updateInvoice } from '../../actions/invoiceActions';
 
 
 const DTitle = ({ children, onClose}) => {
   return (
     <DialogTitle >
       <Typography>{children}</Typography>
       {onClose ? (
         <IconButton aria-label="close" onClick={onClose}>
           <CloseIcon />
         </IconButton>
       ) : null}
     </DialogTitle>
   );
 };
 

 
 const AddTransaction = ({ setOpen, open, currentId, setCurrentId }) => {
  const dispatch = useDispatch()
  //Create a state to add new payment record
  const [payment, setPayment] = useState({
      amountPaid: 0,
      datePaid: new Date(),
      paymentMethod: '',
      note: '',
      paidBy: '',
      category:''
  })

  //Material ui datepicker
const [selectedDate, setSelectedDate] = React.useState(dayjs(new Date()));
//Crate a state to handle the payment records
  const [paymentRecords, setPaymentRecords] = useState([])
  const [method, setMethod] = useState({})
  const [category, setCategory] = useState({})
  const [totalAmountReceived, setTotalAmountReceived] = useState(0)
  const [updatedInvoice, setUpdatedInvoice] = useState({})
  console.log(payment)


  useEffect(() => {
    setPayment({...payment, paymentMethod: method?.title})
  },[method])

  useEffect(() => {
    setPayment({...payment, paymentCategory: category?.title})
  },[category])

  useEffect(() => {
    setPayment({...payment, datePaid: selectedDate})
  },[selectedDate])

  const handleSubmitPayment =(e)=> {
      e.preventDefault()
        dispatch(createTransaction(payment))
        .then(() => {
          handleClose()
          window.location.reload()
        })
        // clear()
  }

const clear =() => {
}
  
const handleClose = () => {
  setOpen(false);
};


const paymentMethods = [
  { title: 'Bank Transfer'},
  { title: 'Cash'},
  { title: 'Credit Card'},
  { title: 'PayPal'},
  { title: 'Others'},
]

const paymentCategory = [
  { title: 'Shopping'},
  { title: 'Bills'},
  { title: 'Credit Card'},
  { title: 'PayPal'},
  { title: 'Others'},
]

return (
  <div>
      <form >
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth >
          <DTitle id="customized-dialog-title" onClose={handleClose} style={{paddingLeft: '20px', color: 'white'}}>
         Record Payment
          </DTitle>
          <DialogContent dividers>

          <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>

          <TextField 
              type="text" 
              name="Description" 
              label="Description" 
              fullWidth 
              style={{margin: 10}} 
              variant="outlined" 
              onChange={(e) => setPayment({...payment, note: e.target.value})}
              value={payment.note}
          />

          <TextField 
              type="number" 
              name="amountPaid" 
              label="Amount Paid" 
              fullWidth 
              style={{margin: 10}} 
              variant="outlined" 
              onChange={(e) => setPayment({...payment, amountPaid: e.target.value})}
              value={payment.amountPaid}
          />

          <Grid item fullWidth>
            <Autocomplete
              id="combo-box-demo"
              options={paymentMethods}
              getOptionLabel={(option) => option.title || ''}
              style={{ width: '96%', marginLeft: 10}}
              renderInput={(params) => <TextField {...params} label="Payment Method" variant="outlined" />}
              value={method}
              onChange={(event, value) => setMethod(value)}
            />
          </Grid>

          <Grid item fullWidth>
            <Autocomplete
              id="combo-box-demo"
              options={paymentCategory}
              getOptionLabel={(option) => option.title || ''}
              style={{ width: '96%', marginLeft: '10px', margin: 10}}
              renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
              value={category}
              onChange={(event, value) => setCategory(value)}
            />
          </Grid>



          </DialogContent>
          <DialogActions>
          <Button autoFocus onClick={handleSubmitPayment} variant="contained" style={{marginRight: '25px'}} >
              Save Record
          </Button>
          </DialogActions>
    </Dialog>
      </form>
  </div>
);
}

 
 export default AddTransaction