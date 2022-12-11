import React from 'react'
import moment from 'moment'
// import { toCommas } from '../../utils/utils'
// import styles from './InvoiceDetails.module.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper } from '@mui/material';

const toCommas = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const PaymentHistory = ({ paymentRecords, subtotal, createdAt}) => {

  let balance = subtotal;
  
    return (
         <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{fontWeight: 'bold'}}>Date Paid</TableCell>
                <TableCell style={{fontWeight: 'bold'}}>Amount</TableCell>
                <TableCell style={{fontWeight: 'bold'}}>Payment Method</TableCell>
                <TableCell style={{fontWeight: 'bold'}}>Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow >
                  <TableCell>{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
                  <TableCell></TableCell>
                  <TableCell>Initial Charge</TableCell>
                  <TableCell>Rp {toCommas(subtotal)}</TableCell>
              </TableRow>

          {paymentRecords?.map((record) => (
            <TableRow key={record._id}>
              <TableCell>{moment(record.datePaid).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
              <TableCell>Rp {toCommas(record.amountPaid)}</TableCell>
              <TableCell>{toCommas(record.paymentMethod)}</TableCell>
              <TableCell>Rp {toCommas(balance -= record.amountPaid)}</TableCell>
            </TableRow>
          ))}
          </TableBody>
         </Table>
    )
}

export default PaymentHistory
