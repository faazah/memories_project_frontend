import React,{useState, useEffect} from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

import memories from "../../images/memories.png";
import useStyles from "./styles";
import { LOGOUT } from "../../constants/actionTypes";


const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();

  const logout = () =>{
    dispatch({type: LOGOUT});

    navigate('/auth');

    setUser(null);
  }

  useEffect(() =>{

    const token = user?.token;
    if(token){
      const decodedToken = jwt_decode(token);

      if(decodedToken.exp * 1000 < new Date().getTime())
        logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
  },[location])

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography className={classes.heading} variant="h2" align="center">
            Memories
          </Typography>
        </Link>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
            <div className={classes.profile}>
              <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>{user?.result?.name.charAt(0)}</Avatar>
              <Typography className={classes.userName} variant="h6">{user?.result?.name}</Typography>
              <Button variant="contained" className={classes.logout} color='secondary' onClick={logout}>Log Out</Button>
            </div>
        ) : (
            <Link to="/auth" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary">Sign In</Button>
            </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
