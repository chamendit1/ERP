import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Container from '@material-ui/core/Container'
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import BorderColorIcon from '@material-ui/icons/BorderColor';
//import { useLocation } from 'react-router-dom';

import { deleteInventory, getInventories } from '../../actions/inventoryActions';
import NoData from '../svgIcons/NoData';
import Spinner from '../Spinner/Spinner'
import { useSnackbar } from 'react-simple-snackbar'

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),

  },
}));

function TablePaginationActions(props) {

  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root} >
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};



const useStyles2 = makeStyles(theme => ({
  table: {
    minWidth: 500,
    
  },

  tablecell: {
    fontSize: '16px'
}
}));

const tableStyle = { width: 160, fontSize: 14, cursor: 'pointer', borderBottom: 'none',  padding: '8px', textAlign: 'center' }
const headerStyle = { borderBottom: 'none', textAlign: 'center'}


const Inventories = () => {
    
  const dispatch = useDispatch()
  //const location = useLocation()
  const history = useHistory()
  const user = JSON.parse(localStorage.getItem('profile'))
  const rows = useSelector(state => state.invoices.invoices)
  const isLoading = useSelector(state => state.invoices.isLoading)
        // eslint-disable-next-line 
  const [openSnackbar, closeSnackbar] = useSnackbar()

  // const rows = []


     useEffect(() => {
         dispatch(getInventories());
     }, [dispatch]);

    //useEffect(() => {
      //dispatch(getInvoicesByUser({ search: user?.result?._id || user?.result?.googleId}));
      // eslint-disable-next-line
    //},[location])

     console.log(rows)



  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rows.length);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const editInventory = (id) => {
    history.push(`/edit/inventory/${id}`)
  }

  const openInventory = (id) => {
    history.push(`/inventory/${id}`)
  }

  if(!user) {
    history.push('/login')
  }



  if(isLoading) {
    return  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px'}}>
        <Spinner />
    </div>
  }

  if(rows.length === 0) {
    return  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px', margin: '80px'}}>
      <NoData />
    <p style={{padding: '40px', color: 'gray', textAlign: 'center'}}>No invoice yet. Click the plus icon to create invoice</p>
  
    </div>
  }
  
  return (
    <div>
    <Container style={{width: '85%', paddingTop: '70px', paddingBottom: '50px', border: 'none'}} >
    <TableContainer component={Paper} elevation={0}>
      <Table className={classes.table} aria-label="custom pagination table">
      

      <TableHead>
          <TableRow>
            <TableCell style={headerStyle}>Number</TableCell>
            <TableCell style={headerStyle}>Client</TableCell>
            <TableCell style={headerStyle}>Due Date</TableCell>
            <TableCell style={headerStyle}>Status</TableCell>
            <TableCell style={headerStyle}>Edit</TableCell>
            <TableCell style={headerStyle}>Delete</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row._id} style={{cursor: 'pointer'}} >
                <TableCell style={tableStyle} onClick={() => openInventory(row._id)}> </TableCell>
                <TableCell  style={tableStyle} onClick={() => openInventory(row._id)} >  </TableCell>
                <TableCell style={tableStyle} onClick={() => openInventory(row._id)} >  </TableCell>
                <TableCell style={tableStyle} onClick={() => openInventory(row._id)} > </TableCell>
             
                <TableCell style={{...tableStyle, width: '10px'}}>
                  <IconButton onClick={() => editInventory(row._id)}>
                    <BorderColorIcon  style={{width: '20px', height: '20px'}} />
                  </IconButton>
              </TableCell>
              <TableCell style={{...tableStyle, width: '10px'}}>
                  <IconButton onClick={() => dispatch(deleteInventory(row._id, openSnackbar))}>
                    <DeleteOutlineRoundedIcon  style={{width: '20px', height: '20px'}} />
                  </IconButton>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={6}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </Container>
  </div>
  );
}

export default Inventories