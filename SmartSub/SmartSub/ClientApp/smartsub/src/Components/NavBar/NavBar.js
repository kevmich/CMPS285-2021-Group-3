import './NavBar.css';
import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import Button from '@material-ui/core/Button';

let x = "SmartSub";


function NavBar(){

            return(
        <div style={{background: "darkslateblue"}}>
            <Button style={{color: "white"}}> SmartSub
            <Link to="/">HomePage </Link> </Button>
            <Button style={{color: "white"}}> UserPage
            <Link to="/UserPage">UserPage </Link></Button>
            <Button style={{color: "white"}}> Login </Button>
            <Button style={{color: "white"}}> Sign Up </Button>

        </div>

    )
}

export default NavBar;
