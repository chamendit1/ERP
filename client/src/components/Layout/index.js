import React from 'react'
import { Box, Container, Grid, Paper} from '@material-ui/core';

const Layout = ({children}) => {
    return (
      <div>
        <Box style={{
          marginLeft: "15%",
          padding: "0 1rem",
          minHeight: '100vh'
          //,  border: '1px solid black'
          }}>
            {children}
        </Box>
      </div>
    )
}

export default Layout
