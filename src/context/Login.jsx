import React, { useState } from 'react'
import { Container, Paper, Typography, Button, Link, FormControl, InputAdornment, InputLabel, Input, IconButton, FormControlLabel, Checkbox } from '@mui/material'
// import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import DoneIcon from '@mui/icons-material/Done';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/user/userSlice'
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [, setRemember] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const notify = (noti) => toast(noti);


    const onSubmit = () => {
        const data = { email, password };

        axios.post('http://localhost:5000/loginuser', data)
            .then(response => {
                // response.data.found is the value of the found variable
                let user_exist = response.data.found
                let type = response.data.Type
                console.log(response.data)
                if (user_exist) {
                    dispatch(login(data));
                    navigate('/dashboard')
                } else {
                    if (type) {
                        notify("Username or Password is Incorrect");
                    } else {
                        notify("Email Address or Password is Incorrect");
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });


    }

    return (
        <Container sx={{ minWidth: '100vw', minHeight: '100vh', backgroundColor: 'rgb(11, 15, 16)', m: 0, p: 0 }}>
            <Paper elevation={14} sx={{ minWidth: '50vw', height: '80vh', backgroundColor: 'rgb(25, 32, 36)', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '50px', textAlign: 'center' }}>
                <Typography variant="h2" sx={{ color: '#FFF', fontSize: '2.5rem', padding: '50px', paddingBottom: '0' }} > Panel Web Hosting </Typography>
                <Typography variant="h5" sx={{ color: '#9BA4B5', fontSize: '1rem', padding: '5px' }} > Fast & Easy way host Web Application </Typography>
                <Typography variant="h5" sx={{ color: '#F0F0F0', fontSize: '1.5rem', padding: '5px', marginTop: '50px' }} > Welcome Back! </Typography>
                <Container sx={{ display: 'flex', flexFlow: 'column', width: '60%', padding: '20px' }}>

                    <FormControl sx={{ width: '75%', m: 'auto', padding: '5px', '.MuiInputBase-input': { color: 'white' } }} variant="standard">
                        <InputLabel htmlFor="type-email">Email</InputLabel>
                        <Input
                            id="type-email"
                            type='text'
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                    >
                                        {email && <DoneIcon />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Email"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>

                    <FormControl sx={{ width: '75%', m: 'auto', padding: '5px', '.MuiInputBase-input': { color: 'white' } }} variant="standard">
                        <InputLabel htmlFor="type-password">Password</InputLabel>
                        <Input
                            id="type-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => { setShowPassword((prev) => !prev) }}
                                        edge="end"
                                    >
                                        {!showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>

                    <FormControlLabel control={<Checkbox sx={{ color: '#fff' }} />} label="Remember me" onClick={() => { setRemember(prev => !prev) }} sx={{ width: 'auto', m: 2, padding: '5px', color: 'white' }} />



                    <Button variant="contained" onClick={onSubmit} sx={{ width: '75%', margin: '30px auto', marginBottom: '0' }}>
                        Sign IN
                    </Button>

                </Container>
                <Link href='forgot_Password' sx={{ textDecoration: 'none', color: 'white' }}> Forgot My Password</Link>
                <Container sx={{ width: '100%', position: 'absolute', bottom: '0', marginBottom: '20px' }}>
                    <Link href='Terms-&-Conditions' sx={{ textDecoration: 'none', color: 'white' }}> Term of Use</Link>
                    <span style={{ color: '#fff' }}> | </span>
                    <Link href='Privacy-&-Policy    ' sx={{ textDecoration: 'none', color: 'white' }}> Privacy Police</Link>
                </Container>
            </Paper>
            <ToastContainer position="top-right" />
        </Container>
    )
}

export default Login