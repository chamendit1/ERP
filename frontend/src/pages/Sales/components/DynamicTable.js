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


import { useDispatch } from 'react-redux'
import { deleteClient, deleteClients } from '../../../actions/clientActions';
// import { useSnackbar } from 'react-simple-snackbar'
import AddClient from '../../Clients/components/AddClient'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from 'react';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import BorderColorIcon from '@mui/icons-material/BorderColor';

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
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" key='id'>
        <Box style={{
          alignItems: 'center', 
          display: 'flex',
          justifyContent: 'space-between',
          width: '4rem'
        }}>
          <Checkbox
            // color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
          <Typography >ID</Typography>
          </Box>
        </TableCell>
        {headCells.map((headCell) => {

          if(!headCell.type) {
            return (
              <TableCell
              sx={{display: headCell.display}}
              key={headCell.id}
              align={'left'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
                {headCell.label}
            </TableCell>
            )
          } else {
            return (
              <TableCell
              sx={{display: headCell.display}}
              key={headCell.id}
              align={'left'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden} >
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

// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

const EnhancedTableToolbar = (props) => {
  const { numSelected, selected, onDelete } = props;
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
          // bgcolor: 'blue',
        }),
      }}
    >
      
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          // variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          // variant="subtitle1"
          
          id="tableTitle"
          component="div"
        >
          {/* Customer */}
        </Typography>
      )}
      {/* <AddClient setOpen={setOpen} open={open} /> */}
      {
          <IconButton onClick={() => setOpen((prev) => !prev) }>
            <AddCircleOutlineIcon />
          </IconButton>
      }

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={() => deleteClient(selected) }>
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

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };



export default function EnhancedTable({ rows, head }) {
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

  const handleDeletes = (selected)=> {
    dispatch(deleteClients(selected))
  }

  const handleDelete = (selected)=> {
    dispatch(deleteClient(selected))
  }
 
  const openClient = (id) => {
    navigate(`/client/${id}`)
  }

  const editClient = (id) => {
    navigate(`/edit/client/${id}`)
  }



  const isSelected = (name) => selected.indexOf(name) !== -1;
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    console.log(head)
    console.log(rows)

  return (
    <Card style={{borderRadius: 10, boxShadow: 3}} key='card'>
      <EnhancedTableToolbar 
        numSelected={selected.length} 
        selected={selected}
        onDelete={handleDeletes}
        key='toolbar'
        // openSnackbar={openSnackbar}
      />
        <Table key='table'>
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            headCells={head}
            key='head'
          />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  return (
                    <TableRow
                      key={row._id}
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox" >
                      <Box  display='flex' justifyContent='space-between' alignItems='center'>
                        <Checkbox
                          
                          color="primary"
                          onClick={(event) => handleClick(event, row._id)}
                          checked={isItemSelected}/>
                        {index}
                        </Box>
                      </TableCell>
                      <TableCell  align="left" onClick={() => openClient(row._id)}>{row.name}</TableCell>
                      <TableCell  style={{width: '20%'}} align="left" onClick={() => openClient(row._id)}>{row.email}</TableCell>
                      <TableCell  style={{width: '20%'}} align="left" onClick={() => openClient(row._id)}>{row.phone}</TableCell>
                      <TableCell  style={{ width: '3%'}}>
                        <IconButton  onClick={() => editClient(row._id)}>
                          <BorderColorIcon  style={{width: '20px', height: '20px'}} />
                        </IconButton>
                      </TableCell>
                      <TableCell style={{ width: '3%'}} >
                        <IconButton onClick={() => handleDelete(row._id)}>
                          <DeleteOutlineRoundedIcon  style={{width: '20px', height: '20px'}} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                key='empty'
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
            key='tablePage'
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
    </Card>
  );
}