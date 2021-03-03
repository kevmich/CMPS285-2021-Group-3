import './NavBar.css';
import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import {NavLink} from "reactstrap";

import Button from '@material-ui/core/Button';

let x = "SmartSub";


function NavBar(){

            return(
        <div style={{background: "darkslateblue"}}>
            <Button>
                <Link style={{color: "white", textDecoration: 'none' }} to="/">
                    SmartSub
                </Link>
            </Button>

            <Button>
                <Link style={{color: "white", textDecoration: 'none' }} to="/UserPage/">
                    UserPage
                </Link>
            </Button>

            <Button style={{color: "white"}}> Login </Button>
            <Button style={{color: "white"}}> Sign Up </Button>

        </div>

    )
}

export default NavBar;
