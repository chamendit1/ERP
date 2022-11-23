import React from 'react'
import moment from 'moment'
import { toCommas } from '../../utils/utils'
import styles from './InvoiceDetails.module.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper } from '@material-ui/core';

const PaymentHistory = ({ paymentRecords, subtotal, createdAt}) => {

  let balance = subtotal;
  
    return (
         <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date Paid</TableCell>
              <TableCell>Credit</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Balance</TableCell>
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
            <TableCell>Rp {toCommas(record.paymentMethod)}</TableCell>
            <TableCell>Rp {toCommas(balance -= record.amountPaid)}</TableCell>
          </TableRow>
         ))}
         </TableBody>
         </Table>
    )
}

export default PaymentHistory
