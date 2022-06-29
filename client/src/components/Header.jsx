import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";




import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'

import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));



const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Header = () => {
  //const quantity = useSelector(state=>state.cart.quantity)

    const dispatch = useDispatch()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const history = useHistory()
    const location = useLocation()

    useEffect(() => {
      setUser(JSON.parse(localStorage.getItem('profile')))
  },[location])


  const logout =() => {
    dispatch({ type: 'LOGOUT' })
    history.push('/')
    setUser(null)
}  

useEffect(()=> {
  const token = user?.token
  // setUser(JSON.parse(localStorage.getItem('profile')))
  //If token expires, logout the user
  if(token) {
      const decodedToken = decode(token)
      if(decodedToken.exp * 1000 < new Date().getTime()) logout()
  }
  // eslint-disable-next-line
}, [location, user]) //when location changes, set the user


const classes = useStyles();
const [open, setOpen] = React.useState(false);
const anchorRef = React.useRef(null);


const handleToggle = () => {
  setOpen((prevOpen) => !prevOpen);
};

const handleClose = (event ) => {
  if (anchorRef.current && anchorRef.current.contains(event.target)) {
    return;
  }

  setOpen(false);
};


const openLink =(link) => {
    history.push(`/${link}`)
    setOpen(false);
}

function handleListKeyDown(event) {
  if (event.key === 'Tab') {
    event.preventDefault();
    setOpen(false);
  }
}

// return focus to the button when we transitioned from !open -> open
const prevOpen = React.useRef(open);
React.useEffect(() => {
  if (prevOpen.current === true && open === false) {
    anchorRef.current.focus();
  }

  prevOpen.current = open;
}, [open]);


if(!user) return (
  <Container>
  <Wrapper>
    <Left>
      <Language>EN</Language>
    </Left>
    <Center>
      <Logo>LAMA.</Logo>
    </Center>
    <Right>
      <MenuItem onClick={()=> history.push('/login')} >REGISTER</MenuItem>
    </Right>
  </Wrapper>
</Container>
)





  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>LAMA.</Logo>
        </Center>
        <Right>
          <div>
            <Button
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <Avatar style={{backgroundColor: '#1976D2'}}>{user?.result?.name?.charAt(0)}</Avatar>
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper elevation={3}>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} >
                        <MenuItem onClick={() => openLink('settings') }>{(user?.result?.name).split(" ")[0]} Profile</MenuItem>
                        <MenuItem onClick={()=> history.push('/orders')} >Orders</MenuItem>
                        <MenuItem onClick={()=> logout()} >Logout</MenuItem>
                        
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>

          <MenuItem onClick={()=> history.push('/login')} >REGISTER</MenuItem>
          <MenuItem>SIGN IN</MenuItem>
          <Link to="/cart">
          <MenuItem>
            <Badge color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Header;

/*

badgeContent={quantity}

*/
