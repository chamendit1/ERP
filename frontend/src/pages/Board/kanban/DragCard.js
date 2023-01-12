import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const DragCard = ({data}) => {
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