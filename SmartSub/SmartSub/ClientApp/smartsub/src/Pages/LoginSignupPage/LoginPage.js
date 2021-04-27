import React, {useState} from 'react';
import {
    Grid, Box, Typography, Container, Avatar, Button,CssBaseline, TextField, makeStyles,
} from '@material-ui/core';
import {Link, Redirect} from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
}));

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const classes = useStyles();

    const [redirect, setRedirect] = useState(false);

    let LoginAxiosCall = (username, password) => {
        console.log(username, password);
            axios({
                method: 'post',
                url: '/Auth/Login',
                data: {
                    userName: username,
                    passWord: password
                }
            }).then((res) => {
                if (res.status == 200){
                    setRedirect(true);
                }
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
        }

    return !redirect ? (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar} style={{backgroundColor: "black"}}>
                    <LockOutlinedIcon style={{color: "white"}}/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form className={classes.form} noValidate
                        onSubmit={e=>e.preventDefault()}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Typography component="h1" variant="subtitle2">
                        * Denotes required field
                    </Typography>
                    <Button 
                        onClick={()=>LoginAxiosCall(username, password)}
                        style={{backgroundColor: "black"}}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/SignupPage" variant="body2" >
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
            </Box>
        </Container>
    ):(<Redirect to = '/UserPage/'/>);
}
