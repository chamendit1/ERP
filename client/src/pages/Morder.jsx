import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initialState } from '../initialState'
import { getInvoice } from '../actions/invoiceActions'
import { toCommas } from '../utils/utils'

import moment from 'moment'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { Container, Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Spinner from '../components/Spinner/Spinner'


import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import Dialog from '@material-ui/core/Dialog';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import axios from 'axios';
import { saveAs } from 'file-saver';
import Button from '@mui/material/Button';



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

const Morder = ({ setOpen, open, currentId, setCurrentId }) => {

    const location = useLocation()
    const [invoiceData, setInvoiceData] = useState(initialState)
    const [ rates, setRates] = useState(0)
    const [vat, setVat] = useState(0)
    const [currency, setCurrency] = useState('')
    const [subTotal, setSubTotal] = useState(0)
    const [total, setTotal] = useState(0)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [ client, setClient] = useState([])
    const [type, setType] = React.useState('')
    const [status, setStatus ] = useState('')
    const [company, setCompany] = useState({})
    const { id } = useParams()
    const { invoice } = useSelector((state) => state.invoices)
    const dispatch = useDispatch()
    const history = useHistory()

    const user = JSON.parse(localStorage.getItem('profile'))
    const [downloadStatus, setDownloadStatus] = useState(null)
    
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          '& > *': {
            margin: theme.spacing(1),
          },
        },
        large: {
          width: theme.spacing(12),
          height: theme.spacing(12),
        },
        table: {
            minWidth: 650,
          },
    
        headerContainer: {
            // display: 'flex'
            paddingTop: theme.spacing(1),
            paddingLeft: theme.spacing(5),
            paddingRight: theme.spacing(1),
            backgroundColor: '#f2f2f2',
            borderRadius: '10px 10px 0px 0px'
        },

      }));

    

    const classes = useStyles()


    useEffect(() => {
        dispatch(getInvoice(id));
      },[id, dispatch, location]);

      useEffect(() => {
        if(invoice) {
            //Automatically set the default invoice values as the ones in the invoice to be updated
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
           
        }
    }, [invoice])

    //Get the total amount paid
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
  if(!invoice) {
    return (
      <Spinner />
    )
  }

  const createAndDownloadPdf = () => {
    setDownloadStatus('loading')
    axios.post(`${process.env.REACT_APP_API}/create-mo`, 
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

        saveAs(pdfBlob, 'SuratJalan.pdf')
      }).then(() =>  setDownloadStatus('success'))
  }

  const handleClose = () => {
    setOpen(false);
  };

  // onClick={createAndDownloadPdf}

    return (
      <Dialog onClose={handleClose} open={open} maxWidth='md' fullWidth>
        <DialogTitle id="customized-dialog-title" onClose={handleClose} style={{paddingLeft: '20px', color: 'white'}}>
          Manufacturing Order
        </DialogTitle>
        <Button onClick={createAndDownloadPdf}>Generate Invoice</Button>
        <DialogContent dividers>
          <div className={styles.invoiceLayout}>
          <Container  className={classes.headerContainer}>
              <Grid container justifyContent="space-between" style={{padding: '30px 0px' }}>
              {!invoice?.creator?.includes(user?.result._id || user?.result?.googleId) ? 
              (
                <Grid item>
                </Grid>
              )
              : (
                  <Grid item onClick={() => history.push('/settings')} style={{cursor: 'pointer'}}>
                      {company?.logo ? <img src={company?.logo} alt="Logo" className={styles.logo} /> 
                      :
                      <h2>{company?.name}</h2>
                      }
                  </Grid>
              )}
                  <Grid item style={{marginRight: 40, textAlign: 'right'}}>
                      <Typography style={{lineSpacing: 1, fontSize: 45, fontWeight: 700, color: 'gray'}} >Manufacturing Order</Typography>
                      <Typography variant="overline" style={{color: 'gray'}} >No: </Typography>
                      <Typography variant="body2">{invoiceData?.invoiceNumber}</Typography>
                  </Grid>
              </Grid >
          </Container>
          <Divider />
          <Container>
            <Grid container justifyContent="space-between" style={{marginTop: '40px', marginBottom: '40px'}} >
                <Grid item style={{width: '50%'}}> 
                    <Container>
                        <Typography variant="overline" style={{color: 'gray', paddingRight: '3px'}} gutterBottom>Bill to</Typography>
                        <Typography variant="subtitle2" gutterBottom>{client.name}</Typography>
                        <Typography variant="body2" >{client?.email}</Typography>
                        <Typography variant="body2" >{client?.phone}</Typography>
                        <Typography variant="body2">{client?.address}</Typography>
                    </Container>
                </Grid>

                <Grid item style={{marginRight: 20, textAlign: 'right'}}>
                    <Typography variant="overline" style={{color: 'gray'}} gutterBottom>Date</Typography>
                    <Typography variant="body2" gutterBottom>{moment().format("MMM Do YYYY")}</Typography>
                    <Typography variant="overline" style={{color: 'gray'}} gutterBottom>Due Date</Typography>
                    <Typography variant="body2" gutterBottom>{selectedDate? moment(selectedDate).format("MMM Do YYYY") : '27th Sep 2021'}</Typography>
                </Grid>
            </Grid>
          </Container>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell >Qty</TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
                {invoiceData?.items?.map((itemField, index) => (
                  <TableRow key={index}>
                    <TableCell scope="row" style={{width: '40%' }}> <InputBase style={{width: '100%'}} outline="none" sx={{ ml: 1, flex: 1 }} type="text" name="itemName" value={itemField.itemName} placeholder="Item name or description" readOnly /> </TableCell>
                    <TableCell> <InputBase type="number" name="quantity" value={itemField?.quantity} placeholder="0" readOnly /> </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={styles.note}>
              <h4>Notes/Terms</h4>
              <Typography>{invoiceData.notes}</Typography>
          </div>
      </div>
      </DialogContent>
      </Dialog>

      
        
    )
}

export default Morder
