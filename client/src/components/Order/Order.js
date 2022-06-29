import React, { useState, useEffect} from 'react'
import styles from './Order.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { useHistory } from 'react-router-dom'

import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

import { initialStateOrder } from '../../initialState'
import { createOrder, getOrder, updateOrder } from '../../actions/orderActions';
import { getClientsByUser } from '../../actions/clientActions'
import AddClient from './AddClient';
import OrderType from './OrderType';
// import SelectType from './SelectType'

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
    }
  }));

const Order = () => {

    const [orderData, setOrderData] = useState(initialStateOrder)
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const [ client, setClient] = useState(null)
    const [type, setType] = React.useState('Order')
    const [status, setStatus ] = useState('')
    const { id } = useParams()
    const clients = useSelector((state) => state.clients.clients)
    const { order } = useSelector((state) => state.orders);
    const dispatch = useDispatch()
    const history = useHistory()
    const user = JSON.parse(localStorage.getItem('profile'))


    useEffect(() => {
        dispatch(getOrder(id));
        // eslint-disable-next-line
      }, [id]);

    useEffect(() => {
        dispatch(getClientsByUser({search: user?.result._id || user?.result?.googleId}));
        // eslint-disable-next-line
    }, [dispatch]);

    
    useEffect(() => {
        if(order) {
            //Automatically set the default order values as the ones in the order to be updated
            setOrderData(order)
            setClient(order.client)
            setType(order.type)
            setStatus(order.status)
            setSelectedDate(order.dueDate)
        }
    }, [order])

 
    useEffect(() => {
        if(type === 'Receipt') {
            setStatus('Paid')
        } else {
            setStatus('Unpaid')
        }
    },[type])
    

    const clientsProps = {
        options: clients,
        getOptionLabel: (option) => option.name
      };
      
    

    // console.log(orderData)
    // Change handler for dynamically added input field
    const handleChange =(index, e) => {
        const values = [...orderData.items]
        values[index][e.target.name] = e.target.value
        setOrderData({...orderData, items: values})
        
    }


    const handleAddField = (e) => {
        e.preventDefault()
        setOrderData((prevState) => ({...prevState, items: [...prevState.items,  {itemName: ''}]}))
    }

    const handleRemoveField =(index) => {
        const values = orderData.items
        values.splice(index, 1)
        setOrderData((prevState) => ({...prevState, values}))
        // console.log(values)
    }
    
    const handleSubmit =  async (e ) => {
        e.preventDefault()
        if(order) {
         dispatch(updateOrder( order._id, {
             ...orderData, 
             client, 
             type: type, 
             status: status 
            })) 
         history.push(`/order/${order._id}`)
        } else {

        dispatch(createOrder({
            ...orderData, 
            client, 
            type: type, 
            status: status, 
            creator: [user?.result?._id || user?.result?.googleId],
            owner: client._id}, 
            history
            ))
        }

        // setOrderData(initialState)
    }

    const classes = useStyles()
    const [open, setOpen] = useState(false);

    const CustomPaper = (props) => {
        return <Paper elevation={3} {...props} />;
      };


      if(!user) {
        history.push('/login')
      }


    return (
    <div className={styles.invoiceLayout}>
        <form onSubmit={handleSubmit} className="mu-form">
            <AddClient setOpen={setOpen} open={open} />
            <Container  className={classes.headerContainer}>
                
                <Grid container justifyContent="space-between" >
                    <Grid item>
                        {/* <Avatar alt="Logo" variant='square' src="" className={classes.large} /> */}
                    </Grid>
                    <Grid item>
                        {/* <div style={{paddingTop: '20px'}}>
                            <SelectType  type={type} setType={setType} />
                        </div> */}
                        <OrderType type={type} setType={setType} />
                        <Typography variant="overline" style={{color: 'gray'}} >Order#: </Typography>
                        <InputBase defaultValue={orderData.orderNumber}/>
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
                                                required={!order && true} 
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

                    <Grid item style={{marginRight: 20, textAlign: 'right'}}>
                        <Typography variant="overline" style={{color: 'gray'}} gutterBottom>Status</Typography>
                        <Typography variant="h6" gutterBottom style={{color: (type === 'Receipt' ? 'green' : 'red')}}>{(type === 'Receipt' ? 'Paid' : 'Unpaid')}</Typography>
                        <Typography variant="overline" style={{color: 'gray'}} gutterBottom>Date</Typography>
                        <Typography variant="body2" gutterBottom>{moment().format("MMM Do YYYY")}</Typography>
                        <Typography variant="overline" style={{color: 'gray'}} gutterBottom>Due Date</Typography>
                        <Typography variant="body2" gutterBottom>{selectedDate? moment(selectedDate).format("MMM Do YYYY") : '27th Sep 2021'}</Typography>
                    </Grid>
                </Grid>
            </Container>

        
    <div>

        <TableContainer component={Paper} className="tb-container">
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Item</TableCell>
                <TableCell >Qty</TableCell>
                <TableCell >Action</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {orderData.items.map((itemField, index) => (
                <TableRow key={index}>
                <TableCell  scope="row" style={{width: '40%' }}> <InputBase style={{width: '100%'}} outline="none" sx={{ ml: 1, flex: 1 }} type="text" name="itemName" onChange={e => handleChange(index, e)} value={itemField.itemName} placeholder="Item name or description" /> </TableCell>
                <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="quantity" onChange={e => handleChange(index, e)} value={itemField.quantity} placeholder="0" /> </TableCell>
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
            <div className={styles.addButton}>
                <button onClick={handleAddField}>+</button>
            </div>
    </div>
                    
            <div className={styles.note}>
                <h4>Notes/Terms</h4>
                <textarea 
                    placeholder="Provide additional details or terms of service"
                    onChange={(e) => setOrderData({...orderData, notes: e.target.value})}
                    value={orderData.notes}
                />
            </div>

            {/* <button className={styles.submitButton} type="submit">Save and continue</button> */}
            <Grid container justifyContent="center">
            <Button
                variant="contained"
                style={{justifyContentContent: 'center'}}
                type="submit"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
            >
                Save and Continue
            </Button>
            </Grid>
        </form>
    </div>
    )
}

export default Order
