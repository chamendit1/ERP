import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import NoData from '../../components/svgIcons/NoData';
import Spinner from '../../components/Spinner/Spinner';
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { useSnackbar } from 'react-simple-snackbar'

import { deleteInvoice } from '../../actions/invoiceActions';

import { Box, Card} from '@material-ui/core';

// import PropTypes from 'prop-types';
// import { useTheme } from '@material-ui/core/styles';
// import FirstPageIcon from '@material-ui/icons/FirstPage';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// import LastPageIcon from '@material-ui/icons/LastPage';



// function TablePaginationActions(props) {
//   const theme = useTheme();
//   const { count, page, rowsPerPage, onPageChange } = props;

//   const handleFirstPageButtonClick = (event) => {
//     onPageChange(event, 0);
//   };

//   const handleBackButtonClick = (event) => {
//     onPageChange(event, page - 1);
//   };

//   const handleNextButtonClick = (event) => {
//     onPageChange(event, page + 1);
//   };

//   const handleLastPageButtonClick = (event) => {
//     onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//   };

//   return (
//     <div>
//       <IconButton
//         onClick={handleFirstPageButtonClick}
//         disabled={page === 0}
//         aria-label="first page"
//       >
//         {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
//       </IconButton>
//       <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
//         {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
//       </IconButton>
//       <IconButton
//         onClick={handleNextButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="next page"
//       >
//         {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
//       </IconButton>
//       <IconButton
//         onClick={handleLastPageButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="last page"
//       >
//         {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
//       </IconButton>
//     </div>
//   );
// }

// TablePaginationActions.propTypes = {
//   count: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
// };


const OrderTable = (data) => {

  
  const rows = data.data
  const user = JSON.parse(localStorage.getItem('profile'))
  const dispatch = useDispatch()
  const history = useHistory()
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rows.length);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const [openSnackbar, closeSnackbar] = useSnackbar()
  const isLoading = useSelector(state => state.invoices.isLoading)

  const toCommas = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const editInvoice = (id) => {
    history.push(`/edit/order/${id}`)
  }

  const openInvoice = (id) => {
    history.push(`/order/${id}`)
  }

  function checkStatus(status) {
    return status === "Partial" ? {border: 'solid 0px #1976d2', backgroundColor: '#baddff', padding: '8px 18px', borderRadius: '20px' }
        : status === "Paid" ? {border: 'solid 0px green', backgroundColor: '#a5ffcd', padding: '8px 18px', borderRadius: '20px' }
        : status === "Unpaid" ? {border: 'solid 0px red', backgroundColor: '#ffaa91', padding: '8px 18px', borderRadius: '20px' }
        : "red";
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
    <Box py={3}>
    <Box mb={3}>
    <Card style={{borderRadius: 10, boxShadow: 3}}>
      <TableContainer component={Paper} elevation={0}>

      <Table aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <TableCell>Number</TableCell>
            <TableCell>Client</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {Array.from(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row._id} style={{cursor: 'pointer'}} >
                <TableCell onClick={() => openInvoice(row._id)}> {row.invoiceNumber} </TableCell>
                <TableCell onClick={() => openInvoice(row._id)} > {row.client.name} </TableCell>
                <TableCell onClick={() => openInvoice(row._id)} >{row.currency} {row.total? toCommas(row.total): row.total} </TableCell>
                <TableCell onClick={() => openInvoice(row._id)} > {moment(row.dueDate).fromNow()} </TableCell>
                <TableCell onClick={() => openInvoice(row._id)} > <button style={checkStatus(row.status)}>{row.status}</button></TableCell>
             
                <TableCell style={{ width: '10px'}}>
                  <IconButton onClick={() => editInvoice(row._id)}>
                    <BorderColorIcon  style={{width: '20px', height: '20px'}} />
                  </IconButton>
              </TableCell>
              <TableCell style={{ width: '10px'}}>
                  <IconButton onClick={() => dispatch(deleteInvoice(row._id, openSnackbar))}>
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
            <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            // ActionsComponent={TablePaginationActions}
            // // SelectProps={{
            // //   inputProps: { 'aria-label': 'rows per page' },
            // //   native: true,
            // // }}
          />
      </Table>
    </TableContainer>
    </Card>
  </Box>
  </Box>
  );
}

export default OrderTable