import React, {useState} from 'react';
import {Grid, Box, Typography, Container, Avatar, Button,
    FormControlLabel, CssBaseline, TextField, Checkbox, makeStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from "axios";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
        let PasswordAlert = () => {
            const [open, setOpen] = React.useState(false);
            const isOpen = () => {
                setOpen(true);
            };
            const isClosed = () => {
                setOpen(false);
            };
            return (
                <div>
                    <Dialog
                        open={isOpen}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Incorrect Password Submission"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Passwords do not match. Please try again.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={isClosed} color="primary" autoFocus>
                                Continue
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        }
    }
}

const SignUp = () =>  {
    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar} style={{background: "darkslateblue"}}>
                        <LockOutlinedIcon/>
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
                            style={{background: "darkslateblue"}}
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