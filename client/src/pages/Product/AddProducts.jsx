import React, { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
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
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'react-simple-snackbar'
import {initialStateProduct} from '../../initialState'
import { useParams, useHistory } from 'react-router-dom'
import { updateProduct, createProduct } from '../../actions/productActions';

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

const AddProducts = ({ setOpen, open, currentId, setCurrentId }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  // eslint-disable-next-line 
  const [openSnackbar, closeSnackbar] = useSnackbar()
  const [productData, setProductData] = useState(initialStateProduct)
  const [status, setStatus ] = useState('')
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const handleClose = () => {
    setOpen(false);
  };
   
  const handleSubmit =(e)=> {
    e.preventDefault()
    if(currentId) {
      dispatch(updateProduct(currentId, productData, openSnackbar))
    } else {
      dispatch(createProduct(productData, openSnackbar))
    }
    clear()
    handleClose()
}

const clear =() => {
  setProductData({ initialStateProduct})
}


  return (
    <div>
    <form >
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth>
            <DialogTitle id="customized-dialog-title" onClose={handleClose} style={{paddingLeft: '20px', color: 'white'}}>
            {currentId? 'Edit Customer' : 'Add new Product'}
            </DialogTitle>
            <DialogContent dividers>


            <div className="customInputs">
              <TextField fullWidth
                  id="fullWidth" 
                  margin="dense"
                  label="itemName" 
                  variant="outlined"
                  onChange={(e) => setProductData({...productData, itemName: e.target.value})}
                  value={productData.itemName}
              />
              <TextField 
                  id="outlined-basic" 
                  margin="dense"
                  label="price" 
                  variant="outlined"
                  onChange={(e) => setProductData({...productData, price: e.target.value})}
                  value={productData.price} 
              />
          </div>

            </DialogContent>
            <DialogActions>
            <Button  onClick={handleSubmit}  variant="contained" style={{marginRight: '25px'}} >
                Save Customer
            </Button>
            </DialogActions>
      </Dialog>
        </form>
    </div>
  )
}

export default AddProducts