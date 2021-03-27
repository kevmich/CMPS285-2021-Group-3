import './NavBar.css';
import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Button from '@material-ui/core/Button';


let x = "SmartSub";


function NavBar(){

            return(
        <div style={{background: "darkslateblue", display: "flex"}} >
            <Button>
                <Link style={{color: "white", textDecoration: 'none' }} to="/">
                    Home
                </Link>
            </Button>

            <Button>
                <Link style={{color: "white", textDecoration: 'none' }} to="/UserPage">
                    UserPage
                </Link>
            </Button>

            <Button style={{ marginLeft: "auto" }}>
                <Link style={{color: "white", textDecoration: 'none' }} to="/LoginPage">
                    Login
                </Link>
            </Button>

            <Button style={{ marginLeft: "auto" }}>
                <Link style={{color: "white", textDecoration: 'none' }} to="/SignUpPage">
                    Sign Up
                </Link>
            </Button>
        </div>

    )
}

export default NavBar;
