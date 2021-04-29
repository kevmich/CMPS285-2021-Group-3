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

let CreateSubAxiosCall = (provider, paymentFrequency, price, renewDate, note) => {
    console.log(provider, paymentFrequency, price, renewDate, note);
    if (provider != null && paymentFrequency != null && price != null && note != null) {
        axios({
            method: 'post',
            url: 'api/subs/CreateSub',
            data: {
                provider: provider,
                price: price,
                paymentFrequency: paymentFrequency,
                renewDate: '2021-04-29T05:02:55.443Z',
                note: note
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
        alert("Your passwords dont match")
        
    }
}

    const CreateSub = () => {
        const classes = useStyles();
        const [provider, setProvider] = useState("");
        const [paymentFrequency, setPaymentFrequency] = useState("");
        const [renewDate, setRenewDate] = useState("");
        const [price, setPrice] = useState("");
        const [note, setNote] = useState("");
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar} style={{backgroundColor: "black"}}>
                        <LockOutlinedIcon style={{color: "white"}}/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create Subscription
                    </Typography>
                    <form className={classes.form} noValidate
                            onSubmit={e=>e.preventDefault()}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="provider"
                            label="Provider"
                            name="provider"
                            autoComplete="Provider"
                            autoFocus
                            onChange={(e) => setProvider(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="price"
                            label="Price"
                            type="price"
                            id="price"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="PaymentFrequency"
                            label="Payment Frequency"
                            type="paymentFrequency"
                            id="paymentFrequency"
                            onChange={(e) => setPaymentFrequency(e.target.value)}
                        />
                        <form className={classes.container} noValidate>
                            <TextField
                                id="date"
                                label="Renew Date"
                                type="date"
                                defaultValue="2021-01-24"
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                                onChange={(e) => setRenewDate(e.target.value)}
                            />
                        </form>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="Note"
                            label="Note"
                            type="note"
                            id="note"
                            onChange={(e) => setNote(e.target.value)}
                        />
                        <Typography component="h1" variant="subtitle2">
                            * Denotes required field
                        </Typography>
                        <Button
                            onClick={()=>CreateSubAxiosCall(renewDate, provider, price, paymentFrequency, note)}
                            onSubmit={e => e.preventDefault()}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            style={{backgroundColor: "black"}}
                        >
                            Create Sub
                        </Button>

                        <Grid container>
                            <Grid item>
                                <Link to="/" variant="body2">
                                    {"Back to home page?"}
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
export default CreateSub

