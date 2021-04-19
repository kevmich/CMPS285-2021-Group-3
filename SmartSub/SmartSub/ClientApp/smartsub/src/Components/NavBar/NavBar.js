import * as React from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Container
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';

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

const navLinks = [
    { title: `user page`, path: `/UserPage` },
    { title: `login`, path: `/LoginPage` },
    { title: `sign up`, path: `/SignupPage` },
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
