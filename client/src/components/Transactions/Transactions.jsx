import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types';
// import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
// import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
// import { visuallyHidden } from '@mui/utils';
import { Container } from '@material-ui/core';

// import BorderColorIcon from '@material-ui/icons/BorderColor';
// import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import { useSnackbar } from 'react-simple-snackbar'
import { useHistory } from 'react-router-dom'

import { deleteInvoice, getInvoicesByClient } from '../../actions/invoiceActions';

// import moment from 'moment'


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}




const EnhancedTableToolbar = (props) => {
  const { numSelected, selected, onDelete, openSnackbar } = props;
  const deleteClient = (selected) => {
    onDelete(selected);
  };
  const [open, setOpen] = useState(false)

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >

        </Typography>
      )}



      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
      
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable({ id }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const dispatch = useDispatch()
  const [openSnackbar, closeSnackbar] = useSnackbar()
  const history = useHistory()
  const rows = useSelector(state => state.invoices.invoices)
  console.log(id)
  useEffect(() => {
    dispatch(getInvoicesByClient(id));
    // eslint-disable-next-line
  },[dispatch])
  console.log(rows)
  const editInvoice = (id) => {
    history.push(`/edit/invoice/${id}`)
  }
  
  const openInvoice = (id) => {
    history.push(`/invoice/${id}`)
  }

  const toCommas = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    function checkStatus(status) {
        return status === "Partial" ? {border: 'solid 0px #1976d2', backgroundColor: '#baddff', padding: '8px 18px', borderRadius: '20px' }
            : status === "Paid" ? {border: 'solid 0px green', backgroundColor: '#a5ffcd', padding: '8px 18px', borderRadius: '20px' }
            : status === "Unpaid" ? {border: 'solid 0px red', backgroundColor: '#ffaa91', padding: '8px 18px', borderRadius: '20px' }
            : "red";
              
      }


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n._id);
      setSelected(newSelected);
      console.log(newSelected)
      return;
    }
    setSelected([]);
    
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleDelete = (selected)=> {

  }
 

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Container>
    <Box >
      <Paper >
        <EnhancedTableToolbar 
        numSelected={selected.length} 
        selected={selected}
        onDelete={handleDelete}
        openSnackbar={openSnackbar}
        />
        <TableContainer>
          <Table
            sx={{ 
              minWidth: 750, 
            }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <TableHead>
              <TableRow>
                <TableCell>Invocie Number</TableCell>
                <TableCell>Client Name</TableCell>
                <TableCell>Date Paid</TableCell>
                <TableCell>Paid By</TableCell>
                <TableCell>Amount Paid</TableCell>
                <TableCell>Payment Method</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>     
              
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                        <TableRow>   
                        {row.paymentRecords.map((y) => {
                        return (
                          <>
                            <TableCell align="right" onClick={() => openInvoice(row._id)}>{row.invoiceNumber} </TableCell>
                            <TableCell align="right" onClick={() => openInvoice(row._id)}>{row.client.name} </TableCell>
                            <TableCell align="right" onClick={() => openInvoice(row._id)} >{y.datePaid} </TableCell>
                            <TableCell align="right" onClick={() => openInvoice(row._id)} >{y.paidBy} </TableCell>
                            <TableCell align="right" onClick={() => openInvoice(row._id)} >{y.amountPaid} </TableCell>
                            <TableCell align="right" onClick={() => openInvoice(row._id)} >{y.paymentMethod} </TableCell>
                        </>
                            );
                        })}
                      </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
    </Container>
    
  );
}

/*
        {rows.map((x, i) => {
            return (
                <div>
                    <Typography>hi {x.client.name}</Typography>
                    {x.paymentRecords.map((y) => {
                        return (
                            <div>
                                <Typography>Amount Paid {y.amountPaid}</Typography>
                            </div>
                        );
                     })}
                </div>
            );
        })}
*/