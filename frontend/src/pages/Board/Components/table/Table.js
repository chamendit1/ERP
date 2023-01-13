import { Box, Grid, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getBoard, getBoards } from '../../../../actions/board';
import { getColumn, getColumns } from '../../../../actions/column';
import { getInvoices } from '../../../../actions/invoiceActions';
import OrderTablee from './OrderTablee'


const headCells = [

  {
    id: 'Date',
    numeric: true,
    label: 'Date',
  },
  {
    id: 'status',
    numeric: true,
    label: 'Status',
  },
  {
    id: 'name',
    numeric: false,
    label: 'Customer',
  },
  {
    id: 'due',
    numeric: true,
    label: 'Due Date',
  },
  {
    id: 'amount',
    numeric: true,
    label: 'Amount',
  },
];

const Table = () => {
  const { id } = useParams()
	const dispatch = useDispatch()
  const rows = useSelector(state => state.invoices.invoices)

  useEffect(() => {
    dispatch(getInvoices());
  }, [dispatch]);

  // const [boardData, setBoardData] = useState({ id: '0', label:'Main Board'})
	// const [columnData, setColumnData] = useState(0)
	// const [columnsData, setColumnsData] = useState([])
	// const [invoicesData, setInvoicesData] = useState([{_id: 0, invoiceNumber: 1}])
	// const [invoiceData, setInvoiceData] = useState([{_id: 0, invoiceNumber: 1}])

	// const board = useSelector(state => state.board.board)
  // const order = useSelector(state => state.invoices.invoice)
	// const columns = useSelector(state => state.column.columns)
	// const orders = useSelector(state => state.invoices.invoices)

  // useEffect(() => {
  //   dispatch(getBoard(id));
  // }, [dispatch]);

	// useEffect(() => {
  //   dispatch(getColumns());
  // }, [dispatch]);

	// useEffect(() => {
  //   dispatch(getInvoices());
  // }, [dispatch]);

  // console.log(columns)




  return (
    <>
      <Box border={'1px solid black'} height={'100%'}>
        <Box>
          <OrderTablee rows={rows} head={headCells}/>
        </Box>
      </Box>
    </>
  )
}

export default Table