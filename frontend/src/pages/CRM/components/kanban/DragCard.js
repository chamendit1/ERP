import React from 'react'
import { Card, Grid, Box, Avatar, Typography } from '@mui/material'

const DragCard = ({data}) => {
  // console.log(data)
  return (
      <Box className='dragCard' >
          {/* <Typography>{data.title}</Typography> */}
          <Typography># {data.invoiceNumber}</Typography>
          <Typography>{data._id}</Typography>
          <Typography>Status: {data.orderStatus}</Typography>
          <Typography>{data.status}</Typography>
          <Typography>${data.total}</Typography>
      </Box>
  )
}

export default DragCard