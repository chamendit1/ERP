import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Field = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword, placeholder }) => (
  <Grid item xs={12} sm={half ? 6 : 12}>
    <TextField
      size="small"
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
      variant="outlined"
      required
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
      InputProps={name === 'password' ? {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleShowPassword}>
              {type === 'password' ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      } : null}
    />
  </Grid>
);

export default Field
