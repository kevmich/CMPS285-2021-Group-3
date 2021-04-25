import * as React from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Container,
    Button
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Redirect} from 'react-router-dom';
import axios from 'axios';



const useStyles = makeStyles({
    navbarDisplayFlex: {
        display: `inline-flex`,
        justifyContent: `space-between`,
    },
    navDisplayFlex: {
        display: `inline-flex`,
        justifyContent: `space-between`,
    },
    linkText: {
        textDecoration: `none`,
        textTransform: `uppercase`,
        color: `white`,
    }

});



let LogOutAxiosCall = () => {
    axios({
        method: 'post',
        url: '/Auth/Logout',
        data: {
        }
    })
    .catch(function (error) {// Error case
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
    .then(res => {// Success case

        return <Redirect to={'/'}/>
        // console.log('REEEEEEEEEEEEEEr ' + res)
        // if(res.response.status === 200){
        //     console.log("Logout was successful")
        //     console.log(res);
        //
        // }
    });
}

const navLinks = [
    { title: `user page`, path: `/UserPage` },
    { title: `login`, path: `/LoginPage` },
    { title: `sign up`, path: `/SignupPage` }
];

const NavBar = () => {
    const classes = useStyles();
    return (
        <AppBar position="static" style={{background:'linear-gradient(45deg, #8e00be 30%, #3100cd 90%)',}}>
            <Toolbar>
                <Container className={classes.navbarDisplayFlex}>

                    <IconButton component={Link} to='/' edge="start" color="inherit" aria-label="home">
                        <Home fontSize="default" />
                    </IconButton>

                    <Button size={'large'}
                        onClick={()=>LogOutAxiosCall()} 
                        >
                        LOGOUT
                    </Button>
                   
                    <List
                        component="nav"
                        aria-labelledby="main navigation"
                        className={classes.navDisplayFlex}
                    >
                        {navLinks.map(({ title, path }) => (
                            <a href={path} key={title} className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary={title}/>
                                </ListItem>
                            </a>
                        ))}
                    </List>
                </Container>
            </Toolbar>
        </AppBar>
    );
};
export default NavBar;
