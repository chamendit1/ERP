import React, { useState, useEffect } from 'react'
// import "../../../node_modules/react-progress-button/react-progress-button.css"
import { useSnackbar } from 'react-simple-snackbar'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initialStateOrder } from '../../initialState' 
import { getOrder } from '../../actions/orderActions' 
import { toCommas } from '../../utils/utils'
import styles from './InvoiceDetails.module.css'
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
import BorderColorIcon from '@material-ui/icons/BorderColor';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Spinner from '../Spinner/Spinner'

import ProgressButton from 'react-progress-button'
import axios from 'axios';
import { saveAs } from 'file-saver';
import Modal from '../Payments/Modal'
import PaymentHistory from './PaymentHistory'
import { createOrder } from '../../actions/orderActions'

const OrderDetails = () => {


    const location = useLocation()
    const [orderData, setOrderData] = useState(initialStateOrder)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [ client, setClient] = useState([])
    const [type, setType] = React.useState('')
    const [status, setStatus ] = useState('')
    const [company, setCompany] = useState({})
    const { id } = useParams()
    const { order } = useSelector((state) => state.orders)
    const dispatch = useDispatch()
    const history = useHistory()
    const [sendStatus, setSendStatus] = useState(null)
    const [downloadStatus, setDownloadStatus] = useState(null)
    // eslint-disable-next-line
    const [openSnackbar, closeSnackbar] = useSnackbar()
    const user = JSON.parse(localStorage.getItem('profile'))
    
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
        }
      }));
    

    const classes = useStyles()


    useEffect(() => {
        dispatch(getOrder(id));
      },[id, dispatch, location]);

      useEffect(() => {
        if(order) {
            //Automatically set the default order values as the ones in the order to be updated
            setOrderData(order)
            setClient(order.client)
            setType(order.type)
            setStatus(order.status)
            setSelectedDate(order.dueDate)
            setCompany(order?.businessDetails?.data?.data)
           
        }
    }, [order])


    console.log(orderData)

  const editOrder = (id) => {
    history.push(`/edit/order/${id}`)
  }

  const createAndDownloadPdf = () => {
    setDownloadStatus('loading')
    axios.post(`${process.env.REACT_APP_API}/create-pdf`, 
    { name: order.client.name,
      address: order.client.address,
      phone: order.client.phone,
      email: order.client.email,
      dueDate: order.dueDate,
      date: order.createdAt,
      id: order.invoiceNumber,
      notes: order.notes,
      subTotal: toCommas(order.subTotal),
      total: toCommas(order.total),
      type: order.type,
      vat: order.vat,
      items: order.items,
      status: order.status,
      company: company,
  })
      .then(() => axios.get(`${process.env.REACT_APP_API}/fetch-pdf`, { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'order.pdf')
      }).then(() =>  setDownloadStatus('success'))
  }


  //SEND PDF INVOICE VIA EMAIL
  const sendPdf = (e) => {
    e.preventDefault()
    setSendStatus('loading')
    axios.post(`${process.env.REACT_APP_API}/send-pdf`, 
    { name: order.client.name,
      address: order.client.address,
      phone: order.client.phone,
      email: order.client.email,
      dueDate: order.dueDate,
      date: order.createdAt,
      id: order.invoiceNumber,
      notes: order.notes,
      subTotal: toCommas(order.subTotal),
      total: toCommas(order.total),
      type: order.type,
      vat: order.vat,
      items: order.items,
      status: order.status,
      link: `${process.env.REACT_APP_URL}/order/${order._id}`,
      company: company,
  })
  // .then(() => console.log("order sent successfully"))
  .then(() => setSendStatus('success'))
      .catch((error) => {
        console.log(error)
        setSendStatus('error')
      })
  }


const iconSize = {height: '18px', width: '18px', marginRight: '10px', color: 'gray'}
const [open, setOpen ] = useState(false)


console.log(orderData)



    return (
        <div className={styles.PageLayout}>

            <Modal open={open} setOpen={setOpen} order={order}/>
            <div className={styles.invoiceLayout}>
        <Container  className={classes.headerContainer}>
        
            <Grid container justifyContent="space-between" style={{padding: '30px 0px' }}>
            {!order?.creator?.includes(user?.result._id || user?.result?.googleId) ? 
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
                    <Typography variant="overline" style={{color: 'gray'}} >No: </Typography>
                    <Typography variant="body2">{order?.invoiceNumber}</Typography>
                </Grid>
            </Grid >
        </Container>
        <Divider />
        <Container>
            <Grid container justifyContent="space-between" style={{marginTop: '40px'}} >
                <Grid item>
                    {order?.creator?.includes(user?.result._id) && (
                      <Container style={{marginBottom: '20px'}}>
                        <Typography variant="overline" style={{color: 'gray'}} gutterBottom>From</Typography>
                        <Typography variant="subtitle2">{order?.businessDetails?.data?.data?.businessName}</Typography>
                        <Typography variant="body2">{order?.businessDetails?.data?.data?.email}</Typography>
                        <Typography variant="body2">{order?.businessDetails?.data?.data?.phoneNumber}</Typography>
                        <Typography variant="body2" gutterBottom>{order?.businessDetails?.data?.data?.address}</Typography>
                      </Container>
                    )}
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

        <form>
            <div>

    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell >Qty</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {orderData?.items?.map((itemField, index) => (
            <TableRow key={index}>
              <TableCell  scope="row" style={{width: '40%' }}> <InputBase style={{width: '100%'}} outline="none" sx={{ ml: 1, flex: 1 }} type="text" name="itemName" value={itemField.itemName} placeholder="Item name or description" readOnly /> </TableCell>
              <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="quantity" value={itemField?.quantity} placeholder="0" readOnly /> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                <div className={styles.addButton}>
                </div>
            </div>
                

                <div className={styles.note}>
                    <h4>Notes/Terms</h4>
                    <Typography>{orderData.notes}</Typography>
                </div>

        </form>
    </div>
        </div>
        
    )
}

export default OrderDetails
