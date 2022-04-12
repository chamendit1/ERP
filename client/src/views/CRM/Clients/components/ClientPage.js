// import moment from 'moment'
import { Box, Container, Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


import Paper from '@material-ui/core/Paper';
import SideBar from './SideBar';

// import clients from '../../clients.json'


const ClientPage = ({ client, id }) => {

      // eslint-disable-next-line
const row = client

  return (

    <div>
    <Container>
      <Box sx={{m: 2}}>
        <Paper>
          <Grid container rowspacing={2}>
            <Grid item xs={6}>
              <Box sx={{m: 2}}>
                <Typography variant="body2">Name</Typography>
                <Typography variant="body2">Email</Typography>
                <Typography variant="body2">Phone</Typography>
                <Typography variant="body2">Address</Typography>
              </Box>
            </Grid>
            
            <Grid item xs={6}>
             <Box sx={{m: 2}}>
              <Typography variant="body2">{row?.name}</Typography>
              <Typography variant="body2" >{row?.email}</Typography>
              <Typography variant="body2" >{row?.phone}</Typography>
              <Typography variant="body2">{row?.address}</Typography>
             </Box>
            </Grid>
          </Grid>

        </Paper>
      </Box>
    </Container>
  </div>
  );
}

export default ClientPage