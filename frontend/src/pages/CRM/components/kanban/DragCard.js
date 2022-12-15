import React from 'react'
import { Card, Grid, Box, Avatar, Typography } from '@mui/material'

const DragCard = ({data}) => {
  return (
    <Card sx={{m:2}}>
      <Box>
        {/* <Typography>{data._id}</Typography> */}
        <Typography>{data.orderStatus}</Typography>
        {/* <Typography>{data.total}</Typography> */}
        <Typography>#{data.invoiceNumber}</Typography>
      </Box>
      
      
    </Card>
  )
}

export default DragCard