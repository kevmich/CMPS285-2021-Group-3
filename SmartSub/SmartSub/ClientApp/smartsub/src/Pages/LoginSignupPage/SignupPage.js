import React from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import {setState} from 'react';
import {Grid, Box, Typography, Container, Avatar, Button,
    FormControlLabel, CssBaseline, TextField, makeStyles,
    FormControl, Checkbox, Input, InputLabel, Paper} from '@material-ui/core';
import {Link} from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


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

function SignUp() {
    axios.post("/Auth/Create", this.user)
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
}

export default function SignUpPage() {
    const classes = useStyles();
    const [user, setUser] = setState({username:"", password:""})

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar} style={{background: "darkslateblue"}}>
                    <LockOutlinedIcon />
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
                        />

                    <Typography component="h1" variant="subtitle2">
                        * Denotes required field
                    </Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                            style={{background: "darkslateblue"}}
                            onClick={SignUp}
                        >
                        Sign Up
                        </Button>
                    </form>
                <Grid container>
                        <Grid item>
                            <Link to="/LoginPage" variant="body2">
                                {"Already have an account? Login"}
                            </Link>
                        </Grid>
                    </Grid>
            </Paper>
            <Box mt={8}>

            </Box>
        </Container>

    );
}
SignUp.propTypes ={
    classes: PropTypes.object.isRequired,
};
