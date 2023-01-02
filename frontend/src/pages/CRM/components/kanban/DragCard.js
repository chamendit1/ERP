import React from 'react'
import { Card, Grid, Box, Avatar, Typography } from '@mui/material'

const DragCard = ({data}) => {
  console.log(data)
  return (
    <Card sx={{m:2}}>
      <Box>
        <Typography># {data.invoiceNumber}</Typography>
        {/* <Typography>{data._id}</Typography> */}
        <Typography>Status: {data.orderStatus}</Typography>
        <Typography>{data.status}</Typography>
        <Typography>${data.total}</Typography>

      </Box>
      
      
    </Card>
  )
}

export default DragCard