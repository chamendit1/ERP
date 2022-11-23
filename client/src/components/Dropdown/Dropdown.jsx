import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';

const Dropdown = ({title, data}) => {
  return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"

        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            backgroundColor: "#FFD8A9",
            paddingTop: "40px",
          }}
        >
          {data}          
        </AccordionDetails>
      </Accordion>
  )
}

export default Dropdown