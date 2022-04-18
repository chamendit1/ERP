import React, { useState, useEffect} from 'react'
import styles from './Inventory.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { useHistory } from 'react-router-dom'

import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';

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
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';

import { initialStateInventory } from '../../initialState'
import { createInventory, getInventory, updateInventory } from '../../actions/inventoryActions';
import AddClient from './AddClient';
import InventoryType from './InventoryType';
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

const Inventory = () => {

    const [inventoryData, setInventoryData] = useState(initialStateInventory)
    const [type, setType] = React.useState('Inventory')
    const [status, setStatus ] = useState('')
    const { id } = useParams()
    //const clients = useSelector((state) => state.clients.clients)
    const { inventory } = useSelector((state) => state.inventories);
    const dispatch = useDispatch()
    const history = useHistory()
    const user = JSON.parse(localStorage.getItem('profile'))


    useEffect(() => {
        dispatch(getInventory(id));
        // eslint-disable-next-line
      }, [id]);

    
    useEffect(() => {
        if(inventory) {
            //Automatically set the default order values as the ones in the order to be updated
            setInventoryData(inventory)
            setType(inventory.type)
            setStatus(inventory.status)
            //setSelectedDate(order.dueDate)
        }
    }, [inventory])

 
    useEffect(() => {
        if(type === 'Receipt') {
            setStatus('Paid')
        } else {
            setStatus('Unpaid')
        }
    },[type])
    
      
    

    // console.log(orderData)
    // Change handler for dynamically added input field
    const handleChange =(index, e) => {
        const values = [...inventoryData.items]
        values[index][e.target.name] = e.target.value
        setInventoryData({...inventoryData, items: values})
        
    }

    console.log(inventory)


    const handleAddField = (e) => {
        e.preventDefault()
        setInventoryData((prevState) => ({...prevState, items: [...prevState.items,  {itemName: ''}]}))
    }

    const handleRemoveField =(index) => {
        const values = inventoryData.items
        values.splice(index, 1)
        setInventoryData((prevState) => ({...prevState, values}))
        // console.log(values)
    }
    
    const handleSubmit =  async (e ) => {
        e.preventDefault()
        if(inventory) {
         dispatch(updateInventory( inventory._id, {
             ...inventoryData, 
             type: type, 
             status: status 
            })) 
         history.push(`/inventory/${inventory._id}`)
        } else {

        dispatch(createInventory({
            ...inventoryData, 
            type: type, 
            status: status, 
            creator: [user?.result?._id || user?.result?.googleId]}, 
            history
            ))
        }

        // setInventoryData(initialState)
    }

    const classes = useStyles()
    const [open, setOpen] = useState(false);



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
                        <InventoryType type={type} setType={setType} />
                        <Typography variant="overline" style={{color: 'gray'}} >Inventory#: </Typography>
                        <InputBase defaultValue={inventoryData.orderNumber}/>
                    </Grid>
                </Grid >
            </Container>
            <Divider />
            <Container>
                <Grid container justifyContent="space-between" style={{marginTop: '40px'}} >
                    <Grid item style={{width: '50%'}}>
                        <Container>
                        {// Empty
                        }
                        </Container>
                    </Grid>

                    <Grid item style={{marginRight: 20, textAlign: 'right'}}>
                        <Typography  >{(type === 'Receipt' ? 'Paid' : 'Unpaid')}</Typography>
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
            {inventoryData.items.map((itemField, index) => (
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
                    onChange={(e) => setInventoryData({...inventoryData, notes: e.target.value})}
                    value={inventoryData.notes}
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

export default Inventory
