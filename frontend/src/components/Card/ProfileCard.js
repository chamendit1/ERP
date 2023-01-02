import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import User from '../../pages/Admin/components/User.js';

const ProfileCard = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const openUser = (id) => {
    navigate(`/User/${id}`)
  }

  const handleClickOpen = (id) => {
    setOpen(true);
    setValue(id);
  };

  const handleClose = (value) => {
    setOpen(false);
    // setSelectedValue(value);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.role}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Access: {props.access}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => handleClickOpen(props.id)}>
          Edit
        </Button>
        <User open={open} onClose={handleClose} id={value}/>
      </CardActions>
    </Card>
  )
}

export default ProfileCard