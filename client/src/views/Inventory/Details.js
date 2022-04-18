import React, { useState, useEffect } from 'react'
// import "../../../node_modules/react-progress-button/react-progress-button.css"
import { useSnackbar } from 'react-simple-snackbar'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initialStateOrder } from '../../initialState' 
import styles from './InventoryDetails.module.css'
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
import Spinner from '../../components/Spinner/Spinner'

import Modal from '../../components/Payments/Modal'
import { getInventory } from '../../actions/inventoryActions'

const Details = () => {


    const location = useLocation()
    const [inventoryData, setInventoryData] = useState(initialStateOrder)
    const [selectedDate, setSelectedDate] = useState(new Date());

    const { id } = useParams()
    const { inventory } = useSelector((state) => state.inventories)
    const dispatch = useDispatch()
    const history = useHistory()

    // eslint-disable-next-line
    const [openSnackbar, closeSnackbar] = useSnackbar()

    
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
        dispatch(getInventory(id));
      },[id, dispatch, location]);

      useEffect(() => {
        if(inventory) {
            //Automatically set the default order values as the ones in the order to be updated
            setInventoryData(inventory)
            setSelectedDate(inventory.dueDate)
           
        }
    }, [inventory])

    console.log(inventory)
    console.log(inventoryData)

  const editInventory = (id) => {
    history.push(`/edit/inventory/${id}`)
  }




const iconSize = {height: '18px', width: '18px', marginRight: '10px', color: 'gray'}
const [open, setOpen ] = useState(false)

/*
if(!inventory) {
  return (
    <Spinner />
  )
}
*/
    return (
        <div className={styles.PageLayout}>
          <div className={styles.buttons}>


              <button 
              className={styles.btn}  
              onClick={() => editInventory(inventoryData._id)}
              > 
              <BorderColorIcon style={iconSize} 
              />
              Edit Invoice
              </button>

              <button 
                // disabled={status === 'Paid' ? true : false}
                className={styles.btn} 
                onClick={() => setOpen((prev) => !prev)}> 
                <MonetizationOnIcon style={iconSize} 
              /> 
              Record Payment
              </button>
          </div>

            <Modal open={open} setOpen={setOpen} inventory={inventory}/>
            <div className={styles.invoiceLayout}>
        <Container  className={classes.headerContainer}>
        
        </Container>
        <Divider />
        <Container>
            <Grid container justifyContent="space-between" style={{marginTop: '40px'}} >
                <Grid item>
                    <Container>
                        <Typography variant="overline" style={{color: 'gray', paddingRight: '3px'}} gutterBottom>Bill to</Typography>
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
          {inventoryData?.items?.map((itemField, index) => (
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
                    <Typography>{inventoryData.notes}</Typography>
                </div>

        </form>
    </div>
        </div>
        
    )
}

export default Details
