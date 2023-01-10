import * as React from 'react';
import PropTypes from 'prop-types';

import { 
  Box,
  Table,
  TableBody,
}  from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Card } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { deleteInvoice, deleteInvoices } from '../../../actions/invoiceActions';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from 'react';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddOrder from './AddOrder';
import './Table.css'

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








function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead >
      <TableRow>
        <TableCell padding="checkbox">
        <Box style={{
          alignItems: 'center', 
          display: 'flex',
          width: '4rem'
        }}>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
          <Typography variant='subtitle2'>ID</Typography>
          </Box>
        </TableCell>
        {headCells.map((headCell) => {
          if(!headCell.id) {
            return (
              <TableCell
              key={headCell.id}
              align={'left'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
                <Typography variant='subtitle2'>{headCell.label}</Typography>
            </TableCell>
            )
          } else {
            return (
              <TableCell
              key={headCell.id}
              align={'left'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                <Typography variant='subtitle2'>{headCell.label}</Typography>
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
            )
          }
        })}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};





const EnhancedTableToolbar = (props) => {
  const { numSelected, selected, onDelete, boards } = props;
  const deleteInvoice = (selected) => {
    onDelete(selected);
  };
  const [open, setOpen] = useState(false)

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          // bgcolor: 'blue',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          // color="inherit"
          // variant="subtitle1"
          // component="div"
        >
          {numSelected} Selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%', fontWeight: 'bold' }}
          // variant="subtitle1"
          // id="tableTitle"
          // component="div"
        >
          DataTable Simple
        </Typography>
      )}
      <AddOrder setOpen={setOpen} open={open} boards={boards}/>
      {
          <IconButton onClick={() => setOpen((prev) => !prev) }>
            <AddCircleOutlineIcon />
          </IconButton>
      }

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={() => deleteInvoice(selected) }>
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



export default function EnhancedTable({ rows, head, boards }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n._id);
      setSelected(newSelected);
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

  const handleDelete = (selected)=> {
    dispatch(deleteInvoice(selected))
  }
 
  const openInvoice = (id) => {
    navigate(`/order/${id}`)
  }

  const editInvoice = (id) => {
    navigate(`/edit/order/${id}`)
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


  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


  const Cell = ({children, row}) => (
    <TableCell onClick={() => openInvoice(row._id)}><Typography  variant='subtitle2'>{children}</Typography></TableCell>
  )

  return (
    <Box className='OrderTable' >
      <EnhancedTableToolbar 
        numSelected={selected.length} 
        selected={selected}
        onDelete={handleDelete}
        boards={boards}
        // openSnackbar={openSnackbar}
      />
        <Table>
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            headCells={head}
          />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                      <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Checkbox
                            // color="primary"
                            onClick={(event) => handleClick(event, row._id)}
                            checked={isItemSelected}
                          />
                          <Typography variant='subtitle2'>#{row.invoiceNumber} </Typography>
                        </Box>
                      </TableCell>
                      <Cell row={row}>{moment(row.createdAt).format('Do MMM YY')}</Cell>
                      <Cell row={row}><button style={checkStatus(row.status)}>{row.status}</button></Cell>
                      <Cell row={row}>{row.client.name}</Cell>
                      <Cell row={row}>{moment(row.dueDate).fromNow()}</Cell>
                      <Cell row={row}>{row.currency} {row.total? toCommas(row.total): row.total}</Cell>
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
    </Box>
  );
}
