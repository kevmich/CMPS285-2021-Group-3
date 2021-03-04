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

            <Button>
                <Link style={{color: "white", textDecoration: 'none' }} to="/LoginPage/">
                    Login
                </Link>
            </Button>


        </div>

    )
}

export default NavBar;
