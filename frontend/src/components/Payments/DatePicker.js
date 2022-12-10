import 'date-fns';
import React from 'react';
import Grid from '@mui/material/Grid';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';


export default function MaterialUIPickers({ setSelectedDate, selectedDate}) {
  // The first commit of Material-UI
  const handleDateChange = (date) => {
    setSelectedDate(date.toISOString());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container justifyContent="space-around" style={{width: '97%', paddingLeft: '10px', paddingBottom: '15px'}}>
        <DesktopDatePicker
          label="Date desktop"
          inputFormat="MM/DD/YYYY"
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Grid>
    </LocalizationProvider>
  );
}
