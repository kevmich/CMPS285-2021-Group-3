import React, {useState} from 'react';
import {Grid, Box, Typography, Container, Avatar, Button,
    FormControlLabel, CssBaseline, TextField, Checkbox, makeStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from "axios";
import { Alert, AlertTitle } from '@material-ui/lab';


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

let AxiosCall = () => {
    if (this.password === this.password2) {
        axios({
            method: 'post',
            url: '/Auth/Create',
            data: {
                username: this.username,
                password: this.password,
            }
        });
    } else {
        const useStyles = makeStyles((theme) => ({
            root: {
                width: '100%',
                '& > * + *': {
                    marginTop: theme.spacing(2),
                },
            },
        }));

        let Alert = () => {
            const classes = useStyles();

            return (
                <div className={classes.root}>
                    <Alert severity="error">This is an error alert — check it out!</Alert>
                </div>
            );
        }
        }
}

    const SignUp = () => {
        const classes = useStyles();
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [password2, setPassword2] = useState("");
        const [email, setEmail] = useState("");
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar} style={{backgroundColor: "black"}}>
                        <LockOutlinedIcon style={{color: "white"}}/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <form className={classes.form} noValidate>
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
                            required
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
                            onClick={AxiosCall}
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
        );
}
export default SignUp