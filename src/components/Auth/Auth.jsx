import React, {useState} from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container} from "@material-ui/core";
import {GoogleLogin} from "@react-oauth/google";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles';
import {Input} from './Input';
import  Icon  from './Icon';
import jwt_decode from "jwt-decode";
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState)

    const handleShowPassword = ()=>{
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(isSignUp){
            dispatch(signup(formData, navigate)) //action will be called
        }else{
            dispatch(signin(formData, navigate)) //action will be called
        }
    }

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const switchMode = () =>{
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    }

    const googleSuccess = async (res) =>{
        // console.log(res);
        let token = res?.credential;
        let result = jwt_decode(token);
        // console.log(result);
        try{
            dispatch({type:'AUTH', payload: {result, token}});
            navigate("/");
        }catch(err){
            console.log(err);
        }
    }
    
    const googleError = (err) =>{
        console.log(err);
        console.log('Google Sign In FAILED');
    }
  return (
    <Container component='main' maxWidth='xs'>
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignUp && (
                            <>
                                <Input name='firstName' label='First Name' handleChange ={handleChange} autoFocus half/>
                                <Input name='lastName' label='Last Name' handleChange ={handleChange} half/>
                            </>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
                    {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                </Grid>
                <Button type="submit" fullWidth variant='contained' color='primary' className={classes.submit}>
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Button>
                <GoogleLogin
                    render={(renderProps) =>(
                        <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained">Google Sign In</Button>
                    )}
                    onSuccess={googleSuccess}
                    onError={googleError}
                />
                <Grid container justifyContent='center'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </form> 
        </Paper>
    </Container>
  )
}

export default Auth
