import React, {useState} from 'react';
import {
    Grid, Box, Typography, Container, Avatar, Button,
    FormControlLabel, CssBaseline, TextField, Checkbox, makeStyles, Snackbar
} from '@material-ui/core';
import {Link, Redirect } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from "axios";
import { Alert, AlertTitle } from '@material-ui/lab';
import {render} from "@testing-library/react";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

    const SignUp = () => {
        const classes = useStyles();
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [password2, setPassword2] = useState("");
        const [email, setEmail] = useState("");
        const [redirect, setRedirect] = useState(false);

        const [open, setOpen] = React.useState(false);
        const handleClick = () => {
            setOpen(true);
        };
        const handleClose = () => {
            
            setOpen(false);
        };

        let AxiosCall = (username, password, password2, email) => {
            console.log(username, password, password2, email);
            if (password === password2) {
                axios({
                    method: 'post',
                    url: '/Auth/Create',
                    data: {
                        username: username,
                        password: password,
                        email: email
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
            } else {
                const useStyles = makeStyles((theme) => ({
                    root: {
                        width: '100%',
                        '& > * + *': {
                            marginTop: theme.spacing(2),
                        },
                    },
                })); 
                handleClick();
            }
        }

        return !redirect ? (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar} style={{backgroundColor: "black"}}>
                        <LockOutlinedIcon style={{color: "white"}}/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
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
                            autoFocus
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="email"
                            label="Email"
                            type="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
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
                            helperText="Must include one capital letter, number, and special character"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Confirm Password"
                            type="password"
                            id="password"
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                        <Typography component="h1" variant="subtitle2">
                            * Denotes required field
                        </Typography>


                        <Button
                             onClick={() => {
                                AxiosCall(username,password, password2, email);
                                
                            }}
                            onSubmit={e => e.preventDefault()}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            style={{backgroundColor: "black"}}
                        >
                            Sign Up
                        </Button>

                        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" variant="filled">
                            Passwords do not match!
                        </Alert>
                    </Snackbar>

                        <Grid container>
                            <Grid item>
                                <Link to="/LoginPage" variant="body2">
                                    {"Already have an account? Login"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>

                </Box>
            </Container>
        ):(<Redirect to ='/LoginPage'/>);
}
export default SignUp