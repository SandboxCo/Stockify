import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useData } from '../../providers/DataProvider';
import { useAuth } from '../../providers/AuthProvider';

import HorizontalNav from '../HorizontalNav';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const {signIn, isSignedIn} = useAuth()

    const {testData} = useData()

    const handleSignIn = () => {
        // Call the onSignIn callback with the username and password
       // signIn(email, password);
       testData()
    };

    const handleRedirect = () => {
        navigate("signUp")
    }

    useEffect(()=>{
        console.log(isSignedIn())
        if (isSignedIn()){
            navigate("/")
        }
    }, [])

    return (
        <div
            style={{height:"100vh", width:"100vw", display:"flex",flexDirection:"column"}}
        >
            <div style={{height:"9%"}}>
                <HorizontalNav/>
            </div>
            <div style={{height:"91%", backgroundColor:"#eee"}}>
            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        padding: (theme) => theme.spacing(4),
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography sx={{ fontFamily: "Montserrat" }} variant="h5">Sign In</Typography>
                    <form
                        sx={{
                            width: '100%',
                            marginTop: (theme) => theme.spacing(1),
                        }}
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            sx={{ fontFamily: "Montserrat" }}
                            autoFocus
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            sx={{ fontFamily: "Montserrat" }}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{
                                marginTop: (theme) => theme.spacing(2),
                                fontFamily:"Montserrat"
                            }}
                            onClick={handleSignIn}
                        >
                            Sign In
                        </Button>
                    </form>
                    <Typography sx={{ marginTop: (theme) => theme.spacing(2), fontFamily:"Montserrat"}}>
                        Don't have an account? 
                        <a href="/signUp" style={{marginLeft:3}}>Sign Up</a>
                    </Typography>
                </Paper>
            </Container>
            </div>
        </div>
    );
};
export default SignInPage;