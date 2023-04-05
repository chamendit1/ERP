import { Box, Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import React from 'react'
import '../Dashboard.css'
const AddDashboard = ({ setOpen, open }) => {

    const handleClose = () => {
        setOpen(false);
      };

  return (
    <>
     <Dialog onClose={handleClose} open={open} maxWidth='sm' fullWidth>
        <DialogTitle>Hi</DialogTitle>
        <DialogContent>
            Select Module
            <Grid container className='AddDashboardMain' 
                spacing={{ xs: 2, md: 3 }} 
                columns={{ xs: 2, sm: 6, md: 12 }} >
                {Array.from(Array(4)).map((_, index) => (
                <Grid className="items" item xs={2} sm={6} md={6} key={index} >
                    <Box className='data'>
                        Module{index}
                    </Box>
                </Grid>
                ))}
            </Grid>
        </DialogContent>
     </Dialog>
    </>
  )
}

export default AddDashboard